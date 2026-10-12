import type { GuideSectionData } from '../guideTypes';

// Source of truth: RealizeOS 5.13.0 — templates/real-estate-developer/, templates/demos/,
// docs/webinar-demo.md, realize_core/demo_seed.py, scripts/rehearse_webinar_demo.py.
export const fieldPacks: GuideSectionData = {
  id: 'field-packs',
  title: 'Field Packs',
  icon: 'Building2',
  description: 'The real-estate developer pack: tender register, payment check and investor report — install, inputs, and what waits for approval.',
  readTime: '12 min',
  content: [
    { type: 'heading', text: 'What a field pack is', level: 2, id: 'what' },
    { type: 'paragraph', text: 'A field pack is a ready-made venture template for one kind of firm: agents with clear roles, knowledge files about how the work is done, and skills that run whole tasks end to end. Packs use your own documents and sheets, cite their sources, and hold anything they write until a person approves it.' },
    { type: 'callout', text: 'One pack ships today: real-estate-developer. Other templates in the repo (real-estate, architecture-firm, property-management) are general starting points without these skills. Packs for other teams are built with each client during implementation.', calloutType: 'info' },

    { type: 'heading', text: 'The real-estate developer pack', level: 2, id: 'real-estate-developer' },
    { type: 'paragraph', text: 'A team that follows a project from tender to contractors, site and payments, and investors:' },
    { type: 'list', text: '', items: [
      'Agents: orchestrator, tenders, procurement, site-payments, finance-investors, reviewer.',
      'Knowledge: development lifecycle, tender requirements, quote levelling, payment milestones, investor reporting, and Portugal notes (tax overview, useful entities).',
      'Foundations: company rules, venture identity and voice — fill these in with your own.',
    ]},
    { type: 'heading', text: 'The three skills', level: 3, id: 'skills' },
    { type: 'table', text: '', headers: ['Skill', 'Ask for it with', 'Reads', 'Produces', 'Held for approval'], rows: [
      ['tender_requirements_register', '"tender register", "requirements register", "רשימת דרישות", "תיק מכרז"', 'The tender document (Google Drive)', 'One row per requirement: section, requirement, mandatory, owner, due date, source', 'Appending the rows to the Requirements tab'],
      ['payment_milestone_check', '"payment request", "check the payment", "דרישת תשלום", "חשבון חלקי"', 'The Milestones tab', 'A verdict — MATCHES, PARTIAL or DOES NOT MATCH — with what evidence is missing', 'Appending the row to the Payments tab. The system never pays and never contacts the contractor.'],
      ['investor_report', '"investor report", "quarterly report", "דוח למשקיעים", "דוח רבעוני"', 'The Summary tab (budget)', 'A draft report checked by the reviewer agent, every figure with its source', 'Nothing: it writes nothing to Google. The draft is for the developer, not sent to investors.'],
    ]},

    { type: 'heading', text: 'Install', level: 2, id: 'install' },
    { type: 'heading', text: 'Start a new RealizeOS with the pack', level: 3, id: 'install-new' },
    { type: 'code', text: '', code: 'realize-os init --template real-estate-developer', language: 'bash' },
    { type: 'paragraph', text: 'This applies the whole template: agents, knowledge, skills, routing and the features the pack needs.' },
    { type: 'heading', text: 'Try the Hebrew demo project', level: 3, id: 'install-demo' },
    { type: 'paragraph', text: 'To see the pack working on demo data ("Tower B", in Hebrew, right-to-left), seed the demo venture and index it:' },
    { type: 'code', text: '', code: 'python scripts/seed_webinar_demo.py      # creates systems/tower-b-demo (locale: he)\npython cli.py index                      # index the demo documents', language: 'bash' },
    { type: 'callout', text: 'realize-os venture create --key <key> --template real-estate-developer copies the pack\'s files into a new venture but keeps the default routing, which expects agents this pack doesn\'t have. Use init or the demo seed above until that is fixed.', calloutType: 'warning' },

    { type: 'heading', text: 'Connect your sheet and documents', level: 2, id: 'connect' },
    { type: 'list', text: '', ordered: true, items: [
      'Google sign-in: create a Google Cloud OAuth client of type "Desktop app" with the Drive and Sheets APIs enabled, save it as .credentials/client_secrets.json, then run python scripts/google_signin.py. It saves .credentials/tokens.json. Use a separate Google account with demo data while you try things out.',
      'Create one Google Sheet. Import each file from templates/demos/tower-b-he-google/ as its own tab (File → Import → Upload → Insert new sheet) and name the tabs exactly: Requirements, Milestones, Payments, Summary.',
      'Upload templates/demos/tower-b-he-google/tender-document.txt to Drive and open it as a Google Doc. It contains one deliberate contradiction (a 10% performance guarantee in one clause, 5% in another) for the register to flag.',
      'Point the skills at your sheet and document: python scripts/rehearse_webinar_demo.py set-ids --sheet <sheet id> --tender-doc <doc id>',
    ]},
    { type: 'table', text: '', headers: ['Tab', 'Import from', 'Used by', 'Content'], rows: [
      ['Requirements', 'Requirements.csv', 'tender_requirements_register', 'Header only; the register is appended here'],
      ['Milestones', 'Milestones.csv', 'payment_milestone_check', 'The 8 milestones of the main contract'],
      ['Payments', 'Payments.csv', 'payment_milestone_check', 'Header only; checked requests are appended here'],
      ['Summary', 'Summary.csv', 'investor_report', 'The budget at the end of Q3'],
    ]},

    { type: 'heading', text: 'Turn on the features', level: 2, id: 'features' },
    { type: 'code', text: '', code: 'features:\n  agent_tools: true     # agents read Drive and Sheets while answering\n  enforce_gates: true   # sheet writes wait for an approval; approving runs them\n  cite_sources: true    # answers cite the documents as [S1]', language: 'yaml', title: 'realize-os.yaml' },
    { type: 'paragraph', text: 'For a locked, single-project view, give the person role: operator and ventures: [tower-b-demo] in users.yaml (see Users, Roles & Ventures).' },

    { type: 'heading', text: 'Run it', level: 2, id: 'run' },
    { type: 'table', text: '', headers: ['Case', 'Ask (Hebrew demo)', 'What happens'], rows: [
      ['Tender', 'תבנה רשימת דרישות מתיק המכרז', 'Requirements extracted with their source; the register write waits in Approvals; approve and the rows appear in the sheet'],
      ['Payment', 'קיבלנו דרישת תשלום 4: 360,000 € על סיום השלד', 'A verdict against milestone 4; the payment row waits for approval'],
      ['Investors', 'תכין דוח רבעוני למשקיעים', 'A reviewed draft where every figure names its source'],
      ['Live question', 'כמה נשאר לנו נטו בתקציב?', 'An answer with [S1] footnotes and the "What I used" trail'],
    ]},
    { type: 'heading', text: 'Check before a demo', level: 3, id: 'preflight' },
    { type: 'code', text: '', code: 'python scripts/rehearse_webinar_demo.py check', language: 'bash' },
    { type: 'paragraph', text: 'A read-only check that never writes to Google. It verifies the feature flags, an LLM key, the Google sign-in, every tab and the tender document, that each message triggers the right skill, and that a presenter account is limited to the demo venture. Each failing line says how to fix it.' },
    { type: 'callout', text: 'The demo data is fictional — say so on screen. The pack prepares the work and shows its sources; it doesn\'t replace your engineer, lawyer, appraiser or accountant.', calloutType: 'tip' },
    { type: 'paragraph', text: 'Full details: docs/webinar-demo.md in the RealizeOS repository.' },
  ],
};
