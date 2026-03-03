import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { features } from '@/data/features';
import {
  FeatureMultiLLM,
  FeaturePromptAssembly,
  FeatureSkills,
  FeatureKBSearch,
  FeatureCreativePipeline,
  FeatureSelfEvolution,
} from '@/components/illustrations';

const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  Zap: FeatureMultiLLM,
  LayoutGrid: FeaturePromptAssembly,
  Shuffle: FeatureSkills,
  SearchPlus: FeatureKBSearch,
  PenTool: FeatureCreativePipeline,
  RefreshCw: FeatureSelfEvolution,
};

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        title="Built for Real Operations"
        subtitle="Not a toy. Not a wrapper. A complete AI operations engine with the depth to run your business."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Illustration = illustrationMap[f.icon];
          return (
            <AnimateOnScroll key={f.title} delay={i * 0.08}>
              <GlowCard className="h-full">
                {Illustration && <Illustration className="mb-4 h-16 w-16" />}
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </GlowCard>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
