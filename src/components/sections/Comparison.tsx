import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { useTranslation } from 'react-i18next';
import { ComparisonTeamIcon } from '@/components/illustrations/ComparisonTeamIcon';
import { ComparisonToolsIcon } from '@/components/illustrations/ComparisonToolsIcon';
import { ComparisonRealizeIcon } from '@/components/illustrations/ComparisonRealizeIcon';
import { cn } from '@/lib/utils';

const headerIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Hiring a Team': ComparisonTeamIcon,
  'Individual AI Tools': ComparisonToolsIcon,
  'RealizeOS': ComparisonRealizeIcon,
};

export function Comparison() {
  const { t } = useTranslation();

  const cols = [
    {
      headerIconKey: 'Hiring a Team',
      header: t('comparison.columns.traditional.header'),
      price: t('comparison.columns.traditional.price'),
      priceSuffix: t('comparison.columns.traditional.priceSuffix'),
      items: (t('comparison.columns.traditional.items', { returnObjects: true }) as string[]).map(text => ({ text })),
    },
    {
      headerIconKey: 'Individual AI Tools',
      header: t('comparison.columns.tools.header'),
      price: t('comparison.columns.tools.price'),
      priceSuffix: t('comparison.columns.tools.priceSuffix'),
      items: (t('comparison.columns.tools.items', { returnObjects: true }) as string[]).map(text => ({ text })),
    },
    {
      headerIconKey: 'RealizeOS',
      header: t('comparison.columns.realize.header'),
      price: t('comparison.columns.realize.price'),
      priceSuffix: t('comparison.columns.realize.priceSuffix'),
      featured: true,
      items: (t('comparison.columns.realize.items', { returnObjects: true }) as string[]).map(text => ({ text })),
    },
  ];

  return (
    <Section id="comparison">
      <SectionHeader title={t('comparison.header.title')} subtitle={t('comparison.header.subtitle')} />
      <div className="grid gap-5 md:grid-cols-3">
        {cols.map((col, i) => (
          <AnimateOnScroll key={col.header} delay={i * 0.1}>
            <div
              className={cn(
                'glass-card flex h-full flex-col rounded-xl p-6',
                col.featured && 'ring-1 ring-brand-yellow/30 glow-yellow'
              )}
            >
              {(() => {
                const Icon = headerIconMap[col.headerIconKey];
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
