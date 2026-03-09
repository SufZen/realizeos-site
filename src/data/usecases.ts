export interface UseCase {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  tasks: string[];
}

export const useCases: UseCase[] = [
  {
    icon: 'PenTool',
    title: 'Architecture Firms',
    description: 'Stop drowning in compliance checks and vendor emails. Reclaim your time to focus on what you actually love: designing the future.',
    tasks: [
      'Draft RFQ responses based on past successful bids',
      'Automate preliminary zoning and compliance checks',
      'Generate project narratives from raw meeting notes',
      'Extract insights from complex municipal building codes',
      'Manage vendor coordination emails in your tone',
    ],
  },
  {
    icon: 'BookOpen',
    title: 'Real Estate Investment',
    description: 'Transform anxiety into absolute clarity. Make high-stakes decisions with an engine that instantly surfaces the exact insights you need.',
    tasks: [
      'Extract key metrics from financial prospectuses',
      'Draft investment committee memos from raw data',
      'Analyze market trends to spot emerging yield opportunities',
      'Standardize property due diligence reports',
      'Summarize quarterly portfolio performance',
    ],
  },
  {
    icon: 'Briefcase',
    title: 'Venture Studios',
    description: 'Achieve the impossible: extreme scale without the burnout. Run three ventures with the mental clarity of running one.',
    tasks: [
      'Switch between ventures without losing context',
      'Draft go-to-market strategies for new spin-offs',
      'Generate investor updates for each venture separately',
      'Research new market opportunities across all verticals',
      'Maintain unified branding rules across discrete teams',
    ],
  },
  {
    icon: 'Flag',
    title: 'Engineering & Operations',
    description: 'Bring order to the chaos of physical deployment. Feel the total relief of knowing every fragmented detail is structured and tracked.',
    tasks: [
      'Translate technical specs into client-friendly updates',
      'Structure fragmented site reports into coherent logs',
      'Draft operational playbooks and standard procedures',
      'Review contractor bids against project requirements',
      'Automate follow-ups for outstanding project deliverables',
    ],
  },
  {
    icon: 'Layers',
    title: 'Urban Planning',
    description: 'Navigate the labyrinth of public policy and community feedback with an engine that synthesizes thousands of voices into clear direction.',
    tasks: [
      'Summarize hours of town hall meeting transcripts',
      'Draft public engagement reports and summaries',
      'Cross-reference master plans with new zoning laws',
      'Generate accessible community update newsletters',
      'Analyze demographic data for neighborhood impact',
    ],
  },
  {
    icon: 'Home',
    title: 'Asset Management',
    description: 'Gain ultimate peace of mind. Protect your portfolio\'s value with an always-on operational layer that never misses a detail.',
    tasks: [
      'Automate tenant communication and maintenance routing',
      'Generate monthly owner statements and narrative reports',
      'Monitor lease expiration schedules proactively',
      'Draft vendor RFPs for capital improvement projects',
      'Analyze operating expense variances across properties',
    ],
  },
];
