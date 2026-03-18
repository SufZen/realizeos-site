/* ─────────────────────────────────────────────
 * Venture Analysis API Service
 *
 * Calls n8n webhook endpoints for LLM-powered:
 * 1. Document analysis (22-field extraction)
 * 2. Conversational gap-fill
 * 3. URL text extraction
 *
 * Client-side file parsing (PDF, DOCX, XLSX) is
 * handled locally — only the extracted text is
 * sent to the backend.
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
import { WIZARD_API } from '@/lib/constants';

// ── pdf.js worker setup ──
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// ── Rate limiting ──

const sessionLimits = { analysisCalls: 0, conversationTurns: 0 };
const MAX_ANALYSIS_CALLS = 3;
const MAX_CONVERSATION_TURNS = 30;

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
  // Rate limit
  if (sessionLimits.analysisCalls >= MAX_ANALYSIS_CALLS) {
    throw new Error('Analysis limit reached. Please review and edit your profile manually, or start a new session.');
  }
  sessionLimits.analysisCalls++;

  try {
    const res = await fetch(WIZARD_API.analyze, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`Analysis failed: ${res.statusText}`);
    return res.json();
  } catch (err) {
    // If n8n is unreachable, return all fields as NOT_FOUND
    // so the wizard falls through to conversation mode
    console.warn('n8n analysis unavailable, falling back to conversation mode:', err);
    return fallbackAnalysis();
  }
}

// ── Conversation: handle follow-up messages ──

export async function sendConversationMessage(req: ConversationRequest): Promise<ConversationResponse> {
  // Rate limit
  if (sessionLimits.conversationTurns >= MAX_CONVERSATION_TURNS) {
    return {
      reply: "You've reached the conversation limit for this session. Please review and edit your profile manually.",
      fieldUpdates: {},
      suggestions: ['Review my profile'],
      fieldsUpdated: [],
    };
  }
  sessionLimits.conversationTurns++;

  try {
    const res = await fetch(WIZARD_API.conversation, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw new Error(`Conversation failed: ${res.statusText}`);
    return res.json();
  } catch (err) {
    // If n8n is unreachable, use simple local fallback
    console.warn('n8n conversation unavailable, using local fallback:', err);
    return fallbackConversation(req);
  }
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
    return extractPdfText(file);
  }

  // DOCX files
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.type === 'application/msword' ||
    ['docx', 'doc'].includes(ext)
  ) {
    return extractDocxText(file);
  }

  // XLSX / XLS files
  if (
    file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.type === 'application/vnd.ms-excel' ||
    ['xlsx', 'xls'].includes(ext)
  ) {
    return extractXlsxText(file);
  }

  // Image files — can't extract text in browser
  if (file.type.startsWith('image/')) {
    return `[Image file — text extraction not available in browser. Upload as PDF or describe in chat.]`;
  }

  return `[Unsupported file type: ${file.name}]`;
}

async function extractPdfText(file: File): Promise<string> {
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

async function extractDocxText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  if (!result.value.trim()) {
    return `[DOCX file appears to be empty or contains only images.]`;
  }
  return result.value;
}

async function extractXlsxText(file: File): Promise<string> {
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
  const res = await fetch(WIZARD_API.extractUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error(`URL extraction failed: ${res.statusText}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  if (!data.text?.trim()) throw new Error('No text content found on this page');
  return data.text;
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
      content: `Amazing — I found information for **all ${totalFields} fields** from your documents! Your venture profile is fully populated.\n\nYou can go straight to **Review** to fine-tune anything, or we can refine specific answers together.`,
      timestamp: Date.now(),
      suggestions: ['Review my venture profile', 'Let\'s refine some answers'],
    };
  }

  if (fieldsFound >= totalFields * 0.7) {
    const remaining = missingFields.length;
    const sectionHints = getSectionSummary(missingFields);
    return {
      id: 'welcome',
      role: 'assistant',
      content: `Great work! I extracted **${fieldsFound} of ${totalFields}** fields (${foundPct}%) from your materials.\n\nI just need **${remaining} more detail${remaining > 1 ? 's' : ''}**${sectionHints}. This should only take a minute.\n\nOr you can skip to review and fill them in manually.`,
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

export function getNextQuestion(
  fields: BrandFieldValues,
  justUpdated?: (keyof BrandFieldValues)[],
): ChatMessage | null {
  const missing = getMissingFields(fields);
  const remaining = missing.filter((k) => !justUpdated?.includes(k));
  if (remaining.length === 0) return null;

  const sectionOrder: Array<'identity' | 'business' | 'voice' | 'examples'> = ['identity', 'business', 'voice', 'examples'];
  for (const section of sectionOrder) {
    const sectionMissing = remaining
      .map((k) => FIELDS.find((f) => f.key === k))
      .filter((f) => f && f.section === section)
      .slice(0, 3);

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

    const labels = sectionMissing.map((f) => `\u2022 **${f!.label}**: ${f!.hint}`).join('\n');
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
// FALLBACKS — used only when n8n is unreachable
// ──────────────────────────────────────────────

/** Return all fields as NOT_FOUND so the wizard skips to conversation mode */
function fallbackAnalysis(): AnalysisResult {
  const fields: Record<string, ExtractedField> = {};
  for (const fieldDef of FIELDS) {
    fields[fieldDef.key] = {
      value: null,
      confidence: 'NOT_FOUND' as Confidence,
      source: null,
      followUpQuestion: `${fieldDef.label}? ${fieldDef.hint}`,
    };
  }
  return {
    fields: fields as AnalysisResult['fields'],
    bonusInsights: {
      competitors: [],
      writingPatterns: { toneProfile: '', vocabularyFrequent: [], vocabularyAvoided: [] },
      marketClues: '',
    },
  };
}

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

/** Simple local conversation fallback — assigns user text to the asked field */
function fallbackConversation(req: ConversationRequest): ConversationResponse {
  const lastUserMsg = req.messages.filter((m) => m.role === 'user').pop();
  if (!lastUserMsg) {
    return { reply: 'Tell me more about your business.', fieldUpdates: {}, suggestions: [], fieldsUpdated: [] };
  }

  const userText = lastUserMsg.content;
  const fieldUpdates: Partial<BrandFieldValues> = {};
  const fieldsUpdated: (keyof BrandFieldValues)[] = [];

  // Skip/pass detection
  if (/^(?:skip|i\s+don'?t\s+know|not\s+sure|pass|next|n\/?a)$/i.test(userText.trim())) {
    return {
      reply: req.missingFields.length > 1 ? `No problem, let's move on.` : "That's okay, let's move on.",
      fieldUpdates: {},
      suggestions: [],
      fieldsUpdated: [],
    };
  }

  // Assign to the asked field(s)
  const askedFields = detectAskedFields(req.messages);
  const askedMissing = askedFields.filter((k) => req.missingFields.includes(k));

  if (askedMissing.length >= 1) {
    fieldUpdates[askedMissing[0]] = userText;
    fieldsUpdated.push(askedMissing[0]);
  } else if (req.missingFields.length > 0) {
    const target = req.missingFields[0] as keyof BrandFieldValues;
    fieldUpdates[target] = userText;
    fieldsUpdated.push(target);
  }

  const remaining = req.missingFields.length - fieldsUpdated.length;
  const label = fieldsUpdated.length > 0
    ? FIELDS.find((f) => f.key === fieldsUpdated[0])?.label || ''
    : '';

  return {
    reply: fieldsUpdated.length > 0
      ? (remaining > 0 ? `Got it — saved to **${label}**. ${remaining} more to go.` : `Perfect — **${label}** completes your profile!`)
      : "Thanks! Let me note that down.",
    fieldUpdates,
    suggestions: remaining === 0 ? ['Review my profile'] : [],
    fieldsUpdated,
  };
}
