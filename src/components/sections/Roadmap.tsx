import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFeatures } from '@/data/features';
import { useTranslation } from 'react-i18next';
import { LINKS } from '@/lib/constants';
import {
  Mic, Smartphone, Database, Brain, Zap, Target, Moon, ScrollText, Shield, Terminal,
  Send,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  Database, Brain, Zap, Target, Moon, ScrollText, Shield, Terminal, Mic, Smartphone,
};

export function Roadmap() {
  const features = useFeatures();
  const { t } = useTranslation();
  const roadmap = features.filter(f => f.roadmap);

  if (roadmap.length === 0) return null;

  return (
    <Section id="roadmap">
      <AnimateOnScroll>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="fx-gradient-text mb-3 text-3xl font-bold md:text-4xl">
            {t('features.roadmapTitle', 'Coming Soon')}
          </h2>
          <p className="mb-10 text-muted-foreground">
            {t('roadmap.subtitle', 'What we\'re building next. Help us prioritize.')}
          </p>
        </div>
      </AnimateOnScroll>

      <div className="mx-auto grid max-w-xl gap-4 sm:grid-cols-2">
        {roadmap.map((f, i) => {
          const LucideIcon = iconMap[f.icon];
          return (
            <AnimateOnScroll key={f.title} delay={i * 0.1}>
              <div className="fx-glass-card flex flex-col items-center rounded-xl p-6 text-center transition-all hover:border-brand-yellow/20">
                <Badge
                  variant="outline"
                  className="mb-4 text-[10px] border-brand-yellow/30 text-brand-yellow/80"
                >
                  {t('features.roadmapBadge', 'Roadmap')}
                </Badge>
                {LucideIcon && (
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/10">
                    <LucideIcon size={24} className="text-brand-yellow" />
                  </div>
                )}
                <h3 className="mb-2 text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.promise}</p>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      {/* Request a Feature */}
      <AnimateOnScroll delay={0.3}>
        <div className="mx-auto mt-10 max-w-md text-center">
          <div className="fx-glass-card rounded-xl p-6">
            <Send size={20} className="mx-auto mb-3 text-brand-yellow" />
            <h3 className="mb-1 text-base font-semibold">
              {t('roadmap.requestTitle', 'Have an idea?')}
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {t('roadmap.requestDesc', 'Tell us what feature would make RealizeOS indispensable for your workflow.')}
            </p>
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={`mailto:${LINKS.supportEmail}?subject=Feature%20Request`}>
                <Send size={14} />
                {t('roadmap.requestCta', 'Request a Feature')}
              </a>
            </Button>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
