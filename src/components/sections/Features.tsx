import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useFeatures } from '@/data/features';
import {
  FeatureMultiLLM,
  FeaturePromptAssembly,
  FeatureSkills,
  FeatureKBSearch,
  FeatureCreativePipeline,
  FeatureSelfEvolution,
  FeatureMultiChannel,
  FeatureSecurity,
} from '@/components/illustrations';
import { useTranslation } from 'react-i18next';
import {
  Database, Brain, Zap, Target, Moon, ScrollText, Shield, Terminal, Mic, Smartphone,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Database, Brain, Zap, Target, Moon, ScrollText, Shield, Terminal, Mic, Smartphone,
};

// Keep illustration map for features that have dedicated SVG illustrations
const illustrationMap: Record<string, React.FC<{ className?: string }>> = {
  Zap: FeatureMultiLLM,
  Shield: FeatureSecurity,
  Brain: FeatureKBSearch,
  Database: FeaturePromptAssembly,
  Target: FeatureSkills,
  Moon: FeatureSelfEvolution,
  ScrollText: FeatureCreativePipeline,
  Terminal: FeatureMultiChannel,
};

export function Features() {
  const features = useFeatures();
  const { t } = useTranslation();

  const shipped = features.filter(f => !f.roadmap);
  const roadmap = features.filter(f => f.roadmap);

  return (
    <Section id="features">
      <SectionHeader
        title={t('features.header.title')}
        subtitle={t('features.header.subtitle')}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shipped.map((f, i) => {
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
                          {t('features.view_flow')}
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

      {/* Roadmap section */}
      {roadmap.length > 0 && (
        <div className="mt-12">
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-6">
            {t('features.roadmapTitle', 'Coming Soon')}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-2xl">
            {roadmap.map((f, i) => {
              const LucideIcon = iconMap[f.icon];
              return (
                <AnimateOnScroll key={f.title} delay={i * 0.08}>
                  <div className="fx-glass-card rounded-xl p-4 opacity-70 flex flex-col items-center text-center relative">
                    <Badge variant="outline" className="absolute -top-2 text-[10px] border-muted-foreground/40 text-muted-foreground">
                      {t('features.roadmapBadge', 'Roadmap')}
                    </Badge>
                    {LucideIcon && <LucideIcon size={24} className="mb-2 mt-2 text-muted-foreground" />}
                    <h4 className="text-sm font-semibold mb-1">{f.title}</h4>
                    <p className="text-xs text-muted-foreground">{f.promise}</p>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
}
