import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { useCases } from '@/data/usecases';
import {
  UseCaseConsulting,
  UseCaseAgency,
  UseCaseMultiVenture,
  UseCaseSaaS,
  UseCaseEcommerce,
} from '@/components/illustrations';

const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  BookOpen: UseCaseConsulting,
  PenTool: UseCaseAgency,
  Briefcase: UseCaseMultiVenture,
  Flag: UseCaseSaaS,
  ShoppingCart: UseCaseEcommerce,
  Layers: UseCaseSaaS, // Recycling SVGs until Phase 2
  Home: UseCaseEcommerce, // Recycling SVGs until Phase 2
};

export function UseCases() {
  return (
    <Section id="usecases">
      <SectionHeader
        title="Built For How You Work"
        subtitle="Whether you run one venture or five, RealizeOS adapts to your operations."
      />
      <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => {
          const Illustration = illustrationMap[uc.icon];
          return (
            <AnimateOnScroll key={uc.title} delay={i * 0.08}>
              <GlowCard className="flex flex-col text-center">
                {Illustration && (
                  <Illustration className="mx-auto mb-3 h-12 w-12" />
                )}
                <h3 className="mb-1 font-semibold">{uc.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{uc.description}</p>
                <ul className="mt-auto space-y-1 border-t border-white/10 pt-3 text-left">
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
