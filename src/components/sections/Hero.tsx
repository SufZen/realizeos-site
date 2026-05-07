import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { trackEvent } from '@/lib/analytics';
import { HeroAgentNetwork } from '@/components/illustrations/HeroAgentNetwork';
import { useTranslation } from 'react-i18next';
import { Github, PlayCircle } from 'lucide-react';

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

  const stats = [
    { value: 20, suffix: '+', label: t('hero.stats.models') },
    { value: 5, suffix: '', label: t('hero.stats.channels') },
    { value: 13, suffix: '', label: t('hero.stats.tools') },
    { value: 4, suffix: '', label: t('hero.stats.strategies') },
  ];

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
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-6">
            <Badge variant="secondary" className="text-xs font-medium bg-secondary/80 hover:bg-secondary transition-colors">
              <a href="https://github.com/SufZen/RealizeOS-5" target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                <Github size={14} />
                {t('hero.github_badge', 'Star us on GitHub')}
              </a>
            </Badge>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-4 text-sm font-medium tracking-wide text-brand-yellow/80 italic md:text-base"
          >
            {t('hero.tagline', 'AI operations you own and control.')}
          </motion.p>

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
            <Button asChild size="lg" onClick={() => trackEvent('cta_click', { cta_name: 'hero-get-started' })}>
              <a href="#quickstart" className="gap-2">
                <PlayCircle size={18} />
                {t('hero.cta_free', 'Get Started (free)')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" onClick={() => trackEvent('cta_click', { cta_name: 'hero-book-setup' })}>
              <a href="https://tidycal.com/sufz/realizeos-setup" target="_blank" rel="noreferrer">
                {t('hero.cta_setup', 'Book Expert Setup')}
              </a>
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
          </motion.div>
        </motion.div>

        <HeroAgentNetwork className="mx-auto mt-10 w-full max-w-[400px] lg:mt-0 lg:flex-1 illustration-glow" />
      </div>
    </header>
  );
}
