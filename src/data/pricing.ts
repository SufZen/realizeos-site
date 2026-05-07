import { useTranslation } from 'react-i18next';

export interface PricingFeature {
  text: string;
  bold?: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  emotionalPromise: string;
  price: number | string;
  originalPrice?: string;
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
      name: t('pricing.tiers.free.name'),
      description: t('pricing.tiers.free.description'),
      emotionalPromise: t('pricing.tiers.free.emotionalPromise'),
      price: t('pricing.tiers.free.price'),
      period: t('pricing.tiers.free.period'),
      features: (t('pricing.tiers.free.features', { returnObjects: true }) as string[]).map(feature => ({ text: feature })),
      ctaText: t('pricing.tiers.free.ctaText'),
      ctaUrl: '/webinar/booking/lite?mode=open',
      trackId: 'pricing-free',
      delivery: t('pricing.tiers.free.delivery'),
      guarantee: t('pricing.tiers.free.guarantee'),
    },
    {
      name: t('pricing.tiers.guided.name'),
      description: t('pricing.tiers.guided.description'),
      emotionalPromise: t('pricing.tiers.guided.emotionalPromise'),
      price: t('pricing.tiers.guided.price'),
      period: t('pricing.tiers.guided.period'),
      featured: true,
      badge: t('pricing.tiers.guided.badge'),
      features: [
        { text: t('pricing.tiers.guided.features.header'), bold: true },
        ...(t('pricing.tiers.guided.features.list', { returnObjects: true }) as string[]).map(feature => ({ text: feature }))
      ],
      ctaText: t('pricing.tiers.guided.ctaText'),
      ctaUrl: 'https://tidycal.com/realization',
      trackId: 'pricing-guided',
      delivery: t('pricing.tiers.guided.delivery'),
      guarantee: t('pricing.tiers.guided.guarantee'),
    },
    {
      name: t('pricing.tiers.consulting.name'),
      description: t('pricing.tiers.consulting.description'),
      emotionalPromise: t('pricing.tiers.consulting.emotionalPromise'),
      price: t('pricing.tiers.consulting.price'),
      period: t('pricing.tiers.consulting.period'),
      features: [
        { text: t('pricing.tiers.consulting.features.header'), bold: true },
        ...(t('pricing.tiers.consulting.features.list', { returnObjects: true }) as string[]).map(feature => ({ text: feature }))
      ],
      ctaText: t('pricing.tiers.consulting.ctaText'),
      ctaUrl: 'mailto:info@realizeos.ai',
      trackId: 'pricing-consulting',
      delivery: t('pricing.tiers.consulting.delivery'),
      guarantee: t('pricing.tiers.consulting.guarantee'),
    },
  ];

  return {
    tiers: pricingTiers,
    compareNote: t('pricing.compareNote'),
  };
};
