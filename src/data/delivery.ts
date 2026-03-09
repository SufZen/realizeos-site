export interface DeliveryItem {
  title: string;
  description: string;
}

export interface DeliveryColumn {
  edition: string;
  featured?: boolean;
  includesNote?: string;
  emotionalPromise: string;
  items: DeliveryItem[];
}

export const deliveryColumns: DeliveryColumn[] = [
  {
    edition: 'Lite Edition',
    emotionalPromise: 'From scattered chaos to a single source of truth. Instant clarity and structure for your business operations.',
    items: [
      {
        title: 'Pre-structured Obsidian vault',
        description: '~30 files organized in the FABRIC structure. Open it, and you have a working knowledge base.',
      },
      {
        title: '4 AI agent definitions',
        description: 'Orchestrator, Writer, Reviewer, Analyst. Each is a markdown file you customize for your business.',
      },
      {
        title: 'Fill-in-the-blank brand templates',
        description: 'brand-identity.md and brand-voice.md with guided prompts. Takes 5 minutes to fill in.',
      },
      {
        title: '2 skill workflows',
        description: 'Content pipeline and research workflow (YAML files), ready to use or customize.',
      },
      {
        title: 'CLAUDE.md configuration',
        description: 'Drop into Claude Code and it instantly understands your entire business context.',
      },
      {
        title: 'Step-by-step setup guide',
        description: '15 minutes from download to your first AI-powered conversation.',
      },
    ],
  },
  {
    edition: 'Full Edition',
    featured: true,
    includesNote: 'Everything in Lite, plus:',
    emotionalPromise: 'From overwhelmed operator to focused visionary. Claim your fully automated, production-ready operational engine.',
    items: [
      {
        title: 'Complete Python engine (8,800+ lines)',
        description: 'Multi-LLM routing, 7-layer prompt assembly, skill execution, self-evolution. Production-ready code.',
      },
      {
        title: 'Docker one-command deploy',
        description: 'docker compose up and you have a running AI operations server.',
      },
      {
        title: '13 Google Workspace tools',
        description: 'Gmail, Calendar, Drive integration built in. OAuth setup included.',
      },
      {
        title: 'REST API + Telegram channel',
        description: 'Connect from any frontend, or use Telegram as your command center.',
      },
      {
        title: '5 industry templates',
        description: 'Consulting, Agency, Multi-Venture, SaaS, E-Commerce. Pick one and customize.',
      },
      {
        title: 'CLI tooling',
        description: 'init, serve, bot, status, index commands for day-to-day operations.',
      },
    ],
  },
];

export const deliveryNote = 'Both editions include: Instant Google Drive access, setup guide, community access (Telegram + WhatsApp), and onboarding emails for your first week.';
