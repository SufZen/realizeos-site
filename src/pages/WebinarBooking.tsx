import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { BOOKING_LINKS } from '@/lib/constants';

/* ------------------------------------------------------------------ */
/*  Access gate – shown when ?token=success is missing                */
/* ------------------------------------------------------------------ */
function AccessRequired() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimateOnScroll>
          <div className="glass-card mx-auto max-w-md rounded-2xl p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">{t('webinar.booking.accessRequired')}</h2>
            <p className="mb-6 text-muted-foreground">{t('webinar.booking.accessMessage')}</p>
            <Button asChild size="lg">
              <a href="/#pricing">{t('webinar.booking.goToPricing')}</a>
            </Button>
          </div>
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Language toggle segmented control (EN / HE)                       */
/* ------------------------------------------------------------------ */
function LanguageToggle({
  selected,
  onChange,
}: {
  selected: 'en' | 'he';
  onChange: (lang: 'en' | 'he') => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-8 flex w-fit items-center gap-1 rounded-full border border-border bg-muted/30 p-1">
      <button
        onClick={() => onChange('en')}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
          selected === 'en'
            ? 'bg-brand-yellow text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span className="text-base">🇬🇧</span>
        {t('webinar.booking.langEnglish')}
      </button>
      <button
        onClick={() => onChange('he')}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
          selected === 'he'
            ? 'bg-brand-yellow text-primary-foreground shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <span className="text-base">🇮🇱</span>
        {t('webinar.booking.langHebrew')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Success banner                                                     */
/* ------------------------------------------------------------------ */
function SuccessBanner({ titleKey, messageKey }: { titleKey: string; messageKey: string }) {
  const { t } = useTranslation();
  return (
    <Section>
      <AnimateOnScroll>
        <div className="mx-auto max-w-2xl rounded-2xl border border-brand-yellow/20 bg-brand-yellow/5 p-8 text-center">
          <Badge className="mb-4 bg-brand-yellow text-primary-foreground">
            {t(titleKey)}
          </Badge>
          <p className="text-muted-foreground">{t(messageKey)}</p>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  HUB page — tier selector (fallback for /webinar/booking)          */
/* ------------------------------------------------------------------ */
function HubPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tiers = [
    {
      key: 'setup',
      name: t('webinar.booking.hub.setupCard'),
      desc: t('webinar.booking.hub.setupDesc'),
      icon: '🤝',
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
    },
    {
      key: 'lite',
      name: t('webinar.booking.hub.liteCard'),
      desc: t('webinar.booking.hub.liteDesc'),
      icon: '⚡',
      color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    },
    {
      key: 'full',
      name: t('webinar.booking.hub.fullCard'),
      desc: t('webinar.booking.hub.fullDesc'),
      icon: '🚀',
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <SuccessBanner
          titleKey="webinar.booking.hub.title"
          messageKey="webinar.booking.hub.subtitle"
        />

        <Section>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <AnimateOnScroll key={tier.key}>
                <button
                  onClick={() => navigate(`/webinar/booking/${tier.key}?token=success`)}
                  className={`group glass-card flex w-full flex-col items-center rounded-2xl border bg-gradient-to-br p-8 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${tier.color}`}
                >
                  <span className="mb-4 text-4xl">{tier.icon}</span>
                  <h3 className="mb-2 text-lg font-bold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground">{tier.desc}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-yellow opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Continue →
                  </span>
                </button>
              </AnimateOnScroll>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETUP page — calendar booking for Setup Assistance buyers         */
/* ------------------------------------------------------------------ */
function SetupPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <SuccessBanner
          titleKey="webinar.booking.setup.successTitle"
          messageKey="webinar.booking.setup.successMessage"
        />

        <Section>
          <SectionHeader
            title={t('webinar.booking.setup.title')}
            subtitle={t('webinar.booking.setup.subtitle')}
          />

          <AnimateOnScroll>
            <div className="mx-auto max-w-2xl">
              <div className="glass-card rounded-2xl p-8 text-center">
                <h3 className="mb-6 text-xl font-bold">
                  {t('webinar.booking.setup.calendarHeading')}
                </h3>
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-border bg-muted/30 p-6">
                  {/* Replace placeholder below with real calendar embed:
                      e.g. <iframe src="https://cal.com/..." /> */}
                  <p className="text-sm text-muted-foreground">
                    {t('webinar.booking.setup.calendarPlaceholder')}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  WEBINAR page — used for both Lite and Full tiers                  */
/* ------------------------------------------------------------------ */
function WebinarPage({ tier }: { tier: 'lite' | 'full' }) {
  const { t } = useTranslation();
  const [lang, setLang] = useState<'en' | 'he'>('en');
  const links = BOOKING_LINKS[tier];

  const tierPrefix = `webinar.booking.${tier}`;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        <SuccessBanner
          titleKey={`${tierPrefix}.successTitle`}
          messageKey={`${tierPrefix}.successMessage`}
        />

        <Section>
          <SectionHeader
            title={t(`${tierPrefix}.title`)}
            subtitle={t(`${tierPrefix}.subtitle`)}
          />

          <AnimateOnScroll>
            <div className="mx-auto max-w-2xl">
              {/* Language toggle */}
              <LanguageToggle selected={lang} onChange={setLang} />

              {/* Webinar card */}
              <div className="glass-card rounded-2xl p-8 text-center">
                <h3 className="mb-6 text-xl font-bold">
                  {t(`${tierPrefix}.webinarHeading`)}
                </h3>

                <div className="mb-8 flex min-h-[200px] items-center justify-center rounded-xl border border-border bg-muted/30 p-6">
                  {/* Replace placeholder with real webinar registration embed per language.
                      The selected lang is: {lang}
                      Embed code can differ per language. */}
                  <p className="text-sm text-muted-foreground">
                    {t(`${tierPrefix}.webinarPlaceholder`)}
                  </p>
                </div>

                <Button asChild size="lg">
                  <a
                    href={links[lang]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`${tierPrefix}.joinWebinar`)}
                  </a>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component — routing logic                           */
/* ------------------------------------------------------------------ */
export default function WebinarBooking({ tier }: { tier?: 'setup' | 'lite' | 'full' }) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const mode = searchParams.get('mode');
  const hasAccess = token === 'success' || mode === 'open';

  if (!hasAccess) {
    return <AccessRequired />;
  }

  // Per-tier pages
  if (tier === 'setup') return <SetupPage />;
  if (tier === 'lite') return <WebinarPage tier="lite" />;
  if (tier === 'full') return <WebinarPage tier="full" />;

  // Hub fallback — show tier selector
  return <HubPage />;
}
