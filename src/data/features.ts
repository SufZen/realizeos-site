import { useTranslation } from 'react-i18next';

export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  promise: string;
  technical?: string;
  roadmap?: boolean;
}

export const useFeatures = (): Feature[] => {
  const { t } = useTranslation();

  return [
    {
      icon: 'Database',
      title: t('features.fabric.title', 'FABRIC Entity System'),
      promise: t('features.fabric.promise', 'Your knowledge graph is the Heart of the system — entities, relationships, and context you own forever.'),
      technical: t('features.fabric.technical', 'The FABRIC entity system stores all venture knowledge as structured entities with typed relationships. Full REST API for CRUD operations. SQLite-backed with FTS5 full-text search.'),
    },
    {
      icon: 'Brain',
      title: t('features.synapse.title', 'Synapse Knowledge Index'),
      promise: t('features.synapse.promise', 'Hybrid search across your entire knowledge base — keyword + semantic. Millisecond retrieval.'),
      technical: t('features.synapse.technical', 'FTS5 keyword search combined with vector embeddings. Your AI agents find the exact right document or memory every time — understanding intent, not just keywords.'),
    },
    {
      icon: 'Zap',
      title: t('features.routing.title', 'Multi-LLM Routing'),
      promise: t('features.routing.promise', 'Route requests to the right AI model automatically. Cost, quality, speed — you set the strategy.'),
      technical: t('features.routing.technical', 'Runtime Adapter Layer with provider-agnostic routing. Registry pattern supports any LLM backend. Per-call cost tracking and intelligent model selection.'),
    },
    {
      icon: 'Target',
      title: t('features.missions.title', 'Mission Engine'),
      promise: t('features.missions.promise', 'Define objectives, track progress, coordinate agents. Multi-step workflows with human review gates.'),
      technical: t('features.missions.technical', 'Full mission lifecycle: define → plan → execute → review → complete. Dashboard page at /missions with real-time status tracking.'),
    },
    {
      icon: 'Moon',
      title: t('features.dreaming.title', 'Dreaming & Trust Policy'),
      promise: t('features.dreaming.promise', 'Background reflection and continuous improvement. The system gets smarter while you sleep.'),
      technical: t('features.dreaming.technical', 'Dreaming subsystem processes daily interactions and suggests improvements. Trust Policy scores each proposal. Dashboard at /dreams.'),
    },
    {
      icon: 'ScrollText',
      title: t('features.eventlog.title', 'Event Log & SOUL Identity'),
      promise: t('features.eventlog.promise', 'Full audit trail of every action. Your venture identity encoded and versioned.'),
      technical: t('features.eventlog.technical', 'Structured event logging with typed events. SOUL identity layer stores venture voice, methodology, and rules as versionable artifacts.'),
    },
    {
      icon: 'Shield',
      title: t('features.security.title', 'Enterprise Security'),
      promise: t('features.security.promise', 'Local-first by design. Your data never leaves your infrastructure.'),
      technical: t('features.security.technical', 'Role-based access control. AES-256 encrypted credential vault. Prompt injection detection. Full audit logging.'),
    },
    {
      icon: 'Terminal',
      title: t('features.cli.title', 'FABRIC Operator CLI'),
      promise: t('features.cli.promise', 'Manage your system from the command line. Init, serve, index, status — everything at your fingertips.'),
      technical: t('features.cli.technical', 'Python CLI with init, serve, bot, status, and index commands. Docker compose integration. GitHub Actions CI/CD templates.'),
    },
    // Roadmap items
    {
      icon: 'Mic',
      title: t('features.voice.title', 'Voice Channel'),
      promise: t('features.voice.promise', 'Talk to your AI team naturally. Coming to a future release.'),
      roadmap: true,
    },
    {
      icon: 'Smartphone',
      title: t('features.mobile.title', 'Mobile Companion'),
      promise: t('features.mobile.promise', 'React Native app for on-the-go access. Coming soon.'),
      roadmap: true,
    },
  ];
};
