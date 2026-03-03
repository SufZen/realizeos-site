export interface UseCase {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  tasks: string[];
}

export const useCases: UseCase[] = [
  {
    icon: 'BookOpen',
    title: 'Consulting & Advisory',
    description: 'Scale your research, draft proposals, and create client deliverables with agents that know your methodology.',
    tasks: [
      'Draft a client proposal from meeting notes',
      'Research competitors for a new engagement',
      'Write weekly LinkedIn thought leadership posts',
      'Prepare a quarterly business review report',
      'Summarize market intelligence into a briefing',
    ],
  },
  {
    icon: 'PenTool',
    title: 'Creative Agencies',
    description: 'Automate content pipelines with writer-reviewer workflows. Every piece goes through a brand-consistent quality gate.',
    tasks: [
      'Run a content brief through Writer → Reviewer pipeline',
      'Generate 5 social post variations from one idea',
      'Rewrite existing copy in a client\'s brand voice',
      'Build a monthly content calendar from talking points',
      'Review and score client deliverables before sending',
    ],
  },
  {
    icon: 'Briefcase',
    title: 'Multi-Venture Operators',
    description: 'Run 3+ ventures from one engine. Isolated systems, shared identity, cross-venture intelligence when you need it.',
    tasks: [
      'Switch between ventures without losing context',
      'Track priorities across all businesses in one state map',
      'Generate investor updates for each venture separately',
      'Research a new market opportunity across all verticals',
      'Consolidate weekly status into a portfolio review',
    ],
  },
  {
    icon: 'Flag',
    title: 'SaaS & Product Teams',
    description: 'From user research to release notes. Manage product, marketing, and support knowledge in one coordinated system.',
    tasks: [
      'Turn user interviews into structured insights',
      'Draft release notes and changelog entries',
      'Write onboarding emails and help center articles',
      'Analyze churn feedback for product patterns',
      'Create a GTM brief for a new feature launch',
    ],
  },
  {
    icon: 'ShoppingCart',
    title: 'E-Commerce',
    description: 'Generate product descriptions, analyze sales data, and automate customer communications — all in your brand voice.',
    tasks: [
      'Write 20 product descriptions in your brand voice',
      'Draft abandoned cart and post-purchase email flows',
      'Analyze sales data and surface key trends',
      'Generate seasonal campaign copy across channels',
      'Respond to customer reviews with brand-consistent replies',
    ],
  },
];
