import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { useUseCases } from '@/data/usecases';
import { useTranslation } from 'react-i18next';
import {
  UseCaseConsulting,
  UseCaseAgency,
  UseCaseMultiVenture,
  UseCaseSaaS,
  UseCaseEcommerce,
} from '@/components/illustrations';

const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  PenTool: UseCaseAgency,
  BookOpen: UseCaseConsulting,
  Briefcase: UseCaseMultiVenture,
  Flag: UseCaseSaaS,
  Layers: UseCaseSaaS,
  Home: UseCaseEcommerce,
};

export function UseCases() {
  const { t } = useTranslation();
  const useCases = useUseCases();

  return (
    <Section id="usecases">
      <SectionHeader
        title={t('usecases.header.title')}
        subtitle={t('usecases.header.subtitle')}
      />
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => {
          const Illustration = illustrationMap[uc.icon];
          return (
            <AnimateOnScroll key={uc.title} delay={i * 0.08}>
              <GlowCard className="flex h-full flex-col text-center">
                {Illustration && (
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/10">
                    <Illustration className="h-6 w-6 text-brand-yellow" />
                  </div>
                )}
                <h3 className="mb-1 font-semibold">{uc.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{uc.description}</p>
                <ul className="mt-auto space-y-1 border-t border-white/10 pt-3 text-start">
                  {uc.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-0.5 shrink-0 text-[#ffcc00]">›</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
