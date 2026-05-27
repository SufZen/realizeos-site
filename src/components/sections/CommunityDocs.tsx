import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Github, BookOpen, Users, MessageCircle, Scale, CalendarClock } from 'lucide-react';

const communityCards = [
  { icon: Github, key: 'github', href: 'https://github.com/SufZen/RealizeOS-5' },
  { icon: BookOpen, key: 'docs', href: 'https://github.com/SufZen/RealizeOS-5/blob/main/README.md' },
  { icon: MessageCircle, key: 'telegram', href: 'https://t.me/+5r8zjoOignRmOTI0' },
  { icon: Users, key: 'discussions', href: 'https://t.me/+5r8zjoOignRmOTI0' },
  { icon: Scale, key: 'license', href: 'https://github.com/SufZen/RealizeOS-5/blob/main/LICENSE' },
  { icon: CalendarClock, key: 'officeHours', href: 'https://tidycal.com/realization/realizeos-setup' },
];

export function CommunityDocs() {
  const { t } = useTranslation();

  return (
    <Section id="community" className="bg-card/30">
      <SectionHeader
        title={t('community.title', 'Community & Docs')}
        subtitle={t('community.subtitle', 'Join the RealizeOS open-source ecosystem. Get help, contribute, and connect.')}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {communityCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <AnimateOnScroll key={card.key} delay={i * 0.08}>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="fx-glass-card flex items-start gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-yellow/40 group block"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-yellow/10 text-brand-yellow group-hover:bg-brand-yellow/20 transition-colors">
                  <Icon size={20} />
                </span>
                <div className="min-w-0 text-start">
                  <h3 className="font-semibold mb-1">{t(`community.cards.${card.key}.title`)}</h3>
                  <p className="text-sm text-muted-foreground">{t(`community.cards.${card.key}.description`)}</p>
                </div>
              </a>
            </AnimateOnScroll>
          );
        })}
      </div>
    </Section>
  );
}
