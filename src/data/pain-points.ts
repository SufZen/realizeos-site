export interface PainPoint {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export const painPoints: PainPoint[] = [
  {
    icon: 'Layers',
    title: 'Fragmented Tools',
    description: "One chatbot for writing, another for research, a third for email. None of them know about each other.",
  },
  {
    icon: 'Clock',
    title: 'Lost Context',
    description: "Every conversation starts from scratch. Your AI doesn't remember your brand, your preferences, or last week's decisions.",
  },
  {
    icon: 'Users',
    title: 'No Coordination',
    description: "You're the middleware. You copy outputs from one AI to feed into another. That's not automation — it's extra work.",
  },
];

export const painTransition = "There's a better way. A structured operating system where AI agents work as a coordinated team — from your knowledge base, in your voice, for your business.";
