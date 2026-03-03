import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function UseCaseSaaS({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="SaaS application window with launching rocket"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- App window ---- */}
      <motion.g variants={fadeInChild}>
        <rect
          x={10} y={18} width={34} height={34} rx={3}
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
        />
        {/* Title bar dot */}
        <circle cx={16} cy={24} r={1.5} fill="#9a9ab0" opacity={0.4} />
        {/* Window content lines */}
        <line x1={16} y1={32} x2={38} y2={32} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <line x1={16} y1={37} x2={34} y2={37} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
        <line x1={16} y1={42} x2={30} y2={42} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
      </motion.g>

      {/* ---- Trail dots (behind rocket) ---- */}
      <motion.circle
        cx={42}
        cy={22}
        r={1.5}
        fill="rgba(255,204,0,0.15)"
        animate={{ opacity: [0.15, 0.05, 0.15] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.circle
        cx={39}
        cy={25}
        r={1.2}
        fill="rgba(255,204,0,0.1)"
        animate={{ opacity: [0.1, 0.03, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.3 }}
      />
      <motion.circle
        cx={36}
        cy={27}
        r={1}
        fill="rgba(255,204,0,0.08)"
        animate={{ opacity: [0.08, 0.02, 0.08] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.6 }}
      />

      {/* ---- Rocket ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 1.5, 0], y: [0, -1.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="translate(46,12) rotate(-45, 4, 6)">
          {/* Rocket body (triangle) */}
          <path
            d="M4 0 L8 10 L0 10 Z"
            stroke="rgba(255,204,0,0.3)"
            strokeWidth={1}
            strokeLinejoin="round"
            fill="rgba(255,204,0,0.05)"
          />
          {/* Left fin */}
          <path
            d="M0 10 L-2 14 L2 12 Z"
            stroke="rgba(255,204,0,0.25)"
            strokeWidth={0.8}
            fill="rgba(255,204,0,0.05)"
          />
          {/* Right fin */}
          <path
            d="M8 10 L10 14 L6 12 Z"
            stroke="rgba(255,204,0,0.25)"
            strokeWidth={0.8}
            fill="rgba(255,204,0,0.05)"
          />
          {/* Flame */}
          <path
            d="M2 12 L4 18 L6 12"
            fill="#ffcc00"
            opacity={0.7}
          />
          {/* Window on rocket */}
          <circle cx={4} cy={5} r={1.5} stroke="rgba(255,204,0,0.4)" strokeWidth={0.6} fill="none" />
        </g>
      </motion.g>
    </motion.svg>
  );
}
