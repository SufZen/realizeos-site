export interface FabricItem {
  letter: string;
  title: string;
  description: string;
}

export const fabricItems: FabricItem[] = [
  {
    letter: 'F',
    title: 'Foundations',
    description: 'Brand identity and voice rules that every agent follows. Your team speaks in your voice, always.',
  },
  {
    letter: 'A',
    title: 'Agents',
    description: 'Your specialized AI team — writer, analyst, reviewer, orchestrator. Each defined by a markdown file you control.',
  },
  {
    letter: 'B',
    title: 'Brain',
    description: 'Domain knowledge your team actually remembers. Market data, expertise, research — accessible every conversation.',
  },
  {
    letter: 'R',
    title: 'Routines',
    description: 'Workflows that chain agents and tools together. "Write a post" triggers writer, then reviewer — automatically.',
  },
  {
    letter: 'I',
    title: 'Insights',
    description: "A learning log that makes your team smarter over time. Feedback, decisions, and patterns — nothing gets lost.",
  },
  {
    letter: 'C',
    title: 'Creations',
    description: 'Deliverables that meet your quality standards. Every output lands in an organized, reviewable structure.',
  },
];
