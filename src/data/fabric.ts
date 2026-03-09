export interface FabricItem {
  letter: string;
  title: string;
  description: string;
}

export const fabricItems: FabricItem[] = [
  {
    letter: 'F',
    title: 'Foundations',
    description: 'System methodology, identity, and rules that every agent follows. Your team builds to your exact specifications, always.',
  },
  {
    letter: 'A',
    title: 'Agents',
    description: 'Your specialized AI team — drafter, analyst, reviewer, orchestrator. Each defined by a structure you control.',
  },
  {
    letter: 'B',
    title: 'Brain',
    description: 'Domain knowledge your team actually remembers. Market data, building codes, expertise, deal history — accessible every conversation.',
  },
  {
    letter: 'R',
    title: 'Routines',
    description: 'Workflows that chain agents and tools together. "Draft project narrative" triggers writer, then reviewer — automatically.',
  },
  {
    letter: 'I',
    title: 'Insights',
    description: "A learning log that makes your team smarter over time. Feedback, execution decisions, and patterns — nothing gets lost.",
  },
  {
    letter: 'C',
    title: 'Creations',
    description: 'Deployments that meet your quality standards. Every output lands in an organized, reviewable structure.',
  },
];
