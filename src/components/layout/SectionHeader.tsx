import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, gradient = true, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 text-center md:mb-16', className)}>
      <h2
        className={cn(
          'text-3xl font-bold md:text-4xl lg:text-[2.75rem]',
          gradient && 'text-gradient-yellow'
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
