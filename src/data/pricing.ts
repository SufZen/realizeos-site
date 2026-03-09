import { useTranslation } from 'react-i18next';

export interface PricingFeature {
  text: string;
  bold?: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  emotionalPromise: string;
  price: number;
  period: string;
  features: PricingFeature[];
  ctaText: string;
  ctaUrl: string;
  trackId: string;
  delivery: string;
  guarantee: string;
  featured?: boolean;
  badge?: string;
}

export const usePricing = (): { tiers: PricingTier[], compareNote: string } => {
  const { t } = useTranslation();

  const pricingTiers: PricingTier[] = [
    {
      name: t('pricing.tiers.lite.name'),
      description: t('pricing.tiers.lite.description'),
      emotionalPromise: t('pricing.tiers.lite.emotionalPromise'),
      price: 79,
      period: 'one-time',
      features: (t('pricing.tiers.lite.features', { returnObjects: true }) as string[]).map(feature => ({ text: feature })),
      ctaText: t('pricing.tiers.lite.ctaText'),
      ctaUrl: 'https://buy.stripe.com/9B64gAcPFcgscma6G56Ri0c',
      trackId: 'pricing-lite',
      delivery: t('pricing.tiers.lite.delivery'),
      guarantee: t('pricing.tiers.lite.guarantee'),
    },
    {
      name: t('pricing.tiers.full.name'),
      description: t('pricing.tiers.full.description'),
      emotionalPromise: t('pricing.tiers.full.emotionalPromise'),
      price: 249,
      period: 'one-time',
      featured: true,
      badge: t('pricing.tiers.full.badge'),
      features: [
        { text: t('pricing.tiers.full.features.header'), bold: true },
        ...(t('pricing.tiers.full.features.list', { returnObjects: true }) as string[]).map(feature => ({ text: feature }))
      ],
      ctaText: t('pricing.tiers.full.ctaText'),
      ctaUrl: 'https://buy.stripe.com/dRm14odTJbcocma3tT6Ri0d',
      trackId: 'pricing-full',
      delivery: t('pricing.tiers.full.delivery'),
      guarantee: t('pricing.tiers.full.guarantee'),
    },
    {
      name: t('pricing.tiers.setup.name'),
      description: t('pricing.tiers.setup.description'),
      emotionalPromise: t('pricing.tiers.setup.emotionalPromise'),
      price: 499,
      period: 'one-time',
      features: [
        { text: t('pricing.tiers.setup.features.header'), bold: true },
        ...(t('pricing.tiers.setup.features.list', { returnObjects: true }) as string[]).map(feature => ({ text: feature }))
      ],
      ctaText: t('pricing.tiers.setup.ctaText'),
      ctaUrl: 'https://buy.stripe.com/4gM14o5nddkwgCqd4t6Ri0e',
      trackId: 'pricing-setup',
      delivery: t('pricing.tiers.setup.delivery'),
      guarantee: t('pricing.tiers.setup.guarantee'),
    },
  ];

  return {
    tiers: pricingTiers,
    compareNote: t('pricing.compareNote'),
  };
};
