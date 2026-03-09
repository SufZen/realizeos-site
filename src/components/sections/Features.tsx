import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
              <GlowCard className="flex h-full flex-col">
                {Illustration && <Illustration className="mb-4 h-16 w-16" />}
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="mb-4 text-sm text-foreground">{f.promise}</p>

                {f.technical && (
                  <div className="mt-auto pt-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="technical-specs" className="border-none">
                        <AccordionTrigger className="justify-start gap-2 py-0 text-xs font-semibold text-brand-yellow hover:no-underline">
                          View Technical Flow
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="pt-3 text-xs text-muted-foreground leading-relaxed">
                            {f.technical}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )}
              </GlowCard>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
