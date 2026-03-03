import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  drawVariants,
  pulseVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

/* Regular hexagon centered at (24,24) with r=16 */
const hexR = 16;
const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return `${24 + hexR * Math.cos(angle)},${24 + hexR * Math.sin(angle)}`;
}).join(' ');

export function ComparisonRealizeIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="RealizeOS hexagon icon with checkmark"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Hexagon — scales from 0.8 to 1 */}
      <motion.polygon
        points={hexPoints}
        fill="rgba(255,204,0,0.08)"
        stroke="#ffcc00"
        strokeWidth={1}
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
          },
        }}
        style={{ transformOrigin: '24px 24px' }}
      />

      {/* Checkmark — draws via pathLength */}
      <motion.path
        d="M17 24l4 4 10-10"
        stroke="#ffcc00"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        variants={drawVariants}
      />

      {/* 4-pointed sparkle at (38,8) — pulses */}
      <motion.path
        d="M38 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"
        fill="#ffcc00"
        variants={fadeInChild}
      />
      <motion.path
        d="M38 4l1 3 3 1-3 1-1 3-1-3-3-1 3-1z"
        fill="#ffcc00"
        variants={pulseVariants}
        animate="animate"
      />
    </motion.svg>
  );
}
