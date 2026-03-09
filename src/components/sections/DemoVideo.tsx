import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ProductMockup } from '@/components/illustrations';

export function DemoVideo() {
  const { t } = useTranslation();

  return (
    <Section id="demo">
      <SectionHeader
        title={t('demoVideo.header.title')}
        subtitle={t('demoVideo.header.subtitle')}
      />
      <AnimateOnScroll>
        <div className="glass-card glow-yellow mx-auto max-w-3xl rounded-2xl">
          <ProductMockup className="w-full rounded-xl" />
          <div className="flex flex-col items-center pb-4 pt-2">
            <p className="text-muted-foreground">{t('demoVideo.comingSoon')}</p>
            <span className="mt-1 text-sm text-muted-foreground/60">{t('demoVideo.duration')}</span>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
