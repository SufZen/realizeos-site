import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { STRIPE_URLS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/constants';
import { HeroAgentNetwork } from '@/components/illustrations/HeroAgentNetwork';
import { useTranslation } from 'react-i18next';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export function Hero() {
  const { t } = useTranslation();
  const [githubStars, setGithubStars] = useState<number | null>(null);

  const stats = [
    { value: 92, suffix: '', label: t('hero.stats.files') },
    { value: 8800, suffix: '+', label: t('hero.stats.lines') },
    { value: 13, suffix: '', label: t('hero.stats.tools') },
  ];

  useEffect(() => {
    fetch(LINKS.githubRepo)
      .then((r) => r.json())
      .then((d) => {
        if (d.stargazers_count) setGithubStars(d.stargazers_count);
      })
      .catch(() => { });
  }, []);

  return (
    <header className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28" id="hero">
      {/* Dot grid background */}
      <div className="dot-grid pointer-events-none absolute inset-0" />
      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-yellow/5 blur-[120px]" />

      <div className="relative mx-auto max-w-site px-5 flex flex-col lg:flex-row lg:items-center lg:gap-12">
        <motion.div
          className="lg:flex-1 text-center lg:text-start"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" className="mb-6 text-xs font-medium">
              {t('hero.badge')}
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            {t('hero.title_main')}
            <br />
            <span className="text-gradient-yellow text-glow-yellow">{t('hero.title_highlight')}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg lg:mx-0"
          >
            {t('hero.description')}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button asChild size="lg" onClick={() => trackEvent('cta_click', { cta_name: 'hero-cta-full' })}>
              <a href={STRIPE_URLS.full}>{t('hero.cta_full')}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#fabric">{t('hero.cta_how')}</a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground md:gap-10 lg:justify-start"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <strong className="text-lg font-semibold text-foreground">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </strong>
                {s.label}
              </div>
            ))}
            {githubStars !== null && (
              <div className="flex items-baseline gap-1.5">
                <strong className="text-lg font-semibold text-foreground">{githubStars}</strong>
                {t('hero.stats.github')}
              </div>
            )}
          </motion.div>
        </motion.div>

        <HeroAgentNetwork className="mx-auto mt-10 w-full max-w-[400px] lg:mt-0 lg:flex-1 illustration-glow" />
      </div>
    </header>
  );
}
