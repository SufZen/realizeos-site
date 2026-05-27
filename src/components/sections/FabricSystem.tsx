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

      {/* AI-OS Architecture Framing */}
      <AnimateOnScroll>
        <div className="mx-auto mb-14 max-w-3xl">
          <div className="fx-glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-center text-lg font-bold mb-6 fx-gradient-text">
              {t('fabricSystem.architecture.title', 'The Layered AI-OS Model')}
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {(['heart', 'limbs', 'skin'] as const).map((layer) => (
                <div key={layer} className={`rounded-xl p-4 text-center transition-all ${
                  layer === 'heart' 
                    ? 'bg-brand-yellow/10 border border-brand-yellow/30 ring-1 ring-brand-yellow/20' 
                    : 'bg-muted/50 border border-border/50'
                }`}>
                  <div className="text-2xl mb-2">
                    {layer === 'heart' ? '❤️' : layer === 'limbs' ? '🔄' : '🖥️'}
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 ${layer === 'heart' ? 'text-brand-yellow' : 'text-foreground'}`}>
                    {t(`fabricSystem.architecture.${layer}.title`)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t(`fabricSystem.architecture.${layer}.description`)}
                  </p>
                  {layer === 'heart' && (
                    <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-wider text-brand-yellow/80">
                      {t('fabricSystem.architecture.heart.badge', 'You Own This Forever')}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll>
        <FabricDiagram className="mx-auto mb-12 w-full max-w-[320px] fx-illustration-glow" />
      </AnimateOnScroll>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <AnimateOnScroll key={item.letter} delay={i * 0.08}>
            <div className="fx-glass-card flex items-start gap-5 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 font-mono text-xl font-bold text-brand-yellow fx-glow">
                {item.letter}
              </span>
              <div className="min-w-0 text-start">
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
