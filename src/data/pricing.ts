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

export const pricingTiers: PricingTier[] = [
  {
    name: 'RealizeOS Lite',
    description: 'For operators seeking pure knowledge management structure.',
    emotionalPromise: 'Stop starting from scratch. Establish a pristine, interconnected operations vault instantly.',
    price: 79,
    period: 'one-time',
    features: [
      { text: 'Pre-structured Obsidian vault (FABRIC)' },
      { text: '4 agent templates (Orchestrator, Writer, Reviewer, Analyst)' },
      { text: 'Brand identity & voice wizards' },
      { text: 'Skill workflows (YAML-defined pipelines)' },
      { text: 'CLAUDE.md for Claude Code integration' },
      { text: 'Step-by-step setup guide' },
      { text: 'Works with Claude Pro ($20/mo)' },
    ],
    ctaText: 'Get Lite Edition',
    ctaUrl: 'https://buy.stripe.com/9B64gAcPFcgscma6G56Ri0c',
    trackId: 'pricing-lite',
    delivery: 'Instant delivery via Google Drive',
    guarantee: '14-day money-back guarantee',
  },
  {
    name: 'RealizeOS Full',
    description: 'The production-grade infrastructure powering the Realization group.',
    emotionalPromise: 'Step securely out of the bottleneck constraint into the visionary seat. Complete automated control.',
    price: 249,
    period: 'one-time',
    featured: true,
    badge: 'Most Popular',
    features: [
      { text: 'Everything in Lite, plus:', bold: true },
      { text: 'Multi-LLM routing (Gemini + Claude Sonnet + Opus)' },
      { text: '7-layer dynamic prompt assembly' },
      { text: 'Hybrid KB search (FTS5 + vector)' },
      { text: 'Multi-step skill executor engine' },
      { text: 'Google Workspace integration (13 tools)' },
      { text: 'Web search, browser automation, MCP' },
      { text: 'REST API + Telegram channels' },
      { text: 'Self-evolution engine' },
      { text: 'Docker one-command deploy' },
      { text: 'CLI tooling + 5 system templates' },
    ],
    ctaText: 'Get Full Edition',
    ctaUrl: 'https://buy.stripe.com/dRm14odTJbcocma3tT6Ri0d',
    trackId: 'pricing-full',
    delivery: 'Instant delivery via Google Drive',
    guarantee: '14-day money-back guarantee',
  },
  {
    name: 'Setup Assistance',
    description: 'Direct collaboration with the architect of RealizeOS.',
    emotionalPromise: 'Fast-track your freedom. We configure the system directly around your unique venture.',
    price: 499,
    period: 'one-time',
    features: [
      { text: 'Everything in Full, plus:', bold: true },
      { text: '1-hour setup call with the builder' },
      { text: 'Custom KB scaffolding for your business' },
      { text: 'Agent definitions tailored to your needs' },
      { text: 'Brand voice configuration' },
      { text: 'First skill workflow set up together' },
      { text: 'Priority email support for 30 days' },
    ],
    ctaText: 'Get Setup Assistance',
    ctaUrl: 'https://buy.stripe.com/4gM14o5nddkwgCqd4t6Ri0e',
    trackId: 'pricing-setup',
    delivery: 'Instant delivery + 1-hour setup call',
    guarantee: '14-day money-back guarantee',
  },
];

export const pricingCompareNote = 'Individual AI agents elsewhere cost $49-99 each. AI operation communities charge $97/month. RealizeOS gives you the complete coordinated system — once, forever.';
