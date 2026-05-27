// n8n webhook for lead capture
export const WEBHOOK_URL = 'https://n8n.realization.co.il/webhook/lead-capture';

// n8n webhook endpoints for Venture Intelligence Engine
export const WIZARD_API = {
  extractUrl: 'https://n8n.realization.co.il/webhook/extract-url',
  analyze: 'https://n8n.realization.co.il/webhook/venture-analyze',
  conversation: 'https://n8n.realization.co.il/webhook/venture-conversation',
} as const;

// External links
export const LINKS = {
  telegram: 'https://t.me/+5r8zjoOignRmOTI0',
  whatsapp: 'https://chat.whatsapp.com/CDD01Xqt56lAbJZTEtfxqd',
  supportEmail: 'info@realizeos.ai',
  linkedin: 'https://www.linkedin.com/in/sufzen',
  github: 'https://github.com/SufZen',
  githubRepo: 'https://github.com/SufZen/RealizeOS-5',
  realization: 'https://realization.co.il',
  tidycal: 'https://tidycal.com/sufz/realizeos-setup',
  gemGpt: 'https://github.com/SufZen/RealizeOS-5#venture-wizard', // Gem/GPT self-serve link
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'Quickstart', href: '#quickstart' },
  { label: 'FABRIC', href: '#fabric' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
  { label: 'FAQ', href: '#faq' },
] as const;
