import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function UseCaseAgency({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Agency workflow from rough text to polished document"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Left: rough text block ---- */}
      <motion.g variants={fadeInChild}>
        <rect
          x={6} y={24} width={14} height={20} rx={2}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
        />
        {/* Tiny lines inside */}
        <line x1={9} y1={29} x2={17} y2={29} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
        <line x1={9} y1={33} x2={16} y2={33} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
        <line x1={9} y1={37} x2={14} y2={37} stroke="rgba(255,255,255,0.1)" strokeWidth={0.8} />
      </motion.g>

      {/* ---- Flow arrows ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <line
          x1={21} y1={34} x2={24} y2={34}
          stroke="rgba(255,204,0,0.15)"
          strokeWidth={1}
        />
        <line
          x1={40} y1={34} x2={43} y2={34}
          stroke="rgba(255,204,0,0.15)"
          strokeWidth={1}
        />
      </motion.g>

      {/* ---- Center: funnel shape ---- */}
      <motion.g variants={fadeInChild}>
        <path
          d="M24 24 L40 28 L40 40 L24 44 Z"
          stroke="rgba(255,204,0,0.3)"
          strokeWidth={1}
          strokeLinejoin="round"
          fill="rgba(255,204,0,0.03)"
        />
        {/* Funnel inner lines */}
        <line x1={28} y1={30} x2={36} y2={31} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
        <line x1={29} y1={34} x2={35} y2={34} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
        <line x1={28} y1={38} x2={36} y2={37} stroke="rgba(255,204,0,0.15)" strokeWidth={0.5} />
      </motion.g>

      {/* ---- Right: polished document ---- */}
      <motion.g variants={fadeInChild}>
        <rect
          x={44} y={22} width={14} height={24} rx={2}
          stroke="#ffcc00"
          strokeWidth={1.5}
          fill="rgba(255,204,0,0.03)"
        />
        {/* Text lines inside */}
        <line x1={47} y1={28} x2={55} y2={28} stroke="rgba(255,204,0,0.2)" strokeWidth={0.8} />
        <line x1={47} y1={32} x2={54} y2={32} stroke="rgba(255,204,0,0.2)" strokeWidth={0.8} />
        <line x1={47} y1={36} x2={52} y2={36} stroke="rgba(255,204,0,0.2)" strokeWidth={0.8} />
        {/* Quality star badge at top-right */}
        <path
          d="M56 20 l1.2 2.4 2.6 0.4 -1.9 1.8 0.4 2.6 -2.3-1.2 -2.3 1.2 0.4-2.6 -1.9-1.8 2.6-0.4z"
          fill="#ffcc00"
          opacity={0.8}
        />
      </motion.g>
    </motion.svg>
  );
}
