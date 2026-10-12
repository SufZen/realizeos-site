import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.12.0 — realize_core/config.py (systems[].locale),
// dashboard/src/lib/locale.ts, dashboard/src/components/locale-toggle.tsx, docs/configuration.md.
export const hebrewRtl: GuideSectionData = {
  id: 'hebrew-and-rtl',
  title: 'Hebrew & Right-to-Left',
  icon: 'Languages',
  description: 'Set a venture\'s language so the dashboard turns right-to-left, and let each person override it.',
  readTime: '4 min',
  content: [
    { type: 'heading', text: 'Set the venture\'s language', level: 2, id: 'venture-locale' },
    { type: 'paragraph', text: 'Each venture can declare the language its content is in. A right-to-left language turns the dashboard RTL while that venture is selected.' },
    { type: 'code', text: '', code: 'systems:\n  - key: tower-b\n    name: Tower B\n    locale: he', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'list', text: '', items: [
      'Right-to-left languages: Hebrew (he), Arabic (ar), Persian (fa), Urdu (ur) and Yiddish (yi). Regional tags work too: he-IL counts as he.',
      'Any other locale, or none, keeps the dashboard left-to-right.',
      'The demo venture created by scripts/seed_webinar_demo.py is set to locale: he.',
    ]},

    { type: 'heading', text: 'Per-person override', level: 2, id: 'override' },
    { type: 'paragraph', text: 'The language button in the dashboard sidebar cycles through three settings: Language: venture (follow the selected venture), Language: עברית (always RTL), and Language: English (always LTR). The choice is saved in that browser only.' },

    { type: 'heading', text: 'What changes, and what doesn\'t', level: 2, id: 'scope' },
    { type: 'list', text: '', items: [
      'The layout direction changes: text, menus and panels flow right-to-left.',
      'Dashboard labels stay in English for now.',
      'The locale setting does not change which language the agents answer in. Agents follow your instructions and documents: ask in Hebrew and they answer in Hebrew. The real-estate developer pack also understands Hebrew requests such as "דרישת תשלום".',
    ]},
    { type: 'callout', text: 'Working across Israel and Portugal? Keep one venture per project and set each venture\'s locale to the language its documents are in. People can still switch the direction for themselves.', calloutType: 'tip' },
  ],
};
