// Stripe checkout URLs
export const STRIPE_URLS = {
  lite: 'https://buy.stripe.com/9B64gAcPFcgscma6G56Ri0c',
  full: 'https://buy.stripe.com/dRm14odTJbcocma3tT6Ri0d',
  setup: 'https://buy.stripe.com/4gM14o5nddkwgCqd4t6Ri0e',
} as const;

// Per-tier booking / webinar links
export const BOOKING_LINKS = {
  setup: {
    calendar: '#', // Replace with real Cal.com/Calendly embed URL
  },
  lite: {
    en: 'https://meet.google.com/vcr-zgsw-xix', // Replace with real EN webinar link
    he: 'https://meet.google.com/vcr-zgsw-xix', // Replace with real HE webinar link
  },
  full: {
    en: 'https://meet.google.com/vcr-zgsw-xix', // Replace with real EN webinar link
    he: 'https://meet.google.com/vcr-zgsw-xix', // Replace with real HE webinar link
  },
} as const;

// n8n webhook for lead capture
export const WEBHOOK_URL = 'https://n8n.realization.co.il/webhook/lead-capture';

// External links
export const LINKS = {
  telegram: 'https://t.me/+5r8zjoOignRmOTI0',
  whatsapp: 'https://chat.whatsapp.com/CDD01Xqt56lAbJZTEtfxqd',
  brandWorksheet: 'brand-worksheet.html',
  supportEmail: 'info@realizeos.ai',
  linkedin: 'https://www.linkedin.com/in/sufzen',
  github: 'https://github.com/SufZen',
  realization: 'https://realization.co.il',
  githubRepo: 'https://api.github.com/repos/SufZen/realize-os',
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'FABRIC', href: '#fabric' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] as const;
