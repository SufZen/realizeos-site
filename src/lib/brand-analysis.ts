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
// SMART DEMO — Regex-based extraction (fallback)
// Will be replaced by LLM via n8n when available.
//
// Design principles:
// - Tier 1 patterns match explicit labels (HIGH confidence)
// - Tier 2 patterns match contextual clues (MEDIUM confidence)
// - Prefer NOT_FOUND over wrong extraction
// - Per-document extraction with deduplication
// - Conversation assigns to the ASKED field, not first-missing
// ──────────────────────────────────────────────

interface FieldPattern {
  key: keyof BrandFieldValues;
  tier1: RegExp[];
  tier2: RegExp[];
}

const FIELD_PATTERNS: FieldPattern[] = [
  // ── Identity fields ──
  { key: 'nameRole',
    tier1: [/(?:name\s*(?:&|and)\s*role|about\s*(?:me|the\s*founder))\s*[:—–-]\s*(.{5,120})/i,
            /([A-Z][a-z]+ [A-Z][a-z]+)\s*[-–—,]\s*(?:founder|ceo|cto|coo|co-founder|owner|managing\s*director)\s+(?:at|of|@)\s+(.{2,40})/i],
    tier2: [/(?:my name is|i'm|i am)\s+([A-Z][a-z]+ [A-Z][a-z]+)/i,
            /(?:founder|ceo|cto|co-founder|owner)\s+(?:at|of|@)\s+([\w\s]{2,40})/i] },
  { key: 'strengths',
    tier1: [/(?:(?:my |top |key )?strengths?|what\s+I'?m?\s+(?:best|good)\s+at|my\s+expertise)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:I\s+(?:excel|specialize)\s+(?:at|in))\s+(.{10,150})/i] },
  { key: 'gaps',
    tier1: [/(?:(?:where\s+)?I\s+need\s+help|my\s+(?:gaps?|weaknesses?)|areas?\s+(?:for|of)\s+improvement)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:I\s+(?:struggle|need\s+(?:help|support))\s+with)\s+(.{10,150})/i] },
  { key: 'commPrefs',
    tier1: [/(?:communication\s+(?:preferences?|style)|how\s+I\s+(?:like|prefer)\s+(?:to\s+)?(?:receive|get)\s+info)\s*[:—–-]\s*(.{10,200})/i],
    tier2: [] },
  { key: 'personalValues',
    tier1: [/(?:(?:my\s+)?personal\s+values?|values?\s+that\s+drive\s+me)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:I\s+(?:deeply\s+)?(?:believe\s+in|stand\s+for))\s+(.{10,150})/i] },
  { key: 'antiPatterns',
    tier1: [/(?:(?:my\s+)?(?:anti[- ]?patterns?|pet\s+peeves?|frustrations?)|what\s+(?:frustrates?|annoys?)\s+me)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:I\s+(?:can'?t\s+stand|hate|dislike))\s+(.{10,150})/i] },
  // ── Business fields ──
  { key: 'bizNameTagline',
    tier1: [/(?:(?:company|business|brand|venture)\s+name|tagline|slogan)\s*[:—–-]\s*(.{3,100})/i],
    tier2: [/(?:(?:our|the)\s+(?:company|business|brand)\s+is\s+called)\s*[:—–-]?\s*(.{3,80})/i,
            /^([A-Z][\w\s&]{2,30})\s*[-–—:]\s*(.{10,80})/m] },
  { key: 'mission',
    tier1: [/(?:(?:our\s+)?mission|(?:our\s+)?purpose)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:we\s+(?:help|enable|empower))\s+(.{10,150})/i] },
  { key: 'audience',
    tier1: [/(?:(?:target|ideal)\s+(?:audience|customer|client|market))\s*[:—–-]\s*(.{10,200})/i],
    tier2: [/(?:(?:we\s+)?(?:serve|built\s+for|designed\s+for))\s*[:—–-]?\s*(.{10,200})/i] },
  { key: 'values',
    tier1: [/(?:(?:our\s+)?(?:core|company|brand|business)\s+values?)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:we\s+(?:believe\s+in|stand\s+for|are\s+committed\s+to))\s+(.{10,200})/i] },
  { key: 'uvp',
    tier1: [/(?:(?:unique\s+)?value\s+proposition|UVP|USP|what\s+makes\s+us\s+(?:different|unique))\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:we\s+are\s+the\s+only)\s+(.{10,200})/i] },
  { key: 'positioning',
    tier1: [/(?:(?:market\s+)?positioning|competitive\s+(?:advantage|position))\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:we\s+(?:are|'re)\s+NOT)\s+(.{10,150})/i] },
  { key: 'offerings',
    tier1: [/(?:(?:our|key)\s+(?:offerings?|products?\s+(?:&|and)\s+services?))\s*[:—–-]\s*(.{10,300})/i,
            /(?:pricing|plans?)\s*[:—–-]\s*(.{10,200})/i],
    tier2: [/(?:\$\d+(?:\.\d+)?(?:\s*\/\s*(?:mo(?:nth)?|yr|year|user)))/i] },
  { key: 'brandPersonality',
    tier1: [/(?:(?:brand|venture|company)\s+personality)\s*[:—–-]\s*(.{10,200})/i],
    tier2: [/(?:our\s+brand\s+(?:is|feels?|sounds?))\s+(.{10,150})/i] },
  // ── Voice fields ──
  { key: 'tone',
    tier1: [/(?:tone\s+(?:of\s+voice)?|brand\s+tone|voice\s+(?:&|and)\s+tone)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:(?:we|our\s+brand)\s+sound(?:s)?\s+like)\s+(.{10,150})/i] },
  { key: 'vocabulary',
    tier1: [/(?:vocabulary|words?\s+(?:to\s+)?(?:use|avoid)|(?:brand\s+)?terminology)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [/(?:(?:we\s+)?(?:USE|SAY))\s*[:—–-]\s*(.{5,200})/,
            /(?:(?:we\s+)?(?:AVOID|(?:DON'?T|NEVER)\s+(?:USE|SAY)))\s*[:—–-]\s*(.{5,200})/] },
  { key: 'formatting',
    tier1: [/(?:formatting\s+(?:rules?|guidelines?|preferences?)|(?:content\s+)?style\s+guide)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [] },
  { key: 'dosDonts',
    tier1: [/(?:do'?s?\s*(?:and|&)\s*don'?ts?)\s*[:—–-]\s*(.{10,250})/i,
            /(?:(?:brand|content|writing)\s+(?:rules?|guidelines?))\s*[:—–-]\s*(.{10,250})/i],
    tier2: [] },
  { key: 'channelAdjustments',
    tier1: [/(?:channel\s+(?:adjustments?|(?:specific\s+)?tone)|(?:tone|voice)\s+(?:per|by)\s+(?:channel|platform))\s*[:—–-]\s*(.{10,250})/i],
    tier2: [] },
  // ── Example fields ──
  { key: 'goodExample',
    tier1: [/(?:(?:good|on[- ]?brand)\s+example)\s*[:—–-]\s*(.{10,400})/i],
    tier2: [] },
  { key: 'badExample',
    tier1: [/(?:(?:bad|off[- ]?brand)\s+example)\s*[:—–-]\s*(.{10,400})/i],
    tier2: [] },
  { key: 'workflows',
    tier1: [/(?:(?:weekly\s+)?workflows?|weekly\s+(?:tasks?|routine)|recurring\s+tasks?)\s*[:—–-]\s*(.{10,250})/i],
    tier2: [] },
];

// ── Paragraph-aware snippet extraction ──

function extractParagraph(text: string, matchIndex: number, maxLen = 300): string {
  const paragraphs: { start: number; end: number; text: string }[] = [];
  let pos = 0;
  for (const block of text.split(/\n\s*\n/)) {
    const trimmed = block.trim();
    if (trimmed) {
      paragraphs.push({ start: pos, end: pos + block.length, text: trimmed });
    }
    pos += block.length + 1;
  }
  const para = paragraphs.find((p) => matchIndex >= p.start && matchIndex < p.end);
  if (!para) return text.slice(matchIndex, matchIndex + maxLen).trim();
  let result = para.text;
  if (result.length < 40 && paragraphs.indexOf(para) < paragraphs.length - 1) {
    result += ' ' + paragraphs[paragraphs.indexOf(para) + 1].text;
  }
  return result.length > maxLen ? result.slice(0, maxLen - 1) + '\u2026' : result;
}

// ── Validation: reject obviously bad extractions ──

function isValidExtraction(value: string): boolean {
  if (value.length < 5) return false;
  const content = value.replace(/\b(?:the|a|an|and|or|is|are|was|be|to|of|in|for|with|on|at|by|from|as|it|this|that|we|our|i|my)\b/gi, '').trim();
  return content.length >= 3;
}

// ── Per-document field extraction ──

interface DocMatch { value: string; confidence: Confidence; source: string }

function extractFieldFromDocuments(
  pattern: FieldPattern,
  documents: Array<{ name: string; text: string }>,
): DocMatch | null {
  let best: DocMatch | null = null;
  for (const doc of documents) {
    const text = doc.text;
    if (text.replace(/\[.*?\]/g, '').trim().length < 20) continue;
    // Tier 1 = HIGH confidence (explicit labels)
    for (const regex of pattern.tier1) {
      const match = text.match(regex);
      if (match) {
        const value = (match[1] || extractParagraph(text, match.index || 0)).trim();
        if (isValidExtraction(value)) {
          return { value, confidence: 'HIGH', source: doc.name };
        }
      }
    }
    // Tier 2 = MEDIUM confidence (contextual)
    for (const regex of pattern.tier2) {
      const match = text.match(regex);
      if (match) {
        const value = (match[1] || extractParagraph(text, match.index || 0)).trim();
        if (isValidExtraction(value) && (!best || best.confidence !== 'HIGH')) {
          best = { value, confidence: 'MEDIUM', source: doc.name };
        }
      }
    }
  }
  return best;
}

// ── Smart Analysis — per-document extraction with dedup ──

async function smartAnalysis(req: AnalyzeRequest): Promise<AnalysisResult> {
  const fields: Record<string, ExtractedField> = {};
  const usedValues = new Set<string>();
  const allText = req.documents.map((d) => d.text).join('\n\n');

  for (const fieldDef of FIELDS) {
    const pattern = FIELD_PATTERNS.find((p) => p.key === fieldDef.key);
    if (pattern) {
      const match = extractFieldFromDocuments(pattern, req.documents);
      if (match && !usedValues.has(match.value)) {
        usedValues.add(match.value);
        fields[fieldDef.key] = {
          value: match.value,
          confidence: match.confidence,
          source: match.source,
          followUpQuestion: match.confidence !== 'HIGH'
            ? `Could you confirm your ${fieldDef.label.toLowerCase()}? ${fieldDef.hint}`
            : null,
        };
        continue;
      }
    }
    fields[fieldDef.key] = {
      value: null,
      confidence: 'NOT_FOUND',
      source: null,
      followUpQuestion: `${fieldDef.label}? ${fieldDef.hint}`,
    };
  }

  const toneWords = ['professional', 'casual', 'friendly', 'direct', 'warm', 'bold', 'playful', 'serious', 'formal'];
  const detectedTone = toneWords.filter((w) => allText.toLowerCase().includes(w));

  return {
    fields: fields as AnalysisResult['fields'],
    bonusInsights: {
      competitors: extractCompetitors(allText),
      writingPatterns: {
        toneProfile: detectedTone.length > 0 ? detectedTone.join(', ') : '',
        vocabularyFrequent: extractFrequentWords(allText),
        vocabularyAvoided: [],
      },
      marketClues: extractMarketClues(allText),
    },
  };
}

/** Extract competitor mentions */
function extractCompetitors(text: string): string[] {
  const re = /(?:competitors?|vs\.?|versus|compared\s+to|alternative\s+to)\s+([A-Z]\w+(?:\s[A-Z]\w+)?)/g;
  const found = new Set<string>();
  let m;
  while ((m = re.exec(text)) !== null) { // eslint-disable-line no-cond-assign
    if (m[1] && m[1].length > 2 && m[1].length < 30) found.add(m[1].trim());
  }
  return Array.from(found).slice(0, 5);
}

/** Extract frequently used words */
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

/** Extract market clues */
function extractMarketClues(text: string): string {
  const pats = [
    /(?:market|industry|sector|space|niche)\s*[:—–-]\s*(.{10,80})/i,
    /\b(B2B|B2C|SaaS|DTC|agency|startup|enterprise)\b/i,
  ];
  for (const pat of pats) {
    const m = text.match(pat);
    if (m) return (m[1] || m[0]).trim();
  }
  return '';
}

// ── Smart Conversation — assigns answers to the ASKED field ──

/** Detect which field(s) the last assistant message was asking about */
function detectAskedFields(messages: Array<{ role: string; content: string }>): (keyof BrandFieldValues)[] {
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
  if (!lastAssistant) return [];
  const asked: (keyof BrandFieldValues)[] = [];
  const content = lastAssistant.content.toLowerCase();
  for (const field of FIELDS) {
    if (content.includes(field.label.toLowerCase()) || content.includes(field.hint.toLowerCase())) {
      asked.push(field.key);
    }
  }
  return asked;
}

async function smartConversation(req: ConversationRequest): Promise<ConversationResponse> {
  const lastUserMsg = req.messages.filter((m) => m.role === 'user').pop();
  if (!lastUserMsg) {
    return { reply: 'Tell me more about your business.', fieldUpdates: {}, suggestions: [], fieldsUpdated: [] };
  }

  const userText = lastUserMsg.content;
  const fieldUpdates: Partial<BrandFieldValues> = {};
  const fieldsUpdated: (keyof BrandFieldValues)[] = [];

  // Skip/pass detection
  if (/^(?:skip|i\s+don'?t\s+know|not\s+sure|pass|next|n\/?a)$/i.test(userText.trim())) {
    const remaining = req.missingFields.length;
    return {
      reply: remaining > 1 ? `No problem, let's move on. ${remaining} more to go.` : "That's okay, let's move on.",
      fieldUpdates: {},
      suggestions: [],
      fieldsUpdated: [],
    };
  }

  // Determine which field(s) were asked about
  const askedFields = detectAskedFields(req.messages);
  const askedMissing = askedFields.filter((k) => req.missingFields.includes(k));

  if (askedMissing.length === 1) {
    // Single field — assign full answer
    fieldUpdates[askedMissing[0]] = userText;
    fieldsUpdated.push(askedMissing[0]);
  } else if (askedMissing.length > 1) {
    // Multiple fields — try sentence-level assignment
    const sentences = userText.split(/[.\n]+/).map((s) => s.trim()).filter(Boolean);
    const unassigned: string[] = [];
    for (const sentence of sentences) {
      let matched = false;
      for (const key of askedMissing) {
        if (fieldsUpdated.includes(key)) continue;
        const field = FIELDS.find((f) => f.key === key);
        if (!field) continue;
        if (sentence.toLowerCase().includes(field.label.toLowerCase())) {
          fieldUpdates[key] = sentence;
          fieldsUpdated.push(key);
          matched = true;
          break;
        }
      }
      if (!matched) unassigned.push(sentence);
    }
    // Distribute unassigned to remaining asked fields
    const stillMissing = askedMissing.filter((k) => !fieldsUpdated.includes(k));
    for (let i = 0; i < stillMissing.length && i < unassigned.length; i++) {
      fieldUpdates[stillMissing[i]] = unassigned[i];
      fieldsUpdated.push(stillMissing[i]);
    }
  }

  // Fallback: if we couldn't detect asked fields, assign to first missing
  if (fieldsUpdated.length === 0 && req.missingFields.length > 0) {
    const target = req.missingFields[0] as keyof BrandFieldValues;
    fieldUpdates[target] = userText;
    fieldsUpdated.push(target);
  }

  const remaining = req.missingFields.length - fieldsUpdated.length;

  let reply: string;
  if (fieldsUpdated.length > 1) {
    const labels = fieldsUpdated.map((k) => FIELDS.find((f) => f.key === k)?.label || k);
    reply = `Great — I captured **${fieldsUpdated.length} details**: ${labels.join(', ')}.`;
    reply += remaining > 0 ? ` **${remaining}** more to go!` : " That's everything!";
  } else if (fieldsUpdated.length === 1) {
    const label = FIELDS.find((f) => f.key === fieldsUpdated[0])?.label || '';
    reply = remaining > 0
      ? `Got it — saved to **${label}**. ${remaining} more to go.`
      : `Perfect — **${label}** completes your profile!`;
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
