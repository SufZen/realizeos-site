/* ─────────────────────────────────────────────
 * AI Brand Wizard — Shared Types & Schema
 * ───────────────────────────────────────────── */

// ── Wizard field schema (maps 1-to-1 with generate-markdown.ts) ──

export interface BrandField {
  key: keyof BrandFieldValues;
  label: string;
  hint: string;
  placeholder: string;
  section: 'identity' | 'business' | 'voice' | 'examples';
  /** Which output file this field maps to */
  outputFile: 'identity.md' | 'brand-identity.md' | 'brand-voice.md';
}

export interface BrandFieldValues {
  // Step 1: About You → shared/identity.md
  nameRole: string;
  strengths: string;
  gaps: string;
  commPrefs: string;
  personalValues: string;
  antiPatterns: string;
  // Step 2: Your Business → brand-identity.md
  bizNameTagline: string;
  mission: string;
  audience: string;
  values: string;
  uvp: string;
  positioning: string;
  offerings: string;
  brandPersonality: string;
  // Step 3: Your Voice → brand-voice.md
  tone: string;
  vocabulary: string;
  formatting: string;
  dosDonts: string;
  channelAdjustments: string;
  // Step 4: Examples → appended to brand-voice.md
  goodExample: string;
  badExample: string;
  workflows: string;
}

export const EMPTY_FIELD_VALUES: BrandFieldValues = {
  nameRole: '', strengths: '', gaps: '', commPrefs: '',
  personalValues: '', antiPatterns: '',
  bizNameTagline: '', mission: '', audience: '', values: '',
  uvp: '', positioning: '', offerings: '', brandPersonality: '',
  tone: '', vocabulary: '', formatting: '', dosDonts: '',
  channelAdjustments: '',
  goodExample: '', badExample: '', workflows: '',
};

// ── Confidence scoring ──

export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW' | 'NOT_FOUND';

export interface ExtractedField {
  value: string | null;
  confidence: Confidence;
  source: string | null;
  followUpQuestion: string | null;
}

// ── Analysis result from LLM ──

export interface AnalysisResult {
  fields: Record<keyof BrandFieldValues, ExtractedField>;
  bonusInsights: {
    competitors: string[];
    writingPatterns: {
      toneProfile: string;
      vocabularyFrequent: string[];
      vocabularyAvoided: string[];
    };
    marketClues: string;
  };
}

// ── Uploaded document ──

export interface UploadedDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'image' | 'text' | 'url' | 'google-doc' | 'google-sheet' | 'google-slide';
  size: number;
  /** raw text extracted from the document */
  extractedText?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  errorMessage?: string;
}

// ── Chat message ──

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  /** Optional quick-reply suggestions */
  suggestions?: string[];
  /** Fields that were updated by this message */
  fieldsUpdated?: (keyof BrandFieldValues)[];
}

// ── Wizard phases ──

export type WizardPhase =
  | 'upload'       // Step 1: Upload documents + paste links
  | 'analyzing'    // Step 2: LLM is processing
  | 'conversation' // Step 3: Conversational gap-fill
  | 'review'       // Step 4: Review & refine
  | 'export';      // Step 5: Generate & download

// ── Session state (persisted in localStorage) ──

export interface WizardSession {
  id: string;
  phase: WizardPhase;
  documents: UploadedDocument[];
  fields: BrandFieldValues;
  fieldConfidence: Partial<Record<keyof BrandFieldValues, Confidence>>;
  messages: ChatMessage[];
  analysisResult: AnalysisResult | null;
  createdAt: number;
  updatedAt: number;
}

// ── Field definitions for the UI ──

export const BRAND_FIELDS: BrandField[] = [
  // Identity
  { key: 'nameRole', label: 'Name & Role', hint: 'Your name and role in the business', placeholder: 'E.g. Sara Cohen, Founder at TechFlow', section: 'identity', outputFile: 'identity.md' },
  { key: 'strengths', label: 'Top 3 Strengths', hint: 'What you are best at', placeholder: 'E.g. Systems thinking, closing deals, simplifying complex ideas', section: 'identity', outputFile: 'identity.md' },
  { key: 'gaps', label: 'Where You Need Help', hint: 'Where AI should focus', placeholder: 'E.g. Content creation, financial analysis, staying organized', section: 'identity', outputFile: 'identity.md' },
  { key: 'commPrefs', label: 'Communication Preferences', hint: 'How you like receiving information', placeholder: 'E.g. Brief, bullet points, give recommendations', section: 'identity', outputFile: 'identity.md' },
  { key: 'personalValues', label: 'Personal Values', hint: 'Top 3 values that drive your decisions', placeholder: 'E.g. Ownership, Clarity, Results', section: 'identity', outputFile: 'identity.md' },
  { key: 'antiPatterns', label: 'Anti-Patterns', hint: 'What frustrates you', placeholder: 'E.g. Long preambles, jargon, too many questions at once', section: 'identity', outputFile: 'identity.md' },
  // Business
  { key: 'bizNameTagline', label: 'Business Name & Tagline', hint: 'What you do in one sentence', placeholder: 'E.g. TechFlow — Self-serve analytics for mid-market teams', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'mission', label: 'Mission', hint: 'The problem you solve', placeholder: 'E.g. We make data analytics accessible to every team', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'audience', label: 'Ideal Customer', hint: 'Picture one specific person', placeholder: 'E.g. A VP of Analytics at a 200-person company', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'values', label: 'Core Values', hint: '3-5 values with examples', placeholder: 'E.g. Transparency, Speed, Simplicity', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'uvp', label: 'Unique Value Proposition', hint: '"We are the only [X] that [Y] for [Z]"', placeholder: 'E.g. The only analytics platform that…', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'positioning', label: 'Market Positioning', hint: 'What you ARE vs what you\'re NOT', placeholder: 'E.g. We ARE the self-serve option. We are NOT an enterprise suite.', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'offerings', label: 'Key Offerings', hint: '2-4 products/services', placeholder: 'E.g. 1) Platform — $99/mo. 2) Enterprise — custom pricing', section: 'business', outputFile: 'brand-identity.md' },
  { key: 'brandPersonality', label: 'Brand Personality', hint: '3-5 adjectives for your brand', placeholder: 'E.g. Professional, Approachable, Bold', section: 'business', outputFile: 'brand-identity.md' },
  // Voice
  { key: 'tone', label: 'Tone of Voice', hint: 'How your brand sounds', placeholder: 'E.g. Direct but warm. Like a senior engineer who communicates well.', section: 'voice', outputFile: 'brand-voice.md' },
  { key: 'vocabulary', label: 'Vocabulary', hint: 'Words you use vs avoid', placeholder: 'USE: build, ship, clear. AVOID: synergy, disrupt, game-changing', section: 'voice', outputFile: 'brand-voice.md' },
  { key: 'formatting', label: 'Formatting Rules', hint: 'Sentence length, lists, emoji usage', placeholder: 'E.g. Short sentences. Bullet points. No emojis. Active voice.', section: 'voice', outputFile: 'brand-voice.md' },
  { key: 'dosDonts', label: "Do's and Don'ts", hint: 'Rules you always/never follow', placeholder: 'ALWAYS: Lead with benefit. NEVER: Passive voice, jargon', section: 'voice', outputFile: 'brand-voice.md' },
  { key: 'channelAdjustments', label: 'Channel Adjustments', hint: 'Tone shift per platform', placeholder: 'E.g. LinkedIn: formal. Email: brief. Social: energetic.', section: 'voice', outputFile: 'brand-voice.md' },
  // Examples
  { key: 'goodExample', label: 'Good Example', hint: 'A paragraph that sounds like you', placeholder: '"Most AI setups are a mess of disconnected chatbots…"', section: 'examples', outputFile: 'brand-voice.md' },
  { key: 'badExample', label: 'Bad Example', hint: 'A paragraph that sounds nothing like you', placeholder: '"We leverage cutting-edge solutions to disrupt paradigms…"', section: 'examples', outputFile: 'brand-voice.md' },
  { key: 'workflows', label: 'Weekly Workflows', hint: '3 tasks you repeat every week', placeholder: 'E.g. LinkedIn posts, client proposals, competitor research', section: 'examples', outputFile: 'brand-voice.md' },
];
