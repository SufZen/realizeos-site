import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getSlides } from '@/data/presentationSlides';
import { SlideRenderer } from '@/components/presentation/SlideRenderer';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

const slideTransition = {
  duration: 0.35,
  ease: 'easeInOut' as const,
};

export default function WebinarPresentation() {
  const { t } = useTranslation();
  const slides = useMemo(() => getSlides(), []);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  const isRTL = document.documentElement.dir === 'rtl';
  const total = slides.length;

  const goNext = useCallback(() => {
    if (current < total - 1) {
      setDirection(isRTL ? -1 : 1);
      setCurrent((s) => s + 1);
    }
  }, [current, total, isRTL]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(isRTL ? 1 : -1);
      setCurrent((s) => s - 1);
    }
  }, [current, isRTL]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'n' || e.key === 'N') {
        setShowNotes((n) => !n);
      }
      if (e.key === 'Escape') {
        setShowNotes(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Touch swipe support
  useEffect(() => {
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [goNext, goPrev]);

  const slide = slides[current];
  const progress = total > 1 ? (current / (total - 1)) * 100 : 0;

  return (
    <div className="relative h-screen w-screen select-none overflow-hidden bg-background">
      {/* Progress bar */}
      <div className="absolute inset-x-0 top-0 z-30 h-0.5 bg-muted">
        <div
          className="h-full bg-brand-yellow transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top controls */}
      <div className="absolute end-4 top-4 z-30 flex items-center gap-3">
        <LanguageSwitcher />
        <a
          href="/"
          className="rounded-md px-3 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          {t('webinar.presentation.exitPresentation')}
        </a>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          className="h-full w-full py-12"
        >
          <SlideRenderer slide={slide} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        disabled={current === 0}
        className="absolute start-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-20"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        onClick={goNext}
        disabled={current === total - 1}
        className="absolute end-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-20"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Slide counter */}
      <div className="absolute bottom-4 end-4 z-30 font-mono text-xs text-muted-foreground">
        {t('webinar.presentation.progress', { current: current + 1, total })}
      </div>

      {/* Block indicator */}
      <div className="absolute bottom-4 start-4 z-30 text-xs text-muted-foreground/50">
        {slide.block}
      </div>

      {/* Speaker notes panel */}
      <AnimatePresence>
        {showNotes && slide.speakerNotes && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.2 }}
            className="glass absolute inset-x-0 bottom-0 z-40 max-h-[30vh] overflow-auto border-t border-border p-4"
          >
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-brand-yellow/60">
              Speaker Notes
            </p>
            <p className="font-mono text-sm text-muted-foreground">{slide.speakerNotes}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
