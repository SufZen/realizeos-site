import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  type WizardState,
  emptyWizardState,
  generateIdentityMd,
  generateBrandIdentityMd,
  generateBrandVoiceMd,
} from '@/lib/generate-markdown';

const STORAGE_KEY = 'realizeos_wizard_v1';

const STEPS = [
  { id: 1, label: 'About You' },
  { id: 2, label: 'Your Business' },
  { id: 3, label: 'Your Voice' },
  { id: 4, label: 'Examples' },
  { id: 5, label: 'Export' },
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-foreground">{children}</label>;
}

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-xs text-muted-foreground">{children}</p>;
}

function Field({
  label, hint, value, onChange, placeholder, rows = 3,
}: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; placeholder: string; rows?: number;
}) {
  return (
    <div className="mb-4">
      <FieldLabel>{label}</FieldLabel>
      {hint && <Hint>{hint}</Hint>}
      <textarea
        className="w-full resize-y rounded-md border border-white/10 bg-black/40 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand-yellow/60 focus:outline-none focus:ring-1 focus:ring-brand-yellow/30"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

function CopyButton({ text, filename }: { text: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="flex gap-2">
      <Button size="sm" variant="default" onClick={handleCopy} className="flex-1">
        {copied ? '✓ Copied!' : 'Copy'}
      </Button>
      <Button size="sm" variant="outline" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
}

function ExportFile({ label, sublabel, content, filename }: {
  label: string; sublabel: string; content: string; filename: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <p className="mb-0.5 font-mono text-xs font-medium text-brand-yellow">{label}</p>
      <p className="mb-3 text-xs text-muted-foreground">{sublabel}</p>
      <CopyButton text={content} filename={filename} />
    </div>
  );
}

interface BrandWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BrandWizard({ open, onOpenChange }: BrandWizardProps) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(emptyWizardState);

  const set = useCallback(<K extends keyof WizardState>(key: K, value: WizardState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setState({ ...emptyWizardState, ...JSON.parse(saved) });
    } catch { /* ignore */ }
  }, []);

  // Auto-save on change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state]);

  const identityMd = generateIdentityMd(state);
  const brandIdentityMd = generateBrandIdentityMd(state);
  const brandVoiceMd = generateBrandVoiceMd(state);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-2xl flex-col gap-0 overflow-hidden border-white/10 bg-[#0e0e18] p-0">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-4">
          <DialogTitle className="text-base font-semibold">Brand Wizard</DialogTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Fill in your answers — three files will be generated, ready to paste into your vault.
          </p>
          {/* Progress steps */}
          <div className="mt-4 flex gap-1">
            {STEPS.map((s) => (
              <div key={s.id} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className={`h-1 w-full rounded-full transition-colors ${s.id <= step ? 'bg-brand-yellow' : 'bg-white/10'
                    }`}
                />
                <span className={`text-[10px] ${s.id === step ? 'text-brand-yellow' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                This is about <strong className="text-foreground">you</strong> — the person behind the business. Your AI team uses this to understand your perspective and how you like to work.
              </p>
              <Field
                label="What's your name and role?"
                hint="The AI will address you and reference your role in context."
                value={state.nameRole}
                onChange={(v) => set('nameRole', v)}
                placeholder="E.g. Asaf Levy, Founder at Realization Group. I build AI-powered business systems."
              />
              <Field
                label="What are your top 3 strengths?"
                hint="What you're best at — the AI will amplify these."
                value={state.strengths}
                onChange={(v) => set('strengths', v)}
                placeholder="E.g. 1) Systems thinking — I see patterns others miss. 2) Closing deals. 3) Turning complex ideas into simple frameworks."
              />
              <Field
                label="Where do you need the most help?"
                hint="Your gaps — where the AI should focus for highest leverage."
                value={state.gaps}
                onChange={(v) => set('gaps', v)}
                placeholder="E.g. Content creation takes too long. I struggle with detailed financial analysis. Staying organized across projects."
              />
              <Field
                label="How do you like to receive information?"
                hint="Length, format, decision style. The AI will adapt to this."
                value={state.commPrefs}
                onChange={(v) => set('commPrefs', v)}
                placeholder="E.g. Brief and to the point. Bullet points, not prose. Give me a recommendation. Never start with a long preamble."
              />
              <Field
                label="What are your top 3 personal values?"
                hint="What drives your decisions? How do these values show up in your work?"
                value={state.personalValues}
                onChange={(v) => set('personalValues', v)}
                placeholder="E.g. 1) Ownership — I never outsource accountability. 2) Clarity — simple beats impressive. 3) Results over process."
              />
              <Field
                label="What frustrates you or wastes your time?"
                hint="Anti-patterns the AI should avoid. Be specific."
                value={state.antiPatterns}
                onChange={(v) => set('antiPatterns', v)}
                placeholder="E.g. Don't give me long preambles. Don't ask five questions at once. Don't use corporate jargon."
              />
            </>
          )}

          {step === 2 && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                This is about <strong className="text-foreground">your business</strong> — how it should be positioned and what it stands for.
              </p>
              <Field
                label="Business name and tagline"
                hint="The tagline should capture what you do in one memorable sentence."
                value={state.bizNameTagline}
                onChange={(v) => set('bizNameTagline', v)}
                placeholder="E.g. Realization Group — We help ambitious operators build AI-powered business systems."
                rows={2}
              />
              <Field
                label="What's your mission? Why does this business exist?"
                hint="The problem you solve and the outcome you create. Be specific."
                value={state.mission}
                onChange={(v) => set('mission', v)}
                placeholder="E.g. Most businesses waste hours on repetitive work AI can handle. We build the systems that free them to focus on what only humans can do."
              />
              <Field
                label="Who is your ideal customer?"
                hint="Role, industry, company size, pain points. Picture one real person."
                value={state.audience}
                onChange={(v) => set('audience', v)}
                placeholder="E.g. A 38-year-old agency founder running a team of 5-15. Tired of being the content quality bottleneck."
              />
              <Field
                label="What are your 3-5 core values?"
                hint="Values that guide every decision — include what each looks like in practice."
                value={state.values}
                onChange={(v) => set('values', v)}
                placeholder="E.g. 1) Ownership — we never outsource accountability. 2) Clarity — simple beats impressive. 3) Results over process."
              />
              <Field
                label="What makes you different? (Complete this sentence)"
                hint='"We are the only [category] that [benefit] for [audience] by [method]."'
                value={state.uvp}
                onChange={(v) => set('uvp', v)}
                placeholder="E.g. We are the only AI consultancy that ships a working multi-agent system in 7 days for operators managing 3+ ventures."
              />
              <Field
                label="Where do you sit in the market?"
                hint="We ARE: [what you stand for]. We are NOT: [what you're not]."
                value={state.positioning}
                onChange={(v) => set('positioning', v)}
                placeholder="E.g. We ARE the premium, done-for-you option. We are NOT the cheapest option, a generic chatbot agency, or a subscription tool."
                rows={2}
              />
              <Field
                label="Your main products or services"
                hint="2-4 key offerings with a one-line description each."
                value={state.offerings}
                onChange={(v) => set('offerings', v)}
                placeholder="E.g. 1) RealizeOS Lite — $79 AI operating system. 2) RealizeOS Full — $249 self-hosted version. 3) Setup Assistance — hands-on onboarding."
              />
              <Field
                label="If your brand were a person, pick 3-5 adjectives"
                hint="These adjectives define your brand personality and guide tone across all content."
                value={state.brandPersonality}
                onChange={(v) => set('brandPersonality', v)}
                placeholder="E.g. Professional, Approachable, Bold, Analytical, Warm"
                rows={2}
              />
            </>
          )}

          {step === 3 && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                The difference between AI that sounds like you and AI that sounds like everyone else.
              </p>
              <Field
                label="If your brand was a person, how would you describe them?"
                hint="Primary tone, secondary tone, and a 'sounds like' analogy."
                value={state.tone}
                onChange={(v) => set('tone', v)}
                placeholder="E.g. Primary: Direct. Secondary: Analytical. Sounds like a senior engineer who's also a great communicator — no fluff, but never cold."
              />
              <Field
                label="Words you use. Words you avoid."
                hint="5+ brand words/phrases, and 3+ words that feel off-brand."
                value={state.vocabulary}
                onChange={(v) => set('vocabulary', v)}
                placeholder="E.g. USE: build, ship, system, real, clear. AVOID: synergy, disrupt, game-changing, revolutionary (overused buzzwords)."
              />
              <Field
                label="Formatting preferences"
                hint="Sentence length, paragraph length, lists, emoji usage, capitalization."
                value={state.formatting}
                onChange={(v) => set('formatting', v)}
                placeholder="E.g. Short sentences. 2-3 sentence paragraphs. Lists frequently. No emojis. Sentence case headings. Active voice always."
              />
              <Field
                label="Your do's and don'ts"
                hint="3-4 rules you always follow, and 3-4 things you never do."
                value={state.dosDonts}
                onChange={(v) => set('dosDonts', v)}
                placeholder="E.g. ALWAYS: Lead with the benefit. Active voice. Clear CTA. NEVER: Passive voice. Jargon without explanation. Exclamation marks."
              />
              <Field
                label="Any channel-specific voice adjustments?"
                hint="How does your tone shift for LinkedIn vs email vs social media?"
                value={state.channelAdjustments}
                onChange={(v) => set('channelAdjustments', v)}
                placeholder="E.g. LinkedIn: slightly more formal, always include a personal insight. Email: brief, conversational. Social: more energetic, hook in the first line."
              />
            </>
          )}

          {step === 4 && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Real examples are the most powerful input for voice calibration. This step takes your output from generic to genuinely sounding like you.
              </p>
              <Field
                label="Write a paragraph that sounds exactly like you"
                hint="A real example from your content, or write one now. This is the single most powerful input."
                value={state.goodExample}
                onChange={(v) => set('goodExample', v)}
                placeholder={`E.g. "Most AI setups are a mess of disconnected chatbots. Your AI should work as a team — a Writer, a Reviewer, an Analyst — all knowing your business. That's what RealizeOS builds."`}
                rows={4}
              />
              <Field
                label="Write a paragraph that sounds nothing like you"
                hint="The counter-example — helps the AI understand what to avoid."
                value={state.badExample}
                onChange={(v) => set('badExample', v)}
                placeholder={`E.g. "We leverage cutting-edge AI-powered solutions to disrupt your industry's paradigm and unlock synergistic growth opportunities."`}
                rows={4}
              />
              <Field
                label="What 3 workflows do you repeat every week?"
                hint="These become your first AI skills. Be specific."
                value={state.workflows}
                onChange={(v) => set('workflows', v)}
                placeholder="E.g. 1) Writing 3-4 LinkedIn posts per week. 2) Drafting client proposals from meeting notes. 3) Weekly competitor research digest."
              />
            </>
          )}

          {step === 5 && (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Three files are ready. Download each file and place it in the matching location in your RealizeOS vault: identity.md goes in shared/, the other two go in systems/my-business-1/F-foundations/. Auto-saves in your browser — you can close and come back anytime.
              </p>
              <div className="space-y-3">
                <ExportFile
                  label="shared/identity.md"
                  sublabel="Who you are as a person — place in shared/"
                  content={identityMd}
                  filename="identity.md"
                />
                <ExportFile
                  label="systems/my-business-1/F-foundations/brand-identity.md"
                  sublabel="Your business positioning — place in systems/my-business-1/F-foundations/"
                  content={brandIdentityMd}
                  filename="brand-identity.md"
                />
                <ExportFile
                  label="systems/my-business-1/F-foundations/brand-voice.md"
                  sublabel="How your content should sound — place in systems/my-business-1/F-foundations/"
                  content={brandVoiceMd}
                  filename="brand-voice.md"
                />
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                After pasting these files, ask Claude: <em>"Help me write a LinkedIn post"</em> — and watch it work in your voice.
              </p>
            </>
          )}
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
          >
            ← Back
          </Button>
          <span className="text-xs text-muted-foreground">Step {step} of {STEPS.length}</span>
          {step < STEPS.length ? (
            <Button size="sm" onClick={() => setStep((s) => s + 1)}>
              Next →
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
