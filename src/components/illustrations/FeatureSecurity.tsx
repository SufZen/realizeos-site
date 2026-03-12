import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function FeatureSecurity({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Shield with lock representing enterprise security"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Shield shape */}
      <motion.path
        d="M40 10 L62 22 L62 44 Q62 60 40 70 Q18 60 18 44 L18 22 Z"
        fill="rgba(255,204,0,0.06)"
        stroke="rgba(255,204,0,0.3)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        variants={fadeInChild}
      />

      {/* Inner shield highlight */}
      <motion.path
        d="M40 18 L56 27 L56 43 Q56 55 40 63 Q24 55 24 43 L24 27 Z"
        fill="rgba(255,204,0,0.04)"
        stroke="rgba(255,204,0,0.15)"
        strokeWidth={0.75}
        strokeLinejoin="round"
        variants={fadeInChild}
      />

      {/* Lock body */}
      <motion.rect
        x={34}
        y={38}
        width={12}
        height={10}
        rx={2}
        fill="rgba(255,204,0,0.15)"
        stroke="rgba(255,204,0,0.5)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Lock shackle */}
      <motion.path
        d="M36 38 L36 33 Q36 28 40 28 Q44 28 44 33 L44 38"
        fill="none"
        stroke="rgba(255,204,0,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' as const },
          },
        }}
      />

      {/* Keyhole dot */}
      <motion.circle
        cx={40}
        cy={43}
        r={1.5}
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
