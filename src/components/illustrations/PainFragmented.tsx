import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function PainFragmented({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Fragmented floor plan with disconnected rooms"
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

      {/* Room 1 — top-left, rotated slightly */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, -0.5, 0.3, 0], y: [0, 0.3, -0.5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="rotate(-5, 18, 18)">
          <rect x={6} y={8} width={22} height={18} rx={1}
            stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
          {/* Door gap */}
          <line x1={20} y1={26} x2={26} y2={26} stroke="rgba(255,100,100,0.3)" strokeWidth={1} strokeDasharray="2 2" />
          {/* Inner partition */}
          <line x1={18} y1={8} x2={18} y2={20} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.4} />
        </g>
      </motion.g>

      {/* Room 2 — top-right, rotated opposite */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 0.5, -0.3, 0], y: [0, -0.3, 0.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="rotate(4, 58, 16)">
          <rect x={46} y={6} width={24} height={20} rx={1}
            stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
          <line x1={46} y1={16} x2={54} y2={16} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.4} />
          <line x1={60} y1={6} x2={60} y2={16} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.4} />
        </g>
      </motion.g>

      {/* Room 3 — bottom-left */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 0.4, -0.6, 0], y: [0, -0.4, 0.2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="rotate(3, 20, 56)">
          <rect x={8} y={46} width={20} height={22} rx={1}
            stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
          <line x1={8} y1={56} x2={18} y2={56} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.4} />
        </g>
      </motion.g>

      {/* Room 4 — bottom-right */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, -0.3, 0.5, 0], y: [0, 0.5, -0.3, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="rotate(-3, 58, 58)">
          <rect x={46} y={48} width={24} height={20} rx={1}
            stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
          <line x1={56} y1={48} x2={56} y2={58} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.4} />
        </g>
      </motion.g>

      {/* Broken connections between rooms */}
      {[
        { x1: 28, y1: 20, x2: 46, y2: 16, delay: 0 },
        { x1: 22, y1: 26, x2: 18, y2: 46, delay: 0.7 },
        { x1: 70, y1: 26, x2: 64, y2: 48, delay: 1.4 },
        { x1: 28, y1: 58, x2: 46, y2: 56, delay: 2.1 },
      ].map((l, i) => (
        <motion.line
          key={`break-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(255,100,100,0.2)"
          strokeWidth={0.8}
          strokeDasharray="2 3"
          variants={fadeInChild}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: l.delay }}
        />
      ))}
    </motion.svg>
  );
}
