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
          <h2 className="text-gradient-yellow mb-6 text-3xl font-bold md:text-4xl">
            {t('founder.title')}
          </h2>
          <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('founder.p1') }} />
          <p className="mt-4 text-muted-foreground">
            {t('founder.p2')}
          </p>
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
