export interface PainPoint {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export const painPoints: PainPoint[] = [
  {
    icon: 'Layers',
    title: 'The Friction Trap',
    description: "Your best ideas die in the handoff. You're constantly translating between disconnected tools, watching momentum stall and deadlines slip entirely.",
  },
  {
    icon: 'Clock',
    title: 'Execution Paralysis',
    description: "The overwhelming anxiety of turning a massive physical project into reality. The sheer volume of unstructured details paralyzes your ability to lead.",
  },
  {
    icon: 'Users',
    title: 'Middleware Madness',
    description: "You've become the bottleneck. Instead of designing the future, you're manually duct-taping generic AI outputs together at 2 AM. It's exhausting.",
  },
];

export const painTransition = "You shouldn't feel this way. Step out of the middleware and into the visionary seat. Command a coordinated operational engine that builds your reality for you.";
