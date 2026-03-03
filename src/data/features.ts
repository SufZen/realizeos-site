export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: 'Zap',
    title: 'Multi-LLM Routing',
    description: 'Each request routed to the optimal model. Quick questions go to Gemini Flash. Content to Claude Sonnet. Complex strategy to Claude Opus. Automatic.',
  },
  {
    icon: 'LayoutGrid',
    title: '7-Layer Prompt Assembly',
    description: 'Every response built from your identity, brand voice, agent role, relevant knowledge, memory, and session context. Not a generic chatbot — your chatbot.',
  },
  {
    icon: 'Shuffle',
    title: 'Multi-Step Skills',
    description: 'YAML-defined workflows that chain agents and tools: search the web, analyze results, draft content, get review — all triggered by one message.',
  },
  {
    icon: 'SearchPlus',
    title: 'Hybrid KB Search',
    description: 'FTS5 keyword search combined with vector embeddings. Your agents find the right knowledge every time — not just keywords, but meaning.',
  },
  {
    icon: 'PenTool',
    title: 'Creative Pipelines',
    description: 'Multi-agent sessions with stages: briefing, drafting, iterating, reviewing, approved. Your content goes through a real production flow.',
  },
  {
    icon: 'RefreshCw',
    title: 'Self-Evolution',
    description: "The system tracks what works and what doesn't. Detects gaps, suggests new skills, refines agent prompts — getting better every interaction.",
  },
];
