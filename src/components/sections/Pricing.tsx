import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useCountdown } from '@/hooks/useCountdown';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

const tierIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'pricing-lite': TierLite,
  'pricing-full': TierFull,
  'pricing-setup': TierSetup,
};

const PROMO_END = new Date('2026-03-31T23:59:59');

function CountdownDisplay() {
  const { t } = useTranslation();
  const { days, hours, minutes, seconds, isExpired } = useCountdown(PROMO_END);

  if (isExpired) return null;

  const segments = [
    { value: days, label: 'D' },
    { value: hours, label: 'H' },
    { value: minutes, label: 'M' },
    { value: seconds, label: 'S' },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-muted-foreground">{t('pricing.header.countdownLabel')}</p>
      <div className="flex gap-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex flex-col items-center">
            <span className="glass-card rounded-lg px-3 py-1.5 font-mono text-xl font-bold text-brand-yellow">
              {String(seg.value).padStart(2, '0')}
            </span>
            <span className="mt-1 text-[10px] text-muted-foreground">{seg.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pricing() {
  const { t } = useTranslation();
  const { tiers: pricingTiers, compareNote: pricingCompareNote } = usePricing();
  const { isExpired } = useCountdown(PROMO_END);

  const showPromo = !isExpired;

  return (
    <Section id="pricing">
      <SectionHeader
        title={t('pricing.header.title')}
        subtitle={t('pricing.header.subtitle')}
      />

      {showPromo && (
        <AnimateOnScroll>
          <div className="mx-auto mb-10 flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-brand-yellow/20 bg-brand-yellow/5 p-6 text-center">
            <Badge className="bg-brand-yellow text-primary-foreground">
              {t('pricing.header.promoBadge')}
            </Badge>
            <CountdownDisplay />
            <p className="text-sm font-medium text-brand-yellow/80">
              {t('pricing.header.urgencyText')}
            </p>
          </div>
        </AnimateOnScroll>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => (
          <AnimateOnScroll key={tier.name} delay={i * 0.1}>
            <div
              className={cn(
                'glass-card relative flex h-full flex-col rounded-2xl p-6',
                tier.featured && 'animated-border'
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
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-foreground">{tier.description}</p>
              </div>

              <div className="mb-6 flex-1">
                <p className="text-sm font-medium text-muted-foreground">{tier.emotionalPromise}</p>
              </div>

              <div className="mb-6">
                {showPromo && tier.originalPrice && (
                  <span className="me-2 text-lg text-muted-foreground line-through">
                    ${tier.originalPrice}
                  </span>
                )}
                <span className="text-4xl font-bold">${tier.price}</span>
                <span className="ms-1 text-sm text-muted-foreground">{tier.period}</span>
              </div>

              <Accordion type="single" collapsible className="mb-6 w-full text-start">
                <AccordionItem value="included-features" className="border-none">
                  <AccordionTrigger className="justify-start gap-2 py-0 text-sm font-semibold text-brand-yellow hover:no-underline">
                    What's Included Technically
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
                <a href={tier.ctaUrl}>{tier.ctaText}</a>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">{tier.delivery}</p>
              <p className="mt-1 text-center text-xs text-muted-foreground">{tier.guarantee}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
      <AnimateOnScroll delay={0.3}>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          {pricingCompareNote}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
