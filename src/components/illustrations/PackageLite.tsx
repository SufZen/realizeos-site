import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  floatSlowVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

export function PackageLite({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Lite package icon with folder and documents"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Folder — back panel */}
      <motion.path
        d="M16 32h48v28a2 2 0 01-2 2H18a2 2 0 01-2-2V32z"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        fill="rgba(255,255,255,0.03)"
        variants={fadeInChild}
      />
      {/* Folder — tab */}
      <motion.path
        d="M16 32V26a2 2 0 012-2h12l4 4h28v4H16z"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        fill="rgba(255,255,255,0.03)"
        variants={fadeInChild}
      />
      {/* Folder gentle float */}
      <motion.g variants={floatSlowVariants} animate="animate">
        {/* Folder front panel (open) */}
        <path
          d="M14 38h52a2 2 0 012 2v18a2 2 0 01-2 2H14a2 2 0 01-2-2V40a2 2 0 012-2z"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
        />
      </motion.g>

      {/* Documents fanning out — stagger float upward */}
      <motion.rect
        x={28}
        y={14}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(-8 33 21)"
      />
      <motion.rect
        x={35}
        y={12}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
      />
      <motion.rect
        x={42}
        y={14}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(8 47 21)"
      />

      {/* "Lite" tag at bottom corner */}
      <motion.rect
        x={52}
        y={56}
        width={14}
        height={8}
        rx={2}
        fill="rgba(255,204,0,0.15)"
        stroke="#ffcc00"
        strokeWidth={1}
        variants={fadeInChild}
      />
      <motion.text
        x={59}
        y={61.5}
        fill="#ffcc00"
        fontSize={5}
        fontWeight={600}
        textAnchor="middle"
        dominantBaseline="central"
        variants={fadeInChild}
      >
        Lite
      </motion.text>
    </motion.svg>
  );
}
