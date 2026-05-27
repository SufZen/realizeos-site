import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { FounderPhotoFrame } from '@/components/illustrations/FounderPhotoFrame';
import { Separator } from '@/components/ui/separator';
import { LINKS } from '@/lib/constants';
import { Globe, Bot, Calendar } from 'lucide-react';

export function Founder() {
  const { t } = useTranslation();

  const proofStats = [
    { icon: Globe, value: t('founder.proof.regions', '3 Regions'), label: t('founder.proof.regionsLabel', 'IL · PT · US') },
    { icon: Bot, value: t('founder.proof.agents', '6+ Agents'), label: t('founder.proof.agentsLabel', 'in production') },
    { icon: Calendar, value: t('founder.proof.usage', 'Daily'), label: t('founder.proof.usageLabel', 'used by Realization') },
  ];

  return (
    <Section id="founder">
      <AnimateOnScroll>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="fx-gradient-text mb-6 text-3xl font-bold md:text-4xl">
            {t('founder.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('founder.p1')}
          </p>
          <p className="mt-4 text-muted-foreground">
            {t('founder.p2')}
          </p>

          {/* Walk the Talk proof badge */}
          <div className="mt-8 mb-6 mx-auto max-w-md">
            <div className="fx-glass-card rounded-xl p-4">
              <p className="text-xs uppercase tracking-wider text-brand-yellow/70 font-semibold mb-3">
                {t('founder.proof.badge', 'Walk the Talk')}
              </p>
              <div className="flex items-center justify-center gap-6 text-sm">
                {proofStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.value} className="flex flex-col items-center gap-1">
                      <Icon size={16} className="text-brand-yellow" />
                      <strong className="text-foreground">{stat.value}</strong>
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <FounderPhotoFrame className="mx-auto mb-4 h-24 w-24" src="/img/founder.png" />
          <Separator className="mx-auto my-6 w-16" />
          <div>
            <strong>Asaf Eyzenkot</strong>
            <div className="text-sm text-muted-foreground">
              {t('founder.role')}{' '}
              <a
                href={LINKS.realization}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-yellow hover:underline"
              >
                Realization
              </a>
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-yellow"
              >
                LinkedIn
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-yellow"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
