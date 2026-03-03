import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlowCard({ children, className, hover = true }: GlowCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-300',
        hover && 'glow-yellow-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
}
