import type { Variants, Transition } from 'framer-motion';

// Float animation — subtle Y oscillation
export const floatVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// Slower, gentler float
export const floatSlowVariants: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// Pulse animation — opacity/scale breathing
export const pulseVariants: Variants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
};

// Draw animation — SVG pathLength reveal
export const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeInOut' as const },
  },
};

// Standard draw transition for individual paths
export const drawTransition: Transition = {
  duration: 1.5,
  ease: 'easeInOut' as const,
};

// Staggered children entrance
export function staggerContainer(staggerDelay = 0.1): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay },
    },
  };
}

// Fade in per child
export const fadeInChild: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Orbit/rotation for decorative elements
export function orbitVariants(duration = 20): Variants {
  return {
    animate: {
      rotate: [0, 360],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
  };
}

// Check if user prefers reduced motion
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
