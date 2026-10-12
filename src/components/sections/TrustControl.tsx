import { useTranslation } from 'react-i18next';
import { Hourglass, FileSearch, Users, Server, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';

// Each item maps to a shipped capability: approvals hold then execute (5.9.0),
// "what I used" trail and [S1] citations (5.10.0), roles and venture scope (5.11.0),
// self-hosting, and the 5.6.2 → 5.14.0 security hardening.
const ITEMS = [
  { key: 'approvals', icon: Hourglass },
  { key: 'trail', icon: FileSearch },
  { key: 'roles', icon: Users },
  { key: 'selfhosted', icon: Server },
  { key: 'hardened', icon: ShieldCheck },
] as const;

export function TrustControl() {
  const { t } = useTranslation();

  return (
    <Section id="trust" className="bg-card/30">
      <SectionHeader title={t('trust.title')} subtitle={t('trust.subtitle')} />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map(({ key, icon: Icon }, i) => (
          <AnimateOnScroll key={key} delay={i * 0.06}>
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 text-brand-yellow">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="mb-1 font-semibold">{t(`trust.items.${key}.t`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`trust.items.${key}.b`)}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}

        {/* Candor: what it doesn't do */}
        <AnimateOnScroll delay={0.3}>
          <div className="flex h-full gap-4 rounded-xl border border-border bg-background p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <ShieldAlert size={20} />
            </span>
            <div>
              <h3 className="mb-1 font-semibold">{t('trust.cant.title')}</h3>
              <p className="text-sm text-muted-foreground">{t('trust.cant.body')}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </Section>
  );
}
