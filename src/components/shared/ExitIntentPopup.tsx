import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExitIntent } from '@/hooks/useExitIntent';
import { WEBHOOK_URL, isWebinarUpcoming, webinarLink } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PlayCircle } from 'lucide-react';

export function ExitIntentPopup() {
  const { t } = useTranslation();
  const { visible, dismiss } = useExitIntent();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const upcoming = isWebinarUpcoming();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          source: 'exit-popup',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setStatus('success');
        trackEvent('email_capture', { source: 'exit-popup' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && dismiss()}>
      <DialogContent className="fx-glass border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('exitPopup.title')}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {upcoming ? t('exitPopup.webinarUpcoming') : t('exitPopup.webinarPast')}
          </DialogDescription>
        </DialogHeader>
        <Button asChild size="lg" className="w-full" onClick={() => trackEvent('cta_click', { cta_name: upcoming ? 'exit-popup-webinar' : 'exit-popup-recording' })}>
          <a href={webinarLink()} target="_blank" rel="noopener noreferrer" className="gap-2">
            <PlayCircle size={18} />
            {upcoming ? t('exitPopup.webinarCtaUpcoming') : t('exitPopup.webinarCtaPast')}
          </a>
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">{t('exitPopup.description')}</p>
        {status === 'success' ? (
          <p className="py-2 font-medium text-brand-yellow">{t('exitPopup.success')}</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-2">
            <Input
              type="text"
              placeholder={t('exitPopup.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder={t('exitPopup.emailPlaceholder')}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" variant="outline" disabled={status === 'loading'} className="w-full">
              {status === 'loading' ? t('exitPopup.sending') : t('exitPopup.cta')}
            </Button>
            {status === 'error' && (
              <p className="text-xs text-danger">{t('exitPopup.error')}</p>
            )}
          </form>
        )}
        <p className="text-xs text-muted-foreground">
          {t('exitPopup.disclaimer')}
        </p>
      </DialogContent>
    </Dialog>
  );
}
