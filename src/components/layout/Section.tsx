import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: 'default' | 'elevated' | 'card';
}

export function Section({ id, className, children, background = 'default' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28',
        background === 'elevated' && 'bg-muted',
        background === 'card' && 'bg-card',
        className
      )}
    >
      <div className="mx-auto max-w-site px-5">{children}</div>
    </section>
  );
}
