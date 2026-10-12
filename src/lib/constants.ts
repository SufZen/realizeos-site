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
  realization: 'https://realization.world',
  auditSprint: 'https://tidycal.com/team/realizeos/realizeos-auditsprint',
  webinar: 'https://realization.world/webinar?ref=realizeos-site',
  youtube: 'https://www.youtube.com/@SufZen',
  gem: 'https://gemini.google.com/gem/1mEuuDUxPVlwV_I-ctKqKMI0hZL3GLO0-?usp=sharing', // Google Gem Venture Wizard
  gpt: 'https://chatgpt.com/g/g-6a17e2ad77988191a471b1bbdef534e1-realizeos-venture-intelligence-builder', // Custom GPT Venture Wizard
} as const;

// Live webinar: 20 Oct 2026, 20:00–21:30 Israel time (IDT, UTC+3).
// Until it ends, CTAs point to registration; afterwards, to the recording on YouTube.
export const WEBINAR_ENDS_AT = new Date('2026-10-20T21:30:00+03:00');

export function isWebinarUpcoming(now: Date = new Date()): boolean {
  return now < WEBINAR_ENDS_AT;
}

export function webinarLink(now: Date = new Date()): string {
  return isWebinarUpcoming(now) ? LINKS.webinar : LINKS.youtube;
}

// Navigation items
export const NAV_ITEMS = [
  { label: 'Guide', href: '/guide' },
  { label: 'Quickstart', href: '#quickstart' },
  { label: 'FABRIC', href: '#fabric' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
  { label: 'FAQ', href: '#faq' },
] as const;
