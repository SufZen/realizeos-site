import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { FabricDiagram } from '@/components/illustrations/FabricDiagram';

export function FabricSystem() {
  const { t } = useTranslation();

  const items = [
    { letter: 'F', title: t('fabricSystem.items.F.title'), description: t('fabricSystem.items.F.description') },
    { letter: 'A', title: t('fabricSystem.items.A.title'), description: t('fabricSystem.items.A.description') },
    { letter: 'B', title: t('fabricSystem.items.B.title'), description: t('fabricSystem.items.B.description') },
    { letter: 'R', title: t('fabricSystem.items.R.title'), description: t('fabricSystem.items.R.description') },
    { letter: 'I', title: t('fabricSystem.items.I.title'), description: t('fabricSystem.items.I.description') },
    { letter: 'C', title: t('fabricSystem.items.C.title'), description: t('fabricSystem.items.C.description') },
  ];

  return (
    <Section id="fabric">
      <SectionHeader
        title={t('fabricSystem.header.title')}
        subtitle={t('fabricSystem.header.subtitle')}
      />
      <AnimateOnScroll>
        <FabricDiagram className="mx-auto mb-12 w-full max-w-[320px] illustration-glow" />
      </AnimateOnScroll>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <AnimateOnScroll key={item.letter} delay={i * 0.08}>
            <div className="glass-card flex items-start gap-5 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 font-mono text-xl font-bold text-brand-yellow glow-yellow">
                {item.letter}
              </span>
              <div>
                <h3 className="mb-1 font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
