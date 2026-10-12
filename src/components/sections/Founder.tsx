import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { FounderPhotoFrame } from '@/components/illustrations/FounderPhotoFrame';
import { Separator } from '@/components/ui/separator';
import { LINKS } from '@/lib/constants';

export function Founder() {
  const { t } = useTranslation();

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

          <div className="mt-10 text-start">
            <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              {t('founder.proofTitle')}
            </h3>
            <ul className="space-y-3">
              {(['tender', 'arena', 'firm'] as const).map((key) => (
                <li key={key} className="fx-glass-card rounded-xl px-5 py-4 text-sm text-foreground">
                  {t(`founder.proof.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <FounderPhotoFrame className="mx-auto mt-8 mb-4 h-24 w-24" src="/img/founder.png" />
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
