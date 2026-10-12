import { useTranslation } from 'react-i18next';
import { Brain, ShieldCheck, Workflow, Handshake } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';

// The four layers of value (direction 2026-10, §2): brain, governed action, field method, practice.
const LAYERS = [
  { key: 'brain', icon: Brain },
  { key: 'governed', icon: ShieldCheck },
  { key: 'packs', icon: Workflow },
  { key: 'practice', icon: Handshake },
] as const;

export function ValueLayers() {
  const { t } = useTranslation();

  return (
    <Section id="layers">
      <SectionHeader title={t('layers.title')} subtitle={t('layers.subtitle')} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ key, icon: Icon }, i) => (
          <AnimateOnScroll key={key} delay={i * 0.08}>
            <GlowCard className="flex h-full flex-col">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 text-brand-yellow">
                  <Icon size={20} />
                </span>
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{t(`layers.items.${key}.t`)}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{t(`layers.items.${key}.b`)}</p>
              <div className="mt-auto border-t border-border pt-3">
                <p className="text-xs font-semibold text-brand-yellow">{t('layers.seeLabel')}</p>
                <p className="mt-1 text-sm">{t(`layers.items.${key}.see`)}</p>
              </div>
            </GlowCard>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
