/* ─────────────────────────────────────────────
 * Venture Analysis API Service — Smart Demo Layer
 *
 * This module provides:
 * 1. Real client-side text extraction from uploaded files
 * 2. Content-aware keyword extraction (demo mode)
 * 3. Smart conversational gap-fill that SKIPS already-known fields
 * 4. Adaptive question grouping for fewer interaction turns
 *
 * When a backend API is available, set VITE_WIZARD_API_URL
 * and the real endpoints are called instead.
 * ───────────────────────────────────────────── */

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';

import type {
  BrandFieldValues,
  AnalysisResult,
  ExtractedField,
  Confidence,
  ChatMessage,
} from '@/types/wizard';
import { BRAND_FIELDS as FIELDS } from '@/types/wizard';

// ── pdf.js worker setup ──
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// ── Configuration ──

const API_BASE_URL = import.meta.env.VITE_WIZARD_API_URL || '';

// ── Types ──

export interface AnalyzeRequest {
  documents: Array<{ name: string; type: string; text: string }>;
  existingFields?: Partial<BrandFieldValues>;
}

export interface ConversationRequest {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  currentFields: BrandFieldValues;
  missingFields: string[];
}

export interface ConversationResponse {
  reply: string;
  fieldUpdates: Partial<BrandFieldValues>;
  suggestions: string[];
  fieldsUpdated: (keyof BrandFieldValues)[];
}

// ── Analysis: extract brand information from documents ──

export async function analyzeDocuments(req: AnalyzeRequest): Promise<AnalysisResult> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/brand-wizard/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);
    return res.json();
  }

  // ── Demo mode: smart content-aware analysis ──
  return smartAnalysis(req);
}

// ── Conversation: handle follow-up messages ──

export async function sendConversationMessage(req: ConversationRequest): Promise<ConversationResponse> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/brand-wizard/conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`Conversation failed: ${res.statusText}`);
    return res.json();
  }

  // ── Demo mode: smart conversation ──
  return smartConversation(req);
}

// ── Document text extraction (client-side) ──

export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';

  // Text-based files
  if (
    file.type === 'text/plain' ||
    file.type === 'text/markdown' ||
    file.type === 'text/csv' ||
    ['txt', 'md', 'csv'].includes(ext)
  ) {
    return file.text();
  }

  // JSON files
  if (file.type === 'application/json' || ext === 'json') {
    return file.text();
  }

  // HTML files — use DOMParser for safe text extraction
  if (file.type === 'text/html' || ['html', 'htm'].includes(ext)) {
    const html = await file.text();
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    return parsed.body.textContent || '';
  }

  // PDF files
  if (file.type === 'application/pdf' || ext === 'pdf') {
    return extractPdf(file);
  }

  // DOCX files
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword' ||
    ['docx', 'doc'].includes(ext)
  ) {
    return extractDocx(file);
  }

  // XLSX / XLS files
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel' ||
    ['xlsx', 'xls'].includes(ext)
  ) {
    return extractXlsx(file);
  }

  // Image files — can't extract text in browser
  if (file.type.startsWith('image/')) {
    return `[Image file — text extraction not available in browser. Upload as PDF or describe in chat.]`;
  }

  return `[Unsupported file type: ${file.name}]`;
}

async function extractPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    if (text.trim()) pages.push(text);
  }

  if (pages.length === 0) {
    return `[PDF has no extractable text — it may be scanned/image-based. Try OCR or describe in chat.]`;
  }

  return pages.join('\n\n');
}

async function extractDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  if (!result.value.trim()) {
    return `[DOCX file appears to be empty or contains only images.]`;
  }
  return result.value;
}

async function extractXlsx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheets: string[] = [];

  for (const name of workbook.SheetNames) {
    const sheet = workbook.Sheets[name];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    if (csv.trim()) {
      sheets.push(`--- Sheet: ${name} ---\n${csv}`);
    }
  }

  if (sheets.length === 0) {
    return `[Spreadsheet appears to be empty.]`;
  }

  return sheets.join('\n\n');
}

// ── URL content extraction ──

export async function extractTextFromUrl(url: string): Promise<string> {
  if (API_BASE_URL) {
    const res = await fetch(`${API_BASE_URL}/api/brand-wizard/extract-url`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!res.ok) throw new Error(`URL extraction failed: ${res.statusText}`);
    const data = await res.json();
    return data.text;
  }
  return `[URL content: ${url} — requires server-side scraping]`;
}

// ── Helper: get missing fields ──

export function getMissingFields(fields: BrandFieldValues): (keyof BrandFieldValues)[] {
  return FIELDS
    .filter((f) => !fields[f.key].trim())
    .map((f) => f.key);
}

// ── Helper: get filled fields count ──

export function getFilledCount(fields: BrandFieldValues): number {
  return FIELDS.filter((f) => fields[f.key].trim().length > 0).length;
}

// ── Helper: generate welcome message (content-aware) ──

export function getWelcomeMessage(
  fieldsFound: number,
  totalFields: number,
  missingFields: (keyof BrandFieldValues)[],
): ChatMessage {
  const foundPct = Math.round((fieldsFound / totalFields) * 100);

  if (fieldsFound === totalFields) {
    return {
      id: 'welcome',
      role: 'assistant',
      content: `🎉 Amazing — I found information for **all ${totalFields} fields** from your documents! Your venture profile is fully populated.\n\nYou can go straight to **Review** to fine-tune anything, or we can refine specific answers together.`,
      timestamp: Date.now(),
      suggestions: ['Review my venture profile', 'Let\'s refine some answers'],
    };
  }

  if (fieldsFound >= totalFields * 0.7) {
    // Found 70%+ — celebrate and ask only a few
    const remaining = missingFields.length;
    const sectionHints = getSectionSummary(missingFields);
    return {
      id: 'welcome',
      role: 'assistant',
      content: `Great work! I extracted **${fieldsFound} of ${totalFields}** fields (${foundPct}%) from your materials. 🚀\n\nI just need **${remaining} more detail${remaining > 1 ? 's' : ''}**${sectionHints}. This should only take a minute.\n\nOr you can skip to review and fill them in manually.`,
      timestamp: Date.now(),
      suggestions: ['Let\'s fill them in', 'Skip to review'],
    };
  }

  if (fieldsFound > 0) {
    const remaining = missingFields.length;
    const sectionHints = getSectionSummary(missingFields);
    return {
      id: 'welcome',
      role: 'assistant',
      content: `I extracted **${fieldsFound} of ${totalFields}** fields (${foundPct}%) from your documents.\n\nI still need **${remaining} more detail${remaining > 1 ? 's' : ''}**${sectionHints}. Let's fill the gaps quickly — I'll ask a few focused questions.`,
      timestamp: Date.now(),
      suggestions: ['Let\'s do it', 'Skip to review'],
    };
  }

  return {
    id: 'welcome',
    role: 'assistant',
    content: "Let's build your venture profile from scratch. I'll ask you 22 questions across 4 areas: who you are, your business, your voice, and some examples.\n\nLet's start — what's your name and what's your role?",
    timestamp: Date.now(),
  };
}

/** Summarize which sections still need info */
function getSectionSummary(missingKeys: (keyof BrandFieldValues)[]): string {
  const sections = new Map<string, number>();
  for (const key of missingKeys) {
    const field = FIELDS.find((f) => f.key === key);
    if (!field) continue;
    const label = field.section === 'identity' ? 'you'
      : field.section === 'business' ? 'your business'
      : field.section === 'voice' ? 'your voice'
      : 'examples';
    sections.set(label, (sections.get(label) || 0) + 1);
  }
  const parts = Array.from(sections.entries()).map(([label, count]) => `${count} about ${label}`);
  if (parts.length === 0) return '';
  return ` — ${parts.join(', ')}`;
}

// ── Helper: generate GROUPED next question ──

/**
 * Instead of asking one field at a time, groups related missing fields
 * from the same section into a single conversational turn.
 */
export function getNextQuestion(
  fields: BrandFieldValues,
  justUpdated?: (keyof BrandFieldValues)[],
): ChatMessage | null {
  const missing = getMissingFields(fields);
  const remaining = missing.filter((k) => !justUpdated?.includes(k));
  if (remaining.length === 0) return null;

  // Find the next section that has missing fields
  const sectionOrder: Array<'identity' | 'business' | 'voice' | 'examples'> = ['identity', 'business', 'voice', 'examples'];
  for (const section of sectionOrder) {
    const sectionMissing = remaining
      .map((k) => FIELDS.find((f) => f.key === k))
      .filter((f) => f && f.section === section)
      .slice(0, 3); // Max 3 fields per grouped question

    if (sectionMissing.length === 0) continue;

    if (sectionMissing.length === 1) {
      const field = sectionMissing[0]!;
      return {
        id: `q-${field.key}-${Date.now()}`,
        role: 'assistant',
        content: `**${field.label}**\n\n${field.hint}`,
        timestamp: Date.now(),
        suggestions: field.placeholder ? [field.placeholder.replace('E.g. ', '').slice(0, 60)] : undefined,
      };
    }

    // Group 2-3 related fields into one question
    const labels = sectionMissing.map((f) => `• **${f!.label}**: ${f!.hint}`).join('\n');
    const sectionLabel = section === 'identity' ? 'about you'
      : section === 'business' ? 'your business'
      : section === 'voice' ? 'your voice'
      : 'some examples';

    return {
      id: `q-group-${section}-${Date.now()}`,
      role: 'assistant',
      content: `I need a few more details about **${sectionLabel}**:\n\n${labels}\n\nFeel free to answer all at once, or one at a time — whatever's easiest.`,
      timestamp: Date.now(),
    };
  }

  return null;
}

// ──────────────────────────────────────────────
// SMART DEMO SIMULATION
// ──────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Keyword extraction patterns for each field ──

interface FieldPattern {
  key: keyof BrandFieldValues;
  /** Keywords / patterns to search for in text (case-insensitive) */
  keywords: RegExp[];
  /** Extract a snippet around the match */
  extractSnippet: (text: string, match: RegExpMatchArray) => string;
}

const FIELD_PATTERNS: FieldPattern[] = [
  {
    key: 'nameRole',
    keywords: [
      /(?:my name is|i'm|i am)\s+([A-Z][a-z]+ [A-Z][a-z]+)/i,
      /(?:founder|ceo|cto|co-founder|head of|director|manager|lead|owner)\s+(?:at|of|@|&)\s+[\w\s]+/i,
      /([A-Z][a-z]+ [A-Z][a-z]+)\s*[-–—,]\s*(?:founder|ceo|cto|co-founder|head|director|manager|lead|owner)/i,
    ],
    extractSnippet: (text, match) => {
      const start = Math.max(0, (match.index || 0) - 20);
      const end = Math.min(text.length, (match.index || 0) + match[0].length + 30);
      return text.slice(start, end).replace(/\n/g, ' ').trim();
    },
  },
  {
    key: 'bizNameTagline',
    keywords: [
      /(?:company|business|brand|startup|product)\s*(?:name|called|is)\s*[:—–-]?\s*(.{3,60})/i,
      /(?:tagline|slogan|motto)\s*[:—–-]\s*(.{5,80})/i,
      /^([A-Z][\w\s&]+)\s*[-–—:]\s*(.{10,80})/m,
    ],
    extractSnippet: (text, match) => {
      const start = Math.max(0, (match.index || 0));
      const end = Math.min(text.length, (match.index || 0) + match[0].length + 20);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'mission',
    keywords: [
      /(?:mission|purpose)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:we (?:help|make|enable|empower|build|create|provide|solve))\s+(.{10,150})/i,
      /(?:our goal|our vision|we exist to)\s*[:—–-]?\s*(.{10,150})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'audience',
    keywords: [
      /(?:target (?:audience|market|customer)|ideal (?:customer|client|user))\s*[:—–-]?\s*(.{10,150})/i,
      /(?:we serve|our (?:customers|clients|users)|designed for|built for)\s+(.{10,150})/i,
      /(?:(?:small|medium|large) (?:businesses|companies|teams|enterprises))/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 180);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'values',
    keywords: [
      /(?:(?:core |our )?values)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:we (?:believe|stand for|value))\s+(.{10,150})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'uvp',
    keywords: [
      /(?:unique|value proposition|UVP|USP|what makes us different)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:the only|unlike (?:other|most)|what sets us apart)\s+(.{10,150})/i,
      /(?:we are the only)\s+(.{10,150})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'positioning',
    keywords: [
      /(?:positioning|market position|competitive advantage)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:we are (?:not|the)|we're (?:not|the)|we don't)\s+(.{10,150})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'offerings',
    keywords: [
      /(?:(?:our )?(?:products?|services?|offerings?|solutions?|plans?|pricing))\s*[:—–-]?\s*(.{10,200})/i,
      /(?:\$\d+|free plan|starter|pro|premium|enterprise|basic)\s*[-–—]?\s*(.{5,100})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 250);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'tone',
    keywords: [
      /(?:tone (?:of voice)?|voice|brand tone|how (?:we|the brand) sounds?)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:professional|casual|formal|friendly|direct|warm|bold|playful|serious)\s*(?:and|,)\s*(?:professional|casual|formal|friendly|direct|warm|bold|playful)/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'brandPersonality',
    keywords: [
      /(?:brand personality|personality|brand (?:is|feels|should feel))\s*[:—–-]?\s*(.{10,200})/i,
      /(?:(?:we are|our brand is)\s+(?:professional|bold|approachable|innovative|modern|trustworthy|edgy|premium))/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 150);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'strengths',
    keywords: [
      /(?:strengths?|good at|best at|excel at|expertise)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:my (?:top )?(?:skills?|abilities|strengths?))\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'gaps',
    keywords: [
      /(?:need help|gaps?|weaknesses?|improve|struggle with|challenges?)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:want (?:AI|help|support|automation) (?:for|with))\s+(.{10,150})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'vocabulary',
    keywords: [
      /(?:vocabulary|words? (?:to )?(?:use|avoid)|terminology|language|jargon)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:USE|AVOID|SAY|(?:DON'?T|NEVER) (?:USE|SAY))\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'formatting',
    keywords: [
      /(?:formatting|format|style (?:guide|rules?))\s*[:—–-]?\s*(.{10,200})/i,
      /(?:bullet points?|short sentences?|active voice|emoji|headers?)\s*[:—–-]?\s*(.{5,100})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'dosDonts',
    keywords: [
      /(?:do'?s?\s*(?:and|&)\s*don'?ts?|rules?|guidelines?)\s*[:—–-]?\s*(.{10,200})/i,
      /(?:ALWAYS|NEVER|DO|DON'?T)\s*[:—–-]?\s*(.{10,100})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'channelAdjustments',
    keywords: [
      /(?:channel|platform|social media|linkedin|twitter|email|newsletter)\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'commPrefs',
    keywords: [
      /(?:communication (?:preferences?|style)|how (?:I|you) (?:like|prefer|want))\s*[:—–-]?\s*(.{10,200})/i,
      /(?:brief|detailed|bullet points?|actionable|recommendations?)\s*(?:and|,)\s*(?:brief|detailed|bullet|concise)/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'personalValues',
    keywords: [
      /(?:personal values?|I (?:believe|value|stand for))\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'antiPatterns',
    keywords: [
      /(?:anti.?patterns?|frustrat|annoy|hate|can'?t stand|pet peeves?)\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'goodExample',
    keywords: [
      /(?:good example|example (?:of )?(?:good|on.?brand))\s*[:—–-]?\s*(.{10,300})/i,
      /(?:sounds? like (?:us|me|our brand))\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 300);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'badExample',
    keywords: [
      /(?:bad example|example (?:of )?(?:bad|off.?brand))\s*[:—–-]?\s*(.{10,300})/i,
      /(?:doesn'?t sound like (?:us|me)|avoid (?:this|writing like))\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 300);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
  {
    key: 'workflows',
    keywords: [
      /(?:workflow|weekly (?:tasks?|routine)|recurring|repeating|every week)\s*[:—–-]?\s*(.{10,200})/i,
    ],
    extractSnippet: (text, match) => {
      const start = match.index || 0;
      const end = Math.min(text.length, start + 200);
      return text.slice(start, end).replace(/\n+/g, ' ').trim();
    },
  },
];

// ── Smart Analysis — scans actual document text ──

async function smartAnalysis(req: AnalyzeRequest): Promise<AnalysisResult> {
  await sleep(1500 + Math.random() * 1000);

  // Combine all document text
  const combinedText = req.documents.map((d) => d.text).join('\n\n---\n\n');
  const hasRealContent = combinedText.replace(/\[.*?\]/g, '').trim().length > 50;

  const fields: Record<string, ExtractedField> = {};

  for (const fieldDef of FIELDS) {
    const pattern = FIELD_PATTERNS.find((p) => p.key === fieldDef.key);

    if (pattern && hasRealContent) {
      let bestMatch: { value: string; confidence: Confidence; source: string } | null = null;

      for (const regex of pattern.keywords) {
        const match = combinedText.match(regex);
        if (match) {
          const snippet = pattern.extractSnippet(combinedText, match);
          const cleaned = snippet.length > 200 ? snippet.slice(0, 197) + '…' : snippet;

          // Determine confidence based on match quality
          const confidence: Confidence = match[1]
            ? 'HIGH'
            : cleaned.length > 40
              ? 'MEDIUM'
              : 'LOW';

          // Find which document this came from
          let source = 'uploaded documents';
          for (const doc of req.documents) {
            if (doc.text.includes(match[0])) {
              source = doc.name;
              break;
            }
          }

          if (!bestMatch || (confidence === 'HIGH' && bestMatch.confidence !== 'HIGH')) {
            bestMatch = { value: match[1] || cleaned, confidence, source };
          }
        }
      }

      if (bestMatch) {
        fields[fieldDef.key] = {
          value: bestMatch.value,
          confidence: bestMatch.confidence,
          source: bestMatch.source,
          followUpQuestion: bestMatch.confidence === 'LOW'
            ? `I found something for "${fieldDef.label}" but I'm not confident. Could you confirm?`
            : null,
        };
        continue;
      }
    }

    // No match found
    fields[fieldDef.key] = {
      value: null,
      confidence: 'NOT_FOUND',
      source: null,
      followUpQuestion: `${fieldDef.label}? ${fieldDef.hint}`,
    };
  }

  // Detect bonus insights from content
  const toneWords = ['professional', 'casual', 'friendly', 'direct', 'warm', 'bold', 'playful', 'serious', 'formal'];
  const detectedTone = toneWords.filter((w) => combinedText.toLowerCase().includes(w));

  return {
    fields: fields as AnalysisResult['fields'],
    bonusInsights: {
      competitors: extractCompetitors(combinedText),
      writingPatterns: {
        toneProfile: detectedTone.length > 0 ? detectedTone.join(', ') : hasRealContent ? 'Professional, balanced' : '',
        vocabularyFrequent: extractFrequentWords(combinedText),
        vocabularyAvoided: [],
      },
      marketClues: hasRealContent ? extractMarketClues(combinedText) : '',
    },
  };
}

/** Extract competitor mentions */
function extractCompetitors(text: string): string[] {
  const patterns = [
    /(?:competitors?|vs\.?|versus|compared to|alternative to)\s+([A-Z]\w+(?:\s[A-Z]\w+)?)/gi,
  ];
  const found = new Set<string>();
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(text)) !== null) {
      if (m[1] && m[1].length > 2 && m[1].length < 30) {
        found.add(m[1].trim());
      }
    }
  }
  return Array.from(found).slice(0, 5);
}

/** Extract frequently used words (simple word frequency) */
function extractFrequentWords(text: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'is', 'in', 'to', 'for', 'of', 'with', 'on', 'at', 'by', 'from', 'as', 'it', 'this', 'that', 'are', 'was', 'be', 'not', 'we', 'our', 'your', 'you', 'i', 'me', 'my', 'will', 'can', 'has', 'have', 'do', 'does', 'did', 'been', 'its', 'all', 'who', 'what', 'if', 'so', 'no', 'more', 'up', 'just', 'about', 'also', 'how', 'when', 'they', 'them', 'their']);
  const words = text.toLowerCase().match(/\b[a-z]{4,15}\b/g) || [];
  const freq = new Map<string, number>();
  for (const word of words) {
    if (stopWords.has(word)) continue;
    freq.set(word, (freq.get(word) || 0) + 1);
  }
  return Array.from(freq.entries())
    .filter(([, c]) => c >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([word]) => word);
}

/** Extract market positioning clues */
function extractMarketClues(text: string): string {
  const patterns = [
    /(?:market|industry|sector|space|niche)\s*[:—–-]?\s*(.{10,80})/i,
    /(?:B2B|B2C|SaaS|DTC|agency|startup|enterprise)/i,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[0].trim();
  }
  return '';
}

// ── Smart Conversation — fills multiple fields per turn ──

async function smartConversation(req: ConversationRequest): Promise<ConversationResponse> {
  await sleep(600 + Math.random() * 400);

  const lastUserMsg = req.messages.filter((m) => m.role === 'user').pop();
  if (!lastUserMsg) {
    return { reply: 'Tell me more about your business.', fieldUpdates: {}, suggestions: [], fieldsUpdated: [] };
  }

  const userText = lastUserMsg.content;

  // Try to match the user's answer to MULTIPLE missing fields
  const fieldUpdates: Partial<BrandFieldValues> = {};
  const fieldsUpdated: (keyof BrandFieldValues)[] = [];

  for (const missingKey of req.missingFields) {
    const key = missingKey as keyof BrandFieldValues;
    const pattern = FIELD_PATTERNS.find((p) => p.key === key);

    if (pattern) {
      for (const regex of pattern.keywords) {
        const match = userText.match(regex);
        if (match) {
          fieldUpdates[key] = match[1] || match[0];
          fieldsUpdated.push(key);
          break;
        }
      }
    }
  }

  // If no pattern matches, assign the text to the first missing field
  // (user is directly answering the question we asked)
  if (fieldsUpdated.length === 0 && req.missingFields.length > 0) {
    const firstMissing = req.missingFields[0] as keyof BrandFieldValues;
    fieldUpdates[firstMissing] = userText;
    fieldsUpdated.push(firstMissing);
  }

  const remaining = req.missingFields.length - fieldsUpdated.length;

  // Build a natural reply
  let reply: string;
  if (fieldsUpdated.length > 1) {
    const labels = fieldsUpdated.map((k) => FIELDS.find((f) => f.key === k)?.label || k);
    reply = `Nice — I picked up **${fieldsUpdated.length} details** from that: ${labels.join(', ')}.`;
    if (remaining > 0) {
      reply += ` Just **${remaining}** more to go!`;
    } else {
      reply += ` That's everything — your brand profile is **complete**! 🎉`;
    }
  } else if (fieldsUpdated.length === 1) {
    const label = FIELDS.find((f) => f.key === fieldsUpdated[0])?.label || '';
    if (remaining > 0) {
      reply = `Got it — saved to **${label}**. ${remaining} more question${remaining > 1 ? 's' : ''} to go.`;
    } else {
      reply = `Perfect — **${label}** is the last one! Your brand profile is **complete**! 🎉`;
    }
  } else {
    reply = "Thanks! Let me note that down.";
  }

  return {
    reply,
    fieldUpdates,
    suggestions: remaining === 0 ? ['Review my profile'] : [],
    fieldsUpdated,
  };
}
