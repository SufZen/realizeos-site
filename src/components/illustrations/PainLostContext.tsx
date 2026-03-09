import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

/* Particles that leak from the brain */
const particles = [
  { cx: 44, cy: 28, r: 2, delay: 0 },
  { cx: 50, cy: 36, r: 1.5, delay: 0.6 },
  { cx: 46, cy: 44, r: 2.5, delay: 1.2 },
  { cx: 52, cy: 22, r: 1.8, delay: 1.8 },
  { cx: 48, cy: 50, r: 2, delay: 2.4 },
  { cx: 42, cy: 32, r: 1.5, delay: 3 },
] as const;

export function PainLostContext({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Brain losing context and data over time"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Brain outline ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
        style={{ transformOrigin: '30px 35px' }}
      >
        {/* Left hemisphere — smooth curve */}
        <path
          d="M30 14
             C18 14, 10 22, 10 32
             C10 42, 16 52, 24 56
             C28 58, 30 56, 30 54"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
        {/* Right hemisphere — bumpy cortex folds with a gap/leak */}
        <path
          d="M30 14
             C36 14, 42 16, 46 20
             C48 22, 49 26, 48 30"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
        {/* Gap here — the leak opening (no stroke from ~30 to ~38 on right) */}
        <path
          d="M46 38
             C47 42, 44 48, 40 52
             C36 56, 32 56, 30 54"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
        />
        {/* Cortex fold details */}
        <path
          d="M30 20 C34 20, 38 22, 40 26"
          stroke="#9a9ab0"
          strokeWidth={0.8}
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
        <path
          d="M30 30 C34 30, 36 34, 34 38"
          stroke="#9a9ab0"
          strokeWidth={0.8}
          strokeLinecap="round"
          fill="none"
          opacity={0.5}
        />
        {/* Center dividing line */}
        <line
          x1={30} y1={16} x2={30} y2={52}
          stroke="#9a9ab0"
          strokeWidth={0.6}
          opacity={0.3}
        />
      </motion.g>

      {/* ---- Leaking data particles ---- */}
      {particles.map((p, i) => (
        <motion.circle
          key={`particle-${i}`}
          r={p.r}
          fill="rgba(255,204,0,0.25)"
          animate={{
            cx: [p.cx, p.cx + 15, p.cx + 28],
            cy: [p.cy, p.cy + (i % 2 === 0 ? -3 : 3), p.cy + (i % 2 === 0 ? -5 : 5)],
            opacity: [0.4, 0.25, 0],
          }}
          transition={{
            duration: 3 + (i % 3) * 0.4,
            repeat: Infinity,
            ease: 'easeOut' as const,
            delay: p.delay,
          }}
        />
      ))}

      {/* ---- Clock icon (top right) ---- */}
      <motion.g variants={fadeInChild}>
        <circle cx={64} cy={14} r={6} stroke="#9a9ab0" strokeWidth={1} fill="none" />
        <line
          x1={64} y1={14} x2={64} y2={10.5}
          stroke="#9a9ab0"
          strokeWidth={0.8}
          strokeLinecap="round"
        />
        <line
          x1={64} y1={14} x2={67} y2={14}
          stroke="#9a9ab0"
          strokeWidth={0.8}
          strokeLinecap="round"
        />
        {/* Small tick marks */}
        <line x1={64} y1={8.5} x2={64} y2={9} stroke="#9a9ab0" strokeWidth={0.5} />
        <line x1={69.5} y1={14} x2={69} y2={14} stroke="#9a9ab0" strokeWidth={0.5} />
      </motion.g>
    </motion.svg>
  );
}
