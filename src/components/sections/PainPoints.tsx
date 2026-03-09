import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import {
  PainFragmented,
  PainLostContext,
  PainNoCoordination,
} from '@/components/illustrations';

const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  Layers: PainFragmented,
  Clock: PainLostContext,
  Users: PainNoCoordination,
};

export function PainPoints() {
  const { t } = useTranslation();

  const points = [
    {
      icon: 'Layers',
      title: t('painPoints.items.layers.title'),
      description: t('painPoints.items.layers.description')
    },
    {
      icon: 'Clock',
      title: t('painPoints.items.clock.title'),
      description: t('painPoints.items.clock.description')
    },
    {
      icon: 'Users',
      title: t('painPoints.items.users.title'),
      description: t('painPoints.items.users.description')
    }
  ];

  return (
    <Section id="pain">
      <SectionHeader
        title={t('painPoints.header.title')}
        subtitle={t('painPoints.header.subtitle')}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {points.map((p, i) => {
          const Illustration = illustrationMap[p.icon];
          return (
            <AnimateOnScroll key={p.title} delay={i * 0.1}>
              <GlowCard className="h-full">
                {Illustration && <Illustration className="mb-4 h-16 w-16" />}
                <h3 className="mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </GlowCard>
            </AnimateOnScroll>
          );
        })}
      </div>
      <AnimateOnScroll delay={0.3}>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base text-muted-foreground">
          {t('painPoints.transition')}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
