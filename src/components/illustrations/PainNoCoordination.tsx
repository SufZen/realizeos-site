import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function PainNoCoordination({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Three figures unable to coordinate with broken communication"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Broken communication arrows ---- */}
      {/* Left to center */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <line
          x1={22} y1={38} x2={28} y2={38}
          stroke="rgba(255,100,100,0.2)"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        {/* X mark at break */}
        <line x1={29} y1={36} x2={31} y2={40} stroke="rgba(255,100,100,0.3)" strokeWidth={0.8} />
        <line x1={31} y1={36} x2={29} y2={40} stroke="rgba(255,100,100,0.3)" strokeWidth={0.8} />
        <line
          x1={32} y1={38} x2={34} y2={38}
          stroke="rgba(255,100,100,0.2)"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
      </motion.g>

      {/* Center to right */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
      >
        <line
          x1={46} y1={38} x2={52} y2={38}
          stroke="rgba(255,100,100,0.2)"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        {/* X mark at break */}
        <line x1={53} y1={36} x2={55} y2={40} stroke="rgba(255,100,100,0.3)" strokeWidth={0.8} />
        <line x1={55} y1={36} x2={53} y2={40} stroke="rgba(255,100,100,0.3)" strokeWidth={0.8} />
        <line
          x1={56} y1={38} x2={58} y2={38}
          stroke="rgba(255,100,100,0.2)"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
      </motion.g>

      {/* ---- Left figure (facing left) ---- */}
      <motion.g variants={fadeInChild}>
        <g stroke="#9a9ab0" strokeWidth={1.5} strokeLinecap="round" fill="none">
          {/* Head */}
          <circle cx={16} cy={30} r={5} />
          {/* Body */}
          <line x1={16} y1={35} x2={16} y2={50} />
          {/* Arms extended left */}
          <line x1={16} y1={40} x2={8} y2={36} />
          <line x1={16} y1={40} x2={8} y2={44} />
          {/* Legs */}
          <line x1={16} y1={50} x2={12} y2={58} />
          <line x1={16} y1={50} x2={20} y2={58} />
        </g>
      </motion.g>

      {/* ---- Center figure (arms both sides, stressed) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ x: [-0.5, 0.5, -0.5] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <g stroke="#b0b0c0" strokeWidth={1.5} strokeLinecap="round" fill="none">
          {/* Head */}
          <circle cx={40} cy={30} r={5} />
          {/* Body */}
          <line x1={40} y1={35} x2={40} y2={50} />
          {/* Arms extended both sides */}
          <line x1={40} y1={40} x2={32} y2={36} />
          <line x1={40} y1={40} x2={48} y2={36} />
          {/* Legs */}
          <line x1={40} y1={50} x2={36} y2={58} />
          <line x1={40} y1={50} x2={44} y2={58} />
        </g>
        {/* Stress marks */}
        <line x1={36} y1={24} x2={34} y2={22} stroke="#b0b0c0" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={44} y1={24} x2={46} y2={22} stroke="#b0b0c0" strokeWidth={0.8} strokeLinecap="round" />
      </motion.g>

      {/* ---- Right figure (facing right) ---- */}
      <motion.g variants={fadeInChild}>
        <g stroke="#9a9ab0" strokeWidth={1.5} strokeLinecap="round" fill="none">
          {/* Head */}
          <circle cx={64} cy={30} r={5} />
          {/* Body */}
          <line x1={64} y1={35} x2={64} y2={50} />
          {/* Arms extended right */}
          <line x1={64} y1={40} x2={72} y2={36} />
          <line x1={64} y1={40} x2={72} y2={44} />
          {/* Legs */}
          <line x1={64} y1={50} x2={60} y2={58} />
          <line x1={64} y1={50} x2={68} y2={58} />
        </g>
      </motion.g>
    </motion.svg>
  );
}
