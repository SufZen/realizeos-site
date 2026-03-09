export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  promise: string;
  technical?: string;
}

export const features: Feature[] = [
  {
    icon: 'Zap',
    title: 'Multi-LLM Routing',
    promise: 'Instant intelligence scaled securely across your operations. We direct your strategic requests to the right mind automatically.',
    technical: 'Each request is routed to the optimal model. Quick questions hit Gemini Flash for speed. Deep content drafting goes to Claude Sonnet. Complex strategy calculations leverage Claude Opus. All handled under the hood.',
  },
  {
    icon: 'LayoutGrid',
    title: 'Dynamic Identity Assembly',
    promise: 'It speaks like you, knows your projects, and acts like your best partner. Not a generic chatbot—it is your digital clone.',
    technical: 'Every response is built using 7-layer prompt assembly. The system dynamically pulls your identity, brand voice, role profile, relevant knowledge (vector search), memory, and session context before hitting the LLM.',
  },
  {
    icon: 'Shuffle',
    title: 'Multi-Step Execution',
    promise: 'Send one message, and watch an entire team execute a project from logic to completion without babysitting.',
    technical: 'YAML-defined workflows that chain agents and tools: search the web, analyze results, execute custom scripts, draft content, and request human review—all triggered sequentially by a single message.',
  },
  {
    icon: 'SearchPlus',
    title: 'Hybrid Knowledge Retrieval',
    promise: 'Your entire firm\'s history, methodologies, and data securely mapped and instantly accessible when you need it.',
    technical: 'FTS5 keyword search combined with deep vector embeddings. Your AI agents find the exact right document or conversational memory every time—understanding intent, not just keyword matching.',
  },
  {
    icon: 'PenTool',
    title: 'Production Pipelines',
    promise: 'Real architecture and venture structuring require rigid phases. RealizeOS mimics your actual operational flow perfectly.',
    technical: 'Structured multi-agent sessions transition through rigid stages: from initial briefing, to data drafting, iterative analysis, final review, and approved deployment.',
  },
  {
    icon: 'RefreshCw',
    title: 'Continuous Evolution',
    promise: 'Your operations engine gets smarter with every single interaction, constantly closing gaps and refining your playbook.',
    technical: 'The system uses an evolution loop to track successful paths vs failed ones. It detects knowledge gaps, dynamically suggests new skills, and refines agent prompts based on interaction history.',
  },
];
