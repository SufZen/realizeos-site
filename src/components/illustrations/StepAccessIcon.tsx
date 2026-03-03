import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function StepAccessIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Envelope with document icon representing instant access"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Envelope body */}
      <motion.path
        d="M10 22 L10 48 L54 48 L54 22 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        strokeLinejoin="round"
        variants={fadeInChild}
      />

      {/* Envelope flap */}
      <motion.path
        d="M10 22 L32 10 L54 22"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
        variants={fadeInChild}
      />

      {/* Document sliding up */}
      <motion.rect
        x={22}
        y={16}
        width={20}
        height={20}
        rx={2}
        fill="rgba(255,204,0,0.1)"
        stroke="#ffcc00"
        strokeWidth={1}
        variants={fadeInChild}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Lightning bolt */}
      <motion.path
        d="M49 12 L46 17 L49 17 L47 22 L52 16 L49 16 Z"
        fill="#ffcc00"
        variants={fadeInChild}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />
    </motion.svg>
  );
}
