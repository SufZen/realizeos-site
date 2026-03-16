/* ─────────────────────────────────────────────
 * BrandWizardAI — Main orchestrator
 *
 * A full-page, AI-powered brand wizard that replaces
 * the original 5-step form dialog with a conversational,
 * document-ingestion-first experience.
 * ───────────────────────────────────────────── */
import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Brain, Upload as UploadIcon, MessageSquare, ClipboardCheck, Download } from 'lucide-react';
import { WizardUpload } from './WizardUpload';
import { WizardAnalyzing } from './WizardAnalyzing';
import { WizardChat } from './WizardChat';
import { WizardReview } from './WizardReview';
import { WizardExport } from './WizardExport';
import {
  type WizardPhase,
  type BrandFieldValues,
  type UploadedDocument,
  type ChatMessage,
  type Confidence,
  type AnalysisResult,
  EMPTY_FIELD_VALUES,
  BRAND_FIELDS,
} from '@/types/wizard';
import {
  analyzeDocuments,
  sendConversationMessage,
  getMissingFields,
  getWelcomeMessage,
  getNextQuestion,
} from '@/lib/brand-analysis';

const STORAGE_KEY = 'realizeos_ai_wizard_v1';

interface PhaseStep {
  id: WizardPhase;
  label: string;
  icon: React.ReactNode;
}

const PHASE_STEPS: PhaseStep[] = [
  { id: 'upload', label: 'Upload', icon: <UploadIcon className="h-3.5 w-3.5" /> },
  { id: 'analyzing', label: 'Analyze', icon: <Brain className="h-3.5 w-3.5" /> },
  { id: 'conversation', label: 'Chat', icon: <MessageSquare className="h-3.5 w-3.5" /> },
  { id: 'review', label: 'Review', icon: <ClipboardCheck className="h-3.5 w-3.5" /> },
  { id: 'export', label: 'Export', icon: <Download className="h-3.5 w-3.5" /> },
];

function phaseIndex(phase: WizardPhase): number {
  return PHASE_STEPS.findIndex((s) => s.id === phase);
}

interface BrandWizardAIProps {
  onClose?: () => void;
}

export function BrandWizardAI({ onClose }: BrandWizardAIProps) {
  // ── State ──
  const [phase, setPhase] = useState<WizardPhase>('upload');
  const [documents, setDocuments] = useState<UploadedDocument[]>([]);
  const [fields, setFields] = useState<BrandFieldValues>(EMPTY_FIELD_VALUES);
  const [fieldConfidence, setFieldConfidence] = useState<Partial<Record<keyof BrandFieldValues, Confidence>>>({});
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [analyzeFieldsFound, setAnalyzeFieldsFound] = useState(0);

  // ── Derived ──
  const filledCount = useMemo(
    () => BRAND_FIELDS.filter((f) => fields[f.key].trim().length > 0).length,
    [fields],
  );
  const totalFields = BRAND_FIELDS.length;

  // ── Persistence ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.fields) setFields({ ...EMPTY_FIELD_VALUES, ...data.fields });
        if (data.phase) setPhase(data.phase);
        if (data.messages) setMessages(data.messages);
        if (data.documents) setDocuments(data.documents);
        if (data.fieldConfidence) setFieldConfidence(data.fieldConfidence);
        if (data.analysisResult) setAnalysisResult(data.analysisResult);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        fields, phase, messages, documents, fieldConfidence, analysisResult,
      }));
    } catch { /* ignore */ }
  }, [fields, phase, messages, documents, fieldConfidence, analysisResult]);

  // ── Handlers ──

  const handleFieldChange = useCallback((key: keyof BrandFieldValues, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAnalyze = useCallback(async () => {
    setPhase('analyzing');
    setAnalyzeFieldsFound(0);

    try {
      const docData = documents.map((d) => ({
        name: d.name,
        type: d.type,
        text: d.extractedText || `[Contents of ${d.name}]`,
      }));

      const result = await analyzeDocuments({ documents: docData, existingFields: fields });
      setAnalysisResult(result);

      // Apply extracted fields
      const newFields = { ...fields };
      const newConfidence: Partial<Record<keyof BrandFieldValues, Confidence>> = {};
      let found = 0;

      for (const [key, extracted] of Object.entries(result.fields)) {
        const k = key as keyof BrandFieldValues;
        newConfidence[k] = extracted.confidence;
        if (extracted.value && extracted.confidence !== 'NOT_FOUND') {
          newFields[k] = extracted.value;
          found++;
        }
      }

      setAnalyzeFieldsFound(found);
      setFields(newFields);
      setFieldConfidence(newConfidence);

      // Small delay for the animation, then move to conversation
      await new Promise((r) => setTimeout(r, 1500));

      const missing = getMissingFields(newFields);
      const welcome = getWelcomeMessage(found, totalFields, missing);
      setMessages([welcome]);
      setPhase(missing.length > 0 ? 'conversation' : 'review');
    } catch (error) {
      console.error('Analysis failed:', error);
      // Fallback to conversation mode
      setMessages([{
        id: 'error-fallback',
        role: 'assistant',
        content: "I had trouble analyzing your documents, but no worries — let's build your brand profile through a quick conversation instead. What's your name and role?",
        timestamp: Date.now(),
      }]);
      setPhase('conversation');
    }
  }, [documents, fields, totalFields]);

  const handleSkipUpload = useCallback(() => {
    const missing = getMissingFields(fields);
    const welcome = getWelcomeMessage(0, totalFields, missing);
    const msgs: ChatMessage[] = [welcome];

    // Immediately queue the first grouped question
    const nextQ = getNextQuestion(fields);
    if (nextQ) {
      nextQ.timestamp = Date.now() + 100;
      msgs.push(nextQ);
    }

    setMessages(msgs);
    setPhase('conversation');
  }, [fields, totalFields]);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const missing = getMissingFields(fields);
      const resp = await sendConversationMessage({
        messages: [...messages, userMsg].map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
        currentFields: fields,
        missingFields: missing,
      });

      // Apply field updates
      if (resp.fieldUpdates && Object.keys(resp.fieldUpdates).length > 0) {
        setFields((prev) => ({ ...prev, ...resp.fieldUpdates }));
        // Set confidence for conversational answers
        for (const key of resp.fieldsUpdated) {
          setFieldConfidence((prev) => ({ ...prev, [key]: 'HIGH' as Confidence }));
        }
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: resp.reply,
        timestamp: Date.now(),
        suggestions: resp.suggestions,
        fieldsUpdated: resp.fieldsUpdated,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Check if all fields are filled — auto-suggest review
      const updatedFields = { ...fields, ...resp.fieldUpdates };
      const remaining = getMissingFields(updatedFields);

      if (remaining.length === 0) {
        await new Promise((r) => setTimeout(r, 800));
        const doneMsg: ChatMessage = {
          id: `done-${Date.now()}`,
          role: 'assistant',
          content: '🎉 All fields are complete! Your brand profile is ready for review.',
          timestamp: Date.now(),
          suggestions: ['Review my profile'],
        };
        setMessages((prev) => [...prev, doneMsg]);
      } else {
        // Queue the next grouped question
        const nextQ = getNextQuestion(updatedFields, resp.fieldsUpdated);
        if (nextQ) {
          await new Promise((r) => setTimeout(r, 600));
          setMessages((prev) => [...prev, nextQ]);
        }
      }
    } catch (error) {
      console.error('Conversation error:', error);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again or skip to the review step.',
        timestamp: Date.now(),
        suggestions: ['Skip to review'],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsThinking(false);
    }
  }, [fields, messages]);

  const handleSelectSuggestion = useCallback((suggestion: string) => {
    const lower = suggestion.toLowerCase();
    if (lower.includes('review')) {
      setPhase('review');
    } else if (lower.includes('skip to review')) {
      setPhase('review');
    } else if (lower.includes('refine') || lower.includes("let's do it") || lower.includes("let's fill")) {
      // Stay in conversation — trigger next question
      const nextQ = getNextQuestion(fields);
      if (nextQ) {
        setMessages((prev) => [...prev, nextQ]);
      }
    } else {
      handleSendMessage(suggestion);
    }
  }, [handleSendMessage, fields]);

  const handleReset = useCallback(() => {
    setPhase('upload');
    setDocuments([]);
    setFields(EMPTY_FIELD_VALUES);
    setFieldConfidence({});
    setMessages([]);
    setAnalysisResult(null);
    setAnalyzeFieldsFound(0);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // ── Render ──

  const currentPhaseIdx = phaseIndex(phase);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-border glass">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
          {onClose && (
            <button onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="flex items-center gap-2 text-base font-semibold">
              <Brain className="h-5 w-5 text-brand-yellow" />
              <span>Brand Intelligence Engine</span>
            </h1>
          </div>
          {phase !== 'upload' && (
            <button
              onClick={handleReset}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Start over
            </button>
          )}
        </div>

        {/* Progress steps */}
        <div className="mx-auto flex max-w-3xl gap-1 px-4 pb-3">
          {PHASE_STEPS.map((step, i) => (
            <button
              key={step.id}
              onClick={() => {
                // Only allow going back to completed steps
                if (i <= currentPhaseIdx) setPhase(step.id);
              }}
              disabled={i > currentPhaseIdx}
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg px-2 py-1.5 transition-colors ${
                i === currentPhaseIdx
                  ? 'bg-brand-yellow/10'
                  : i < currentPhaseIdx
                    ? 'cursor-pointer hover:bg-muted/30'
                    : 'opacity-40 cursor-not-allowed'
              }`}
            >
              <div className={`h-1 w-full rounded-full transition-colors ${
                i <= currentPhaseIdx ? 'bg-brand-yellow' : 'bg-border'
              }`} />
              <div className={`flex items-center gap-1 text-[11px] font-medium ${
                i === currentPhaseIdx ? 'text-brand-yellow' : i < currentPhaseIdx ? 'text-muted-foreground' : 'text-muted-foreground/50'
              }`}>
                {step.icon}
                {step.label}
              </div>
            </button>
          ))}
        </div>
      </header>

      {/* ── Body ── */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className={phase === 'conversation' ? 'flex h-[calc(100vh-180px)] flex-col' : ''}
          >
            {phase === 'upload' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gradient-yellow text-glow-yellow">
                    Define Your Brand, Intelligently
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                    Upload your existing materials — pitch decks, websites, brand guides — and I'll extract everything I need. No blank forms.
                  </p>
                </div>
                <WizardUpload
                  documents={documents}
                  onDocumentsChange={setDocuments}
                  onAnalyze={handleAnalyze}
                  onSkip={handleSkipUpload}
                />
              </div>
            )}

            {phase === 'analyzing' && (
              <WizardAnalyzing
                documents={documents}
                fieldsFound={analyzeFieldsFound}
                fieldsTotal={totalFields}
                isComplete={analyzeFieldsFound > 0}
              />
            )}

            {phase === 'conversation' && (
              <WizardChat
                messages={messages}
                onSendMessage={handleSendMessage}
                onSelectSuggestion={handleSelectSuggestion}
                onFinishConversation={() => setPhase('review')}
                isThinking={isThinking}
                fieldsComplete={filledCount}
                fieldsTotal={totalFields}
              />
            )}

            {phase === 'review' && (
              <WizardReview
                fields={fields}
                fieldConfidence={fieldConfidence}
                onFieldChange={handleFieldChange}
                onFinalize={() => setPhase('export')}
                onBack={() => setPhase('conversation')}
              />
            )}

            {phase === 'export' && (
              <WizardExport
                fields={fields}
                analysisResult={analysisResult}
                onReset={handleReset}
                onBack={() => setPhase('review')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default BrandWizardAI;
