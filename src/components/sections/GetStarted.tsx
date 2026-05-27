import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TierLite } from '@/components/illustrations/TierLite';
import { TierFull } from '@/components/illustrations/TierFull';
import { TierSetup } from '@/components/illustrations/TierSetup';
import { usePricing } from '@/data/pricing';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@/lib/analytics';
import { WEBHOOK_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Sparkles, Mail } from 'lucide-react';

const tierIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'pricing-free': TierLite,
  'pricing-guided': TierFull,
  'pricing-consulting': TierSetup,
};

export function GetStarted() {
  const { t } = useTranslation();
  const { tiers: pricingTiers, compareNote: pricingCompareNote } = usePricing();
  const [gemEmail, setGemEmail] = useState('');
  const [gemState, setGemState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleGemGate(e: React.FormEvent) {
    e.preventDefault();
    if (!gemEmail) return;
    setGemState('loading');
    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: gemEmail,
          source: 'gem-gpt-gate',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setGemState('success');
        trackEvent('email_capture', { source: 'gem-gpt-gate' });
      } else throw new Error('Failed');
    } catch {
      setGemState('error');
    }
  }

  return (
    <Section id="pricing">
      <SectionHeader
        title={t('pricing.header.title')}
        subtitle={t('pricing.header.subtitle')}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => (
          <AnimateOnScroll key={tier.name} delay={i * 0.1}>
            <div
              className={cn(
                'fx-glass-card relative flex h-full flex-col rounded-2xl p-6',
                tier.featured && 'fx-animated-border'
              )}
            >
              {tier.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-yellow text-primary-foreground">
                  {tier.badge}
                </Badge>
              )}
              {(() => {
                const TierIcon = tierIconMap[tier.trackId];
                return TierIcon ? <TierIcon className="mx-auto mb-3 h-12 w-12" /> : null;
              })()}
              <div className="mb-4 text-center">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-foreground">{tier.description}</p>
              </div>

              <div className="mb-6 flex-1 text-center">
                <p className="text-sm font-medium text-muted-foreground">{tier.emotionalPromise}</p>
              </div>

              <div className="mb-6 text-center">
                <span className="text-4xl font-bold">
                  {tier.price === '0' || tier.price === 0 ? 'Free' : tier.price === 'Custom' ? 'Custom' : `$${tier.price}`}
                </span>
                {tier.period && (
                  <span className="ms-1 text-sm text-muted-foreground">{tier.period}</span>
                )}
              </div>

              <Accordion type="single" collapsible className="mb-6 w-full text-start">
                <AccordionItem value="included-features" className="border-none">
                  <AccordionTrigger className="justify-start gap-2 py-0 text-sm font-semibold text-brand-yellow hover:no-underline">
                    {t('pricing.whatsIncluded', "What's Included")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="mt-4 space-y-2.5 text-sm">
                      {tier.features.map((f) => (
                        <li key={f.text} className="flex items-start gap-2">
                          <span className="mt-0.5 text-brand-yellow">&#10003;</span>
                          <span className={cn('text-muted-foreground', f.bold && 'font-semibold text-foreground')}>
                            {f.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button
                asChild
                variant={tier.featured ? 'default' : 'outline'}
                size="lg"
                className="w-full"
                onClick={() => trackEvent('cta_click', { cta_name: tier.trackId })}
              >
                <a href={tier.ctaUrl} target={tier.ctaUrl.startsWith('http') ? '_blank' : undefined} rel={tier.ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  {tier.ctaText}
                </a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">{tier.delivery}</p>
              {tier.guarantee && (
                <p className="mt-1 text-center text-xs text-muted-foreground">{tier.guarantee}</p>
              )}
            </div>
          </AnimateOnScroll>
        ))}
      </div>

      {/* Free Venture Wizard via Gem/GPT — email-gated */}
      <AnimateOnScroll delay={0.2}>
        <div className="mx-auto mt-12 max-w-lg">
          <div className="fx-glass-card rounded-xl p-6 text-center">
            <Sparkles size={24} className="mx-auto mb-3 text-brand-yellow" />
            <h3 className="mb-1 text-lg font-semibold">
              {t('pricing.gemGpt.title', 'Free Venture Wizard')}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('pricing.gemGpt.description', 'Generate your FABRIC files for free using Google Gem or Custom GPT. Runs on your own AI subscription — zero cost to us.')}
            </p>
            {gemState === 'success' ? (
              <div className="space-y-3">
                <p className="font-medium text-brand-yellow text-sm">
                  {t('pricing.gemGpt.thanks', '✓ Check your email! Links are on the way.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Button asChild variant="outline" size="sm">
                    <a href="https://github.com/SufZen/RealizeOS-5#venture-wizard" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                      <Sparkles size={14} />
                      {t('pricing.gemGpt.openGem', 'Open Google Gem')}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href="https://github.com/SufZen/RealizeOS-5#venture-wizard" target="_blank" rel="noopener noreferrer" className="gap-1.5">
                      <Sparkles size={14} />
                      {t('pricing.gemGpt.openGpt', 'Open Custom GPT')}
                    </a>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleGemGate} className="flex gap-2 max-w-sm mx-auto">
                <Input
                  type="email"
                  placeholder={t('pricing.gemGpt.emailPlaceholder', 'your@email.com')}
                  required
                  value={gemEmail}
                  onChange={(e) => setGemEmail(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={gemState === 'loading'} className="gap-1.5">
                  <Mail size={14} />
                  {gemState === 'loading'
                    ? t('pricing.gemGpt.sending', '...')
                    : t('pricing.gemGpt.unlock', 'Unlock')}
                </Button>
              </form>
            )}
            {gemState === 'error' && (
              <p className="mt-2 text-xs text-destructive">
                {t('pricing.gemGpt.error', 'Something went wrong. Try again.')}
              </p>
            )}
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.3}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          {pricingCompareNote}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
