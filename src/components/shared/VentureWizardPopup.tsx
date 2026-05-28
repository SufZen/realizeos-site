import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { WEBHOOK_URL, LINKS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';
import { Sparkles, Mail, ExternalLink } from 'lucide-react';

interface VentureWizardPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VentureWizardPopup({ open, onOpenChange }: VentureWizardPopupProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'venture-wizard-popup',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setState('success');
        trackEvent('email_capture', { source: 'venture-wizard-popup' });
      } else throw new Error('Failed');
    } catch {
      setState('error');
    }
  }

  function handleClose() {
    onOpenChange(false);
    // Reset after animation completes
    setTimeout(() => {
      setState('idle');
      setEmail('');
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-brand-yellow/20 bg-background/95 backdrop-blur-xl">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-brand-yellow/10 blur-3xl" />

        <DialogHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-yellow/10 border border-brand-yellow/20">
            <Sparkles size={28} className="text-brand-yellow" />
          </div>
          <DialogTitle className="text-xl font-bold">
            {t('wizardPopup.title', 'Build Your Venture Profile')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {t('wizardPopup.description', 'Generate your FABRIC identity files for free using Google Gem or ChatGPT. Enter your email to unlock the wizards.')}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {state === 'success' ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow/15">
                <Sparkles size={24} className="text-brand-yellow animate-pulse" />
              </div>
              <p className="text-sm font-medium text-brand-yellow">
                {t('wizardPopup.thanks', '✓ You\'re in! Choose your wizard below.')}
              </p>
              <div className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full gap-2">
                  <a href={LINKS.gem} target="_blank" rel="noopener noreferrer">
                    <Sparkles size={16} />
                    {t('wizardPopup.openGem', 'Open Google Gem Wizard')}
                    <ExternalLink size={14} className="ml-auto opacity-50" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full gap-2">
                  <a href={LINKS.gpt} target="_blank" rel="noopener noreferrer">
                    <Sparkles size={16} />
                    {t('wizardPopup.openGpt', 'Open ChatGPT Wizard')}
                    <ExternalLink size={14} className="ml-auto opacity-50" />
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {t('wizardPopup.note', 'Runs on your own AI subscription — zero cost.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder={t('wizardPopup.emailPlaceholder', 'your@email.com')}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={state === 'loading'}
                className="w-full h-12 text-base font-semibold gap-2"
              >
                <Sparkles size={16} />
                {state === 'loading'
                  ? t('wizardPopup.sending', 'Unlocking...')
                  : t('wizardPopup.unlock', '🔮 Unlock Free Wizard')}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {t('wizardPopup.privacy', 'We\'ll send you the wizard links. No spam.')}
              </p>
            </form>
          )}

          {state === 'error' && (
            <p className="mt-2 text-center text-sm text-destructive">
              {t('wizardPopup.error', 'Something went wrong. Please try again.')}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
