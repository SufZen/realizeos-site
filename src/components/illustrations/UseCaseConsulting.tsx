import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function UseCaseConsulting({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Consulting clipboard with lightbulb idea"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Clipboard ---- */}
      <motion.g variants={fadeInChild}>
        {/* Board */}
        <rect
          x={16} y={12} width={32} height={44} rx={3}
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
        />
        {/* Clip at top */}
        <rect
          x={24} y={8} width={16} height={8} rx={2}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.05)"
        />
        {/* Lines inside clipboard */}
        <line x1={22} y1={24} x2={42} y2={24} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={22} y1={32} x2={42} y2={32} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <line x1={22} y1={40} x2={36} y2={40} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      </motion.g>

      {/* ---- Lightbulb ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        {/* Bulb outline */}
        <path
          d="M44 10 C44 6, 50 6, 50 10 C50 12.5, 48 13.5, 48 15 L46 15 C46 13.5, 44 12.5, 44 10z"
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Base */}
        <line x1={45.5} y1={15.5} x2={48.5} y2={15.5} stroke="#ffcc00" strokeWidth={1} strokeLinecap="round" />
        <line x1={45.5} y1={17} x2={48.5} y2={17} stroke="#ffcc00" strokeWidth={1} strokeLinecap="round" />
        {/* Rays */}
        <line x1={47} y1={4} x2={47} y2={2} stroke="#ffcc00" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={52} y1={7} x2={53.5} y2={5.5} stroke="#ffcc00" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={42} y1={7} x2={40.5} y2={5.5} stroke="#ffcc00" strokeWidth={0.8} strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  );
}
