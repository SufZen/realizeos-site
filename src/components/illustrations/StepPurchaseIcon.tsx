import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function StepPurchaseIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Credit card icon representing picking your edition"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Credit card body */}
      <motion.rect
        x={12}
        y={18}
        width={40}
        height={28}
        rx={3}
        fill="rgba(255,255,255,0.03)"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        variants={fadeInChild}
      />

      {/* Chip */}
      <motion.rect
        x={18}
        y={26}
        width={8}
        height={6}
        rx={1}
        fill="#ffcc00"
        variants={fadeInChild}
      />

      {/* Stripe line */}
      <motion.line
        x1={12}
        y1={36}
        x2={52}
        y2={36}
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Sparkle — 4-pointed star at (48,14) */}
      <motion.path
        d="M48 10 L49 13 L52 14 L49 15 L48 18 L47 15 L44 14 L47 13 Z"
        fill="#ffcc00"
        variants={fadeInChild}
        animate={{
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
        style={{ transformOrigin: '48px 14px' }}
      />
    </motion.svg>
  );
}
