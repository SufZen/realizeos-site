import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Building2, DraftingCompass, HardHat, ArrowRight } from 'lucide-react';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { useUseCases, usePackExample, PACK_INSTALL_COMMAND } from '@/data/usecases';

const iconMap = {
  developer: Building2,
  architecture: DraftingCompass,
  construction: HardHat,
} as const;

export function UseCases() {
  const { t } = useTranslation();
  const useCases = useUseCases();
  const rows = usePackExample();

  return (
    <Section id="fieldpacks">
      <SectionHeader
        title={t('usecases.header.title')}
        subtitle={t('usecases.header.subtitle')}
      />
      <div className="grid gap-5 md:grid-cols-3">
        {useCases.map((uc, i) => {
          const Icon = iconMap[uc.key];
          return (
            <AnimateOnScroll key={uc.key} delay={i * 0.08}>
              <GlowCard className="flex h-full flex-col">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-yellow/10">
                  <Icon className="h-6 w-6 text-brand-yellow" />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{uc.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{uc.description}</p>
                <ul className="mt-auto space-y-1.5 border-t border-border pt-3">
                  {uc.tasks.map((task) => (
                    <li key={task} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-0.5 shrink-0 text-brand-yellow">›</span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </GlowCard>
            </AnimateOnScroll>
          );
        })}
      </div>

      {/* Worked example: the real-estate developer pack */}
      <AnimateOnScroll delay={0.2}>
        <div className="mt-16 rounded-2xl border border-brand-yellow/30 bg-card p-6 md:p-8">
          <h3 className="text-xl font-semibold md:text-2xl">{t('usecases.example.title')}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t('usecases.example.subtitle')}</p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-start text-sm">
              <thead>
                <tr className="border-b border-border text-start text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="py-3 pe-4 text-start font-semibold">{t('usecases.example.colSkill')}</th>
                  <th scope="col" className="py-3 pe-4 text-start font-semibold">{t('usecases.example.colIn')}</th>
                  <th scope="col" className="py-3 pe-4 text-start font-semibold">{t('usecases.example.colOut')}</th>
                  <th scope="col" className="py-3 text-start font-semibold text-brand-yellow">{t('usecases.example.colHeld')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.skill} className="border-b border-border/60 align-top last:border-0">
                    <th scope="row" className="py-3 pe-4 text-start font-semibold">{r.skill}</th>
                    <td className="py-3 pe-4 text-muted-foreground">{r.in}</td>
                    <td className="py-3 pe-4 text-muted-foreground">{r.out}</td>
                    <td className="py-3">{r.held}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-sm text-muted-foreground">{t('usecases.example.installLabel')}</p>
            <pre dir="ltr" className="overflow-x-auto rounded-lg bg-background px-4 py-3 text-start font-mono text-xs md:text-sm">
              <code>{PACK_INSTALL_COMMAND}</code>
            </pre>
            <Link
              to="/guide/field-packs"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-yellow hover:underline"
            >
              {t('usecases.example.guideLink')}
              <ArrowRight size={14} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
