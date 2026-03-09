import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

/* Blueprint section fragments that drift away */
const fragments = [
  { x: 8, y: 10, w: 28, h: 24, delay: 0 },
  { x: 44, y: 8, w: 26, h: 20, delay: 0.6 },
  { x: 6, y: 44, w: 24, h: 26, delay: 1.2 },
] as const;

export function PainLostContext({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Disconnected blueprint sections with fading detail lines"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Blueprint grid */}
      <motion.g variants={fadeInChild} opacity={0.04}>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`g-${i}`} x1={10 * (i + 1)} y1={0} x2={10 * (i + 1)} y2={80} stroke="#ffcc00" strokeWidth={0.3} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h-${i}`} x1={0} y1={10 * (i + 1)} x2={80} y2={10 * (i + 1)} stroke="#ffcc00" strokeWidth={0.3} />
        ))}
      </motion.g>

      {/* Section 1 — technical drawing fragment, top-left */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, -1, 0.5, 0], y: [0, 0.5, -1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={fragments[0].x} y={fragments[0].y} width={fragments[0].w} height={fragments[0].h}
          rx={1} stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Internal dimension lines */}
        <line x1={12} y1={14} x2={32} y2={14} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={12} y1={22} x2={26} y2={22} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={12} y1={28} x2={20} y2={28} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.2} />
        {/* Dimension marker */}
        <line x1={10} y1={12} x2={10} y2={32} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
        <line x1={9} y1={12} x2={11} y2={12} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
        <line x1={9} y1={32} x2={11} y2={32} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
      </motion.g>

      {/* Section 2 — top-right, partial spec sheet */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 0.8, -0.3, 0], y: [0, -0.5, 0.8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={fragments[1].x} y={fragments[1].y} width={fragments[1].w} height={fragments[1].h}
          rx={1} stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Spec lines */}
        <line x1={48} y1={14} x2={66} y2={14} stroke="#9a9ab0" strokeWidth={0.4} opacity={0.3} />
        <line x1={48} y1={18} x2={62} y2={18} stroke="#9a9ab0" strokeWidth={0.4} opacity={0.25} />
        <line x1={48} y1={22} x2={58} y2={22} stroke="#9a9ab0" strokeWidth={0.4} opacity={0.2} />
        {/* Fading out — data being lost */}
        <motion.g
          animate={{ opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
        >
          <rect x={58} y={12} width={8} height={8} rx={1} stroke="rgba(255,204,0,0.2)" strokeWidth={0.5} fill="none" />
        </motion.g>
      </motion.g>

      {/* Section 3 — bottom-left, structural outline fragment */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 0.6, -0.8, 0], y: [0, -0.6, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={fragments[2].x} y={fragments[2].y} width={fragments[2].w} height={fragments[2].h}
          rx={1} stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Internal cross-hatch */}
        <line x1={10} y1={50} x2={26} y2={50} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={18} y1={46} x2={18} y2={66} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        {/* Disappearing detail overlay */}
        <motion.circle
          cx={18} cy={58} r={4}
          stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} fill="none"
          animate={{ opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </motion.g>

      {/* Broken connections between sections */}
      <motion.line
        x1={36} y1={22} x2={44} y2={18}
        stroke="rgba(255,100,100,0.2)" strokeWidth={0.8} strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.line
        x1={24} y1={34} x2={18} y2={44}
        stroke="rgba(255,100,100,0.2)" strokeWidth={0.8} strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
      />

      {/* Clock icon — time runs out (top-right corner) */}
      <motion.g variants={fadeInChild}>
        <circle cx={66} cy={48} r={6} stroke="#9a9ab0" strokeWidth={0.8} fill="none" />
        <line x1={66} y1={48} x2={66} y2={44} stroke="#9a9ab0" strokeWidth={0.7} strokeLinecap="round" />
        <line x1={66} y1={48} x2={69} y2={48} stroke="#9a9ab0" strokeWidth={0.7} strokeLinecap="round" />
        {/* Tick marks */}
        <line x1={66} y1={42.5} x2={66} y2={43} stroke="#9a9ab0" strokeWidth={0.4} />
        <line x1={71.5} y1={48} x2={71} y2={48} stroke="#9a9ab0" strokeWidth={0.4} />
      </motion.g>

      {/* Data particles drifting away from sections */}
      {[
        { cx: 38, cy: 30, delay: 0 },
        { cx: 42, cy: 42, delay: 1 },
        { cx: 50, cy: 38, delay: 2 },
      ].map((p, i) => (
        <motion.rect
          key={`particle-${i}`}
          width={3} height={3} rx={0.5}
          fill="rgba(255,204,0,0.2)"
          animate={{
            x: [p.cx, p.cx + 12, p.cx + 22],
            y: [p.cy, p.cy + (i % 2 === 0 ? -4 : 4), p.cy + (i % 2 === 0 ? -8 : 8)],
            opacity: [0.3, 0.15, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeOut' as const,
            delay: p.delay,
          }}
        />
      ))}
    </motion.svg>
  );
}
