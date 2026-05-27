/* ─────────────────────────────────────────────
 * WizardEmailGate — Lead capture before export
 *
 * Soft gate: users enter email to download their
 * brand files. Skip option available for those
 * who prefer not to share.
 * ───────────────────────────────────────────── */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WEBHOOK_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import type { BrandFieldValues, AnalysisResult } from '@/types/wizard';

interface WizardEmailGateProps {
  fieldsCompleted: number;
  totalFields: number;
  fields: BrandFieldValues;
  analysisResult: AnalysisResult | null;
  onContinue: (email?: string) => void;
  onBack: () => void;
}

export function WizardEmailGate({ fieldsCompleted, totalFields, fields, analysisResult, onContinue, onBack }: WizardEmailGateProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Fire-and-forget: always let the user proceed.
    // The lead-capture webhook is best-effort — if it fails,
    // the user should still get their files.
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Anonymous',
          email,
          source: 'venture-wizard',
          fieldsCompleted,
          totalFields,
          profile: fields,
          architectProposals: analysisResult?.bonusInsights || {},
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {/* swallow — best-effort */});
    } catch {
      /* swallow */
    }

    // Always succeed for the user
    setStatus('success');
    trackEvent('email_capture', {
      source: 'venture-wizard',
      fields_completed: fieldsCompleted,
    });
    setTimeout(() => onContinue(email), 1200);
  }

  function handleSkip() {
    trackEvent('email_gate_skip', { source: 'venture-wizard' });
    onContinue();
  }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md rounded-2xl border border-brand-yellow/20 bg-gradient-to-b from-brand-yellow/5 to-transparent p-8 text-center"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-yellow/10">
          <Gift className="h-7 w-7 text-brand-yellow" />
        </div>

        <h3 className="text-xl font-bold text-foreground">
          Your FABRIC Package is Ready!
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {fieldsCompleted} of {totalFields} fields completed — {Math.round((fieldsCompleted / totalFields) * 100)}% coverage.
        </p>

        {/* File preview */}
        <div className="mt-5 space-y-2 text-left">
          <p className="text-xs font-semibold text-brand-yellow mb-2 uppercase tracking-wider">Included in your Starter Kit:</p>
          {[
            { name: 'F-foundations/', desc: 'Identity, Positioning, and Voice' },
            { name: 'A-agents/', desc: 'Custom AI agents solving your gaps' },
            { name: 'R-routines/', desc: 'Automations for your weekly tasks' },
            { name: 'C-creations/', desc: 'Sample outputs in your exact Voice' },
          ].map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 px-4 py-2.5 text-start"
            >
              <Sparkles className="h-4 w-4 shrink-0 text-brand-yellow" />
              <div>
                <p className="font-mono text-xs font-medium text-brand-yellow">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Email form */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md"
      >
        {status === 'success' ? (
          <div className="rounded-xl border border-success/20 bg-success-soft p-5 text-center">
            <p className="font-medium text-success">✓ Got it! Preparing your files…</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <p className="text-sm text-muted-foreground">
                <Mail className="mr-1.5 inline-block h-4 w-4" />
                Enter your email to receive your custom FABRIC package
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/40"
              />
              <Input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/40"
              />
              {/* Honeypot — hidden from humans */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <Button
                type="submit"
                className="w-full gap-2"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  'Sending…'
                ) : (
                  <>
                    Get My FABRIC Package <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {status === 'error' && (
              <p className="mt-2 text-center text-xs text-danger">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="button"
              onClick={handleSkip}
              className="mt-4 block w-full text-center text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              Skip — download without email
            </button>

            <p className="mt-3 text-center text-[10px] text-muted-foreground/60">
              No spam, ever. Unsubscribe anytime.
            </p>
          </>
        )}
      </motion.div>

      {/* Back button */}
      <Button variant="ghost" size="sm" onClick={onBack} className="text-muted-foreground">
        ← Back to review
      </Button>
    </div>
  );
}
