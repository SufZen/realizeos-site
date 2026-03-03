import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function UseCaseMultiVenture({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Venn diagram representing multiple ventures overlapping"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Intersection highlight (behind circles) ---- */}
      <motion.circle
        cx={32}
        cy={33}
        r={5}
        fill="rgba(255,204,0,0.08)"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      {/* ---- Top circle ---- */}
      <motion.circle
        cx={32}
        cy={22}
        r={14}
        stroke="#9a9ab0"
        strokeWidth={1}
        fill="rgba(255,255,255,0.02)"
        variants={fadeInChild}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        style={{ transformOrigin: '32px 22px' }}
      />

      {/* ---- Bottom-left circle ---- */}
      <motion.circle
        cx={22}
        cy={38}
        r={14}
        stroke="#9a9ab0"
        strokeWidth={1}
        fill="rgba(255,255,255,0.02)"
        variants={fadeInChild}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: 1.6 }}
        style={{ transformOrigin: '22px 38px' }}
      />

      {/* ---- Bottom-right circle ---- */}
      <motion.circle
        cx={42}
        cy={38}
        r={14}
        stroke="#9a9ab0"
        strokeWidth={1}
        fill="rgba(255,255,255,0.02)"
        variants={fadeInChild}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const, delay: 3.2 }}
        style={{ transformOrigin: '42px 38px' }}
      />

      {/* ---- Icons inside circles ---- */}

      {/* Top circle: building */}
      <motion.g variants={fadeInChild}>
        <rect x={29} y={14} width={6} height={9} rx={0.5} stroke="#ffcc00" strokeWidth={1} fill="none" />
        <line x1={31} y1={16} x2={31} y2={17} stroke="#ffcc00" strokeWidth={0.6} />
        <line x1={33} y1={16} x2={33} y2={17} stroke="#ffcc00" strokeWidth={0.6} />
        <line x1={31} y1={19} x2={31} y2={20} stroke="#ffcc00" strokeWidth={0.6} />
        <line x1={33} y1={19} x2={33} y2={20} stroke="#ffcc00" strokeWidth={0.6} />
      </motion.g>

      {/* Bottom-left circle: code brackets */}
      <motion.g variants={fadeInChild}>
        <path d="M18 35 L15 38 L18 41" stroke="#ffcc00" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M24 35 L27 38 L24 41" stroke="#ffcc00" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      {/* Bottom-right circle: shopping bag */}
      <motion.g variants={fadeInChild}>
        <rect x={39} y={35} width={6} height={7} rx={1} stroke="#ffcc00" strokeWidth={1} fill="none" />
        <path d="M40.5 35 L40.5 33.5 C40.5 32, 43.5 32, 43.5 33.5 L43.5 35" stroke="#ffcc00" strokeWidth={0.8} fill="none" />
      </motion.g>
    </motion.svg>
  );
}
