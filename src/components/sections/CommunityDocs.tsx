import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';

export function CommunityDocs() {
  const { t } = useTranslation();

  return (
    <Section id="community" className="bg-card/30">
      <SectionHeader
        title={t('community.title', 'Community & Docs')}
        subtitle={t('community.subtitle', 'Join the RealizeOS ecosystem')}
      />
      <div className="mt-12 text-center text-muted-foreground">
        {t('community.placeholder', 'Community section coming soon...')}
      </div>
    </Section>
  );
}
