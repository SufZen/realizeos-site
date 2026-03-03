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
      aria-label="Fragmented tools scattered without connection"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Broken dashed lines between rects ---- */}
      <motion.line
        x1={24} y1={18} x2={48} y2={14}
        stroke="rgba(255,100,100,0.2)"
        strokeWidth={1}
        strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.line
        x1={17} y1={24} x2={20} y2={48}
        stroke="rgba(255,100,100,0.2)"
        strokeWidth={1}
        strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.7 }}
      />
      <motion.line
        x1={62} y1={20} x2={58} y2={50}
        stroke="rgba(255,100,100,0.2)"
        strokeWidth={1}
        strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 1.4 }}
      />
      <motion.line
        x1={28} y1={54} x2={52} y2={56}
        stroke="rgba(255,100,100,0.2)"
        strokeWidth={1}
        strokeDasharray="2 3"
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 2.1 }}
      />

      {/* ---- Rect 1: Chat bubble (top-left) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 1, -0.5, 0], y: [0, -0.5, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="translate(10,12) rotate(-8, 7, 6)">
          <rect
            width={14}
            height={12}
            rx={2}
            stroke="#9a9ab0"
            strokeWidth={1}
            fill="rgba(255,255,255,0.03)"
          />
          {/* Chat bubble icon */}
          <path
            d="M3 3.5h8M3 6h5M3 8.5h3l1.5 2 0-2h0.5"
            stroke="#9a9ab0"
            strokeWidth={0.6}
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </motion.g>

      {/* ---- Rect 2: Envelope (top-right) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, -0.8, 0.5, 0], y: [0, 0.8, -0.3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="translate(48,8) rotate(5, 7, 6)">
          <rect
            width={14}
            height={12}
            rx={2}
            stroke="#9a9ab0"
            strokeWidth={1}
            fill="rgba(255,255,255,0.03)"
          />
          {/* Envelope lines */}
          <path
            d="M2 3l5 3.5 5-3.5M2 9.5l3.5-2.5M12 9.5l-3.5-2.5"
            stroke="#9a9ab0"
            strokeWidth={0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </motion.g>

      {/* ---- Rect 3: Search (bottom-left) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, 0.6, -1, 0], y: [0, -1, 0.3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="translate(14,48) rotate(3, 7, 6)">
          <rect
            width={14}
            height={12}
            rx={2}
            stroke="#9a9ab0"
            strokeWidth={1}
            fill="rgba(255,255,255,0.03)"
          />
          {/* Search icon */}
          <circle cx={6} cy={5.5} r={2.5} stroke="#9a9ab0" strokeWidth={0.6} fill="none" />
          <line
            x1={8}
            y1={7.5}
            x2={10.5}
            y2={10}
            stroke="#9a9ab0"
            strokeWidth={0.6}
            strokeLinecap="round"
          />
        </g>
      </motion.g>

      {/* ---- Rect 4: Pencil (bottom-right) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [0, -0.5, 0.8, 0], y: [0, 0.5, -0.8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g transform="translate(52,50) rotate(-6, 7, 6)">
          <rect
            width={14}
            height={12}
            rx={2}
            stroke="#9a9ab0"
            strokeWidth={1}
            fill="rgba(255,255,255,0.03)"
          />
          {/* Pencil line */}
          <path
            d="M4 9l5-5.5 1.5 1.5-5 5.5zM9 3.5l1.5-1 1 1-1.5 1"
            stroke="#9a9ab0"
            strokeWidth={0.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </motion.g>
    </motion.svg>
  );
}
