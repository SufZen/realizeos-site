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
        title: 'Fill-in-the-blank venture templates + Venture Wizard',
        description: 'venture-identity.md, venture-voice.md, and the interactive 130-line Venture Wizard. Define your venture in minutes.',
      },
      {
        title: '6 skill workflows',
        description: 'Proposals, campaigns, social media, reviews, content pipeline, and research (YAML files). Ready to use or customize.',
      },
      {
        title: '3 shared methods',
        description: 'Competitive analysis, content repurposing, and decision framework. Reusable across all your workflows.',
      },
      {
        title: 'Enhanced CLAUDE.md protocol (155 lines)',
        description: 'Drop into Claude Code and it instantly understands your entire business context with full operational rules.',
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
        title: 'Complete Python engine (11,000+ lines)',
        description: 'Multi-LLM routing, multi-layer prompt assembly, workflow engine, self-evolution, security, media processing. Production-ready code.',
      },
      {
        title: 'Docker one-command deploy',
        description: 'docker compose up and you have a running AI operations server.',
      },
      {
        title: '5 channels (REST, Telegram, WhatsApp, Web/WebSocket, Webhooks) + Scheduler',
        description: 'Reach your AI from anywhere. Channel-agnostic message routing with attachment handling.',
      },
      {
        title: '13 Google Workspace tools',
        description: 'Gmail, Calendar, Drive integration built in. OAuth setup included.',
      },
      {
        title: 'Security: RBAC, encrypted vault, audit logging',
        description: '16 permissions across 5 roles, AES-256 encrypted credentials, structured audit events, prompt injection detection.',
      },
      {
        title: 'Tool SDK & extensibility framework',
        description: '7 tool categories with MCP support. Build custom integrations with the plugin architecture.',
      },
      {
        title: 'Media processing',
        description: 'Image analysis (vision), audio transcription, and content generation. Built-in media pipeline.',
      },
      {
        title: '8 industry templates',
        description: 'Consulting, Agency, Multi-Venture, SaaS, E-Commerce, Freelance, Coaching, Accounting. Pick one and customize.',
      },
      {
        title: 'CLI scaffolding + dev process templates',
        description: 'init, serve, bot, status, index commands plus CI/CD pipeline (GitHub Actions + pytest).',
      },
    ],
  },
];

export const deliveryNote = 'Both editions include: Instant Google Drive access, setup guide, community access (Telegram + WhatsApp), and onboarding emails for your first week.';
