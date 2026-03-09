import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STRIPE_URLS, WEBHOOK_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';

export function FinalCTA() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setFormState('loading');

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Anonymous',
          email,
          challenge,
          source: 'email-form',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setFormState('success');
        trackEvent('email_capture', { source: 'email-form' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <Section id="final-cta">
      <AnimateOnScroll>
        <div className="text-center">
          <h2 className="text-gradient-yellow text-3xl font-bold md:text-4xl">
            {t('finalCta.title1')}
            <br />
            {t('finalCta.title2')}
          </h2>
          <p className="mt-4 text-muted-foreground">
            {t('finalCta.subtitle')}
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              onClick={() => trackEvent('cta_click', { cta_name: 'final-cta' })}
            >
              <a href={STRIPE_URLS.full}>{t('finalCta.getRealizeOS')}</a>
            </Button>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.2}>
        <div className="mx-auto mt-16 max-w-lg">
          <div className="glass-card rounded-xl p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">{t('finalCta.notReadyTitle')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('finalCta.notReadyDesc')}
            </p>

            {formState === 'success' ? (
              <p className="py-2 font-medium text-brand-yellow">
                {t('finalCta.thanks')}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder={t('finalCta.namePlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder={t('finalCta.emailPlaceholder')}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Input
                  placeholder={t('finalCta.challengePlaceholder')}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={formState === 'loading'}>
                  {formState === 'loading' ? t('finalCta.sending') : t('finalCta.submit')}
                </Button>
              </form>
            )}

            {formState === 'error' && (
              <p className="mt-2 text-sm text-destructive">
                {t('finalCta.error')}
              </p>
            )}
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
