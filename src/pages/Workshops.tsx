import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalendarDays, MapPin, Languages, PlayCircle, CalendarCheck, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LINKS, isWebinarUpcoming, webinarLink } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useLangPrefix } from '@/seo/lang';

/* ============================================================================
 * Past workshops — /workshops (formerly the /bootcamp landing page).
 * An archive, not a sign-up page: no booking links for past dates.
 * ========================================================================== */

export default function Workshops() {
  const { t } = useTranslation();
  const upcoming = isWebinarUpcoming();
  const prefix = useLangPrefix();
  const topics = t('workshops.bootcamp.topics', { returnObjects: true }) as string[];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="mx-auto max-w-3xl px-5">
          <Link to={prefix || '/'} className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand-yellow">
            <ArrowLeft size={14} className="rtl:rotate-180" />
            {t('workshops.back')}
          </Link>

          <p className="mb-3 text-sm font-mono uppercase tracking-widest text-brand-yellow">{t('workshops.eyebrow')}</p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{t('workshops.title')}</h1>
          <p className="mb-12 text-lg text-muted-foreground">{t('workshops.intro')}</p>

          {/* Next session: live webinar until it ends, then the recording */}
          <section className="fx-glass-card mb-10 rounded-2xl p-6 md:p-8">
            <h2 className="mb-2 text-xl font-semibold">
              {upcoming ? t('workshops.next.upcomingTitle') : t('workshops.next.pastTitle')}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {upcoming ? t('workshops.next.upcomingDesc') : t('workshops.next.pastDesc')}
            </p>
            <Button asChild size="lg" onClick={() => trackEvent('cta_click', { cta_name: upcoming ? 'workshops-webinar' : 'workshops-recording' })}>
              <a href={webinarLink()} target="_blank" rel="noopener noreferrer" className="gap-2">
                <PlayCircle size={18} />
                {upcoming ? t('workshops.next.ctaUpcoming') : t('workshops.next.ctaPast')}
              </a>
            </Button>
          </section>

          {/* Archive */}
          <article className="mb-10 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-semibold">{t('workshops.bootcamp.name')}</h2>
              <Badge variant="outline" className="border-border text-muted-foreground">{t('workshops.completed')}</Badge>
            </div>
            <ul className="mb-5 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><CalendarDays size={16} className="text-brand-yellow" />{t('workshops.bootcamp.when')}</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-brand-yellow" />{t('workshops.bootcamp.where')}</li>
              <li className="flex items-center gap-2"><Languages size={16} className="text-brand-yellow" />{t('workshops.bootcamp.lang')}</li>
            </ul>
            <p className="mb-5 text-foreground">{t('workshops.bootcamp.desc')}</p>
            <h3 className="mb-2 text-sm font-semibold">{t('workshops.bootcamp.topicsTitle')}</h3>
            <ol className="list-decimal space-y-1 ps-5 text-sm text-muted-foreground">
              {topics.map((topic) => <li key={topic}>{topic}</li>)}
            </ol>
          </article>

          {/* Offer */}
          <section className="rounded-2xl border border-brand-yellow/30 p-6 text-center md:p-8">
            <h2 className="mb-2 text-xl font-semibold">{t('workshops.audit.title')}</h2>
            <p className="mb-6 text-muted-foreground">{t('workshops.audit.desc')}</p>
            <Button asChild variant="outline" size="lg" onClick={() => trackEvent('cta_click', { cta_name: 'workshops-audit-sprint' })}>
              <a href={LINKS.auditSprint} target="_blank" rel="noopener noreferrer" className="gap-2">
                <CalendarCheck size={18} />
                {t('workshops.audit.cta')}
              </a>
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
