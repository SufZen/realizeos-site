import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { painPoints, painTransition } from '@/data/pain-points';
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
  return (
    <Section id="pain">
      <SectionHeader
        title="Stop Duct-Taping AI Tools<br>That Forget You"
        subtitle="Most AI setups are a mess of disconnected chatbots, lost context, and manual copy-pasting. Your AI should work as a team, not a collection of strangers."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {painPoints.map((p, i) => {
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
          {painTransition}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
