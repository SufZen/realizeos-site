import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function ComparisonToolsIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Scattered app windows icon"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* App window 1 — top-left */}
      <motion.g variants={fadeInChild} transform="rotate(-5 8 8)">
        <rect
          x={4}
          y={4}
          width={14}
          height={10}
          rx={1.5}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx={7} cy={6.5} r={0.8} fill="#9a9ab0" />
      </motion.g>

      {/* App window 2 — top-right */}
      <motion.g variants={fadeInChild} transform="rotate(3 28 6)">
        <rect
          x={24}
          y={2}
          width={14}
          height={10}
          rx={1.5}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx={27} cy={4.5} r={0.8} fill="#9a9ab0" />
      </motion.g>

      {/* App window 3 — bottom-left */}
      <motion.g variants={fadeInChild} transform="rotate(4 10 28)">
        <rect
          x={6}
          y={24}
          width={14}
          height={10}
          rx={1.5}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx={9} cy={26.5} r={0.8} fill="#9a9ab0" />
      </motion.g>

      {/* App window 4 — bottom-right */}
      <motion.g variants={fadeInChild} transform="rotate(-3 30 26)">
        <rect
          x={26}
          y={22}
          width={14}
          height={10}
          rx={1.5}
          stroke="#9a9ab0"
          strokeWidth={1}
          fill="rgba(255,255,255,0.03)"
        />
        <circle cx={29} cy={24.5} r={0.8} fill="#9a9ab0" />
      </motion.g>
    </motion.svg>
  );
}
