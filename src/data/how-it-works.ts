export interface HowStep {
  number: number;
  title: string;
  description: string;
  time?: string;
}

export const howSteps: HowStep[] = [
  {
    number: 1,
    title: 'Pick Your Edition',
    description: 'Stripe checkout takes 30 seconds. Choose Lite, Full, or Setup Assistance.',
  },
  {
    number: 2,
    title: 'Get Instant Access',
    description: 'Google Drive link + welcome email + community invite arrive immediately. No waiting.',
  },
  {
    number: 3,
    title: 'Define Who You Are & Your Business',
    description: 'Fill in your personal identity, brand identity, and voice rules from guided templates. Use the Brand Worksheet to make it easy.',
    time: '5-10 min',
  },
  {
    number: 4,
    title: 'First Conversation',
    description: 'Ask your AI team to write a post. Watch the Writer draft and the Reviewer check quality — in your voice.',
    time: '5 min',
  },
  {
    number: 5,
    title: 'Build Your System',
    description: 'Add domain knowledge, create workflows, connect tools. Your AI team gets smarter every week.',
    time: 'Week 1',
  },
];
