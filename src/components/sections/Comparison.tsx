import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ComparisonTeamIcon } from '@/components/illustrations/ComparisonTeamIcon';
import { ComparisonToolsIcon } from '@/components/illustrations/ComparisonToolsIcon';
import { ComparisonRealizeIcon } from '@/components/illustrations/ComparisonRealizeIcon';
import { comparisonColumns } from '@/data/comparison';
import { cn } from '@/lib/utils';

const headerIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Hiring a Team': ComparisonTeamIcon,
  'Individual AI Tools': ComparisonToolsIcon,
  'RealizeOS': ComparisonRealizeIcon,
};

export function Comparison() {
  return (
    <Section id="comparison">
      <SectionHeader title="The Math Is Simple" />
      <div className="grid gap-5 md:grid-cols-3">
        {comparisonColumns.map((col, i) => (
          <AnimateOnScroll key={col.header} delay={i * 0.1}>
            <div
              className={cn(
                'glass-card flex h-full flex-col rounded-xl p-6',
                col.featured && 'ring-1 ring-brand-yellow/30 glow-yellow'
              )}
            >
              {(() => {
                const Icon = headerIconMap[col.header];
                return Icon ? <Icon className="mx-auto mb-3 h-10 w-10" /> : null;
              })()}
              <div
                className={cn(
                  'mb-3 text-sm font-semibold uppercase tracking-wider',
                  col.featured ? 'text-brand-yellow' : 'text-muted-foreground'
                )}
              >
                {col.header}
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold">{col.price}</span>
                <span className="text-sm text-muted-foreground">{col.priceSuffix}</span>
              </div>
              <ul className="space-y-2.5 text-sm">
                {col.items.map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-muted-foreground">
                    <span className={cn('mt-0.5', col.featured ? 'text-brand-yellow' : 'text-muted-foreground/50')}>
                      {col.featured ? '✓' : '•'}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
