import { useTranslation } from 'react-i18next';
import { LINKS } from '@/lib/constants';

export interface PricingFeature {
  text: string;
  bold?: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  emotionalPromise: string;
  /** '0' renders as "Free"; any other value is shown as written (currency included). */
  price: string;
  period: string;
  features: PricingFeature[];
  ctaText: string;
  ctaUrl: string;
  trackId: string;
  delivery: string;
  featured?: boolean;
  badge?: string;
}

type TierKey = 'free' | 'audit' | 'implement' | 'operate';

const TIERS: { key: TierKey; ctaUrl: string; featured?: boolean }[] = [
  { key: 'free', ctaUrl: LINKS.githubRepo },
  { key: 'audit', ctaUrl: LINKS.auditSprint, featured: true },
  { key: 'implement', ctaUrl: LINKS.auditSprint },
  { key: 'operate', ctaUrl: LINKS.auditSprint },
];

export const usePricing = (): { tiers: PricingTier[], compareNote: string } => {
  const { t } = useTranslation();

  const pricingTiers: PricingTier[] = TIERS.map(({ key, ctaUrl, featured }) => {
    const base = `pricing.tiers.${key}`;
    return {
      name: t(`${base}.name`),
      description: t(`${base}.description`),
      emotionalPromise: t(`${base}.emotionalPromise`),
      price: t(`${base}.price`),
      period: t(`${base}.period`),
      featured,
      badge: featured ? t(`${base}.badge`) : undefined,
      features: (t(`${base}.features`, { returnObjects: true }) as string[]).map(text => ({ text })),
      ctaText: t(`${base}.ctaText`),
      ctaUrl,
      trackId: `pricing-${key}`,
      delivery: t(`${base}.delivery`),
    };
  });

  return {
    tiers: pricingTiers,
    compareNote: t('pricing.compareNote'),
  };
};
