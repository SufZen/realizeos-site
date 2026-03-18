/* ─────────────────────────────────────────────
 * WizardAnalyzing — Processing animation
 * ───────────────────────────────────────────── */
import { motion } from 'framer-motion';
import { Brain, FileSearch, Sparkles, CheckCircle2, Loader2, AlertTriangle, XCircle } from 'lucide-react';
import type { UploadedDocument } from '@/types/wizard';

interface WizardAnalyzingProps {
  documents: UploadedDocument[];
  fieldsFound: number;
  fieldsTotal: number;
  isComplete: boolean;
}

const STAGES = [
  { id: 'parse', label: 'Parsing documents', icon: FileSearch },
  { id: 'analyze', label: 'Extracting brand information', icon: Brain },
  { id: 'enrich', label: 'Generating insights', icon: Sparkles },
] as const;

export function WizardAnalyzing({ documents, fieldsFound, fieldsTotal, isComplete }: WizardAnalyzingProps) {
  // Progress through stages based on fieldsFound ratio
  const ratio = fieldsTotal > 0 ? fieldsFound / fieldsTotal : 0;
  const currentStage = isComplete ? 3 : ratio > 0.5 ? 2 : ratio > 0 ? 1 : 0;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Pulsing brain icon */}
      <motion.div
        animate={{
          scale: isComplete ? [1, 1] : [1, 1.05, 1],
          opacity: isComplete ? 1 : [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: isComplete ? 0 : Infinity }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/10"
      >
        {isComplete ? (
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        ) : (
          <Brain className="h-10 w-10 text-brand-yellow" />
        )}
      </motion.div>

      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">
          {isComplete ? 'Analysis Complete' : 'Analyzing Your Materials'}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {isComplete
            ? `Found information for ${fieldsFound} of ${fieldsTotal} fields`
            : 'This usually takes 15-30 seconds...'}
        </p>
      </div>

      {/* Document list */}
      <div className="w-full max-w-sm space-y-2">
        {documents.map((doc, i) => {
          const hasRealText = !!doc.extractedText && doc.extractedText.length > 10;
          let icon: React.ReactNode;
          let statusLabel: string;

          if (doc.status === 'processing') {
            icon = <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-yellow" />;
            statusLabel = 'processing...';
          } else if (doc.status === 'error') {
            icon = <XCircle className="h-4 w-4 shrink-0 text-red-400" />;
            statusLabel = 'failed';
          } else if (doc.status === 'ready' && hasRealText) {
            icon = <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />;
            statusLabel = 'analyzed';
          } else {
            icon = <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-500" />;
            statusLabel = 'limited';
          }

          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 px-4 py-2.5"
              title={doc.status === 'error' && doc.errorMessage ? doc.errorMessage : undefined}
            >
              {icon}
              <span className="flex-1 truncate text-sm text-foreground">{doc.name}</span>
              <span className="text-xs text-muted-foreground">{statusLabel}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Stage indicators */}
      <div className="w-full max-w-sm space-y-3">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isDone = i < currentStage;
          const isActive = i === currentStage && !isComplete;

          return (
            <div key={stage.id} className="flex items-center gap-3">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isDone ? 'bg-green-400/10' : isActive ? 'bg-brand-yellow/10' : 'bg-muted/30'
              }`}>
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin text-brand-yellow" />
                ) : (
                  <Icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <span className={`text-sm ${isDone ? 'text-green-400' : isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Fields found counter */}
      {fieldsFound > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 px-6 py-3 text-center"
        >
          <p className="text-sm text-foreground">
            Found <strong className="text-brand-yellow">{fieldsFound}</strong> of {fieldsTotal} fields in your documents
          </p>
          {fieldsFound < fieldsTotal && !isComplete && (
            <p className="mt-1 text-xs text-muted-foreground">
              We'll ask about the rest in a quick conversation
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
