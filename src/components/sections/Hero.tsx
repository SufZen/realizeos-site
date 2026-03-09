import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { STRIPE_URLS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { LINKS } from '@/lib/constants';
import { HeroAgentNetwork } from '@/components/illustrations/HeroAgentNetwork';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stats = [
  { value: 92, suffix: '', label: 'files' },
  { value: 8800, suffix: '+', label: 'lines of code' },
  { value: 13, suffix: '', label: 'Google tools' },
];

export function Hero() {
  const [githubStars, setGithubStars] = useState<number | null>(null);

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
          className="lg:flex-1 lg:text-left text-center"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUp}>
            <Badge variant="secondary" className="mb-6 text-xs font-medium">
              Part of the Realization ecosystem
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          >
            The Operational Engine
            <br />
            <span className="text-gradient-yellow text-glow-yellow">For The Visionary</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg lg:mx-0"
          >
            Stop being the bottleneck in your own business. Reclaim your time and translate abstract vision into physical reality with a coordinated AI team that actually understands your methodology.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button asChild size="lg" onClick={() => trackEvent('cta_click', { cta_name: 'hero-cta-full' })}>
              <a href={STRIPE_URLS.full}>Get RealizeOS — $249</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#fabric">See How It Works</a>
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
                GitHub stars
              </div>
            )}
          </motion.div>
        </motion.div>

        <HeroAgentNetwork className="mx-auto mt-10 w-full max-w-[400px] lg:mt-0 lg:flex-1 illustration-glow" />
      </div>
    </header>
  );
}
