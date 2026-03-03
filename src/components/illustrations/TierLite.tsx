import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  floatSlowVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

export function TierLite({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Lite tier document icon"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Document — gentle float */}
      <motion.g variants={fadeInChild}>
        <motion.g variants={floatSlowVariants} animate="animate">
          {/* Document rect */}
          <rect
            x={16}
            y={8}
            width={32}
            height={48}
            rx={4}
            stroke="#9a9ab0"
            strokeWidth={1.5}
            fill="rgba(255,255,255,0.03)"
          />

          {/* Small grid inside (2 columns x 3 rows of 6x6 squares) */}
          {/* Row 1 */}
          <rect x={22} y={16} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
          <rect x={32} y={16} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
          {/* Row 2 */}
          <rect x={22} y={26} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
          <rect x={32} y={26} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
          {/* Row 3 */}
          <rect x={22} y={36} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
          <rect x={32} y={36} width={6} height={6} rx={1} fill="rgba(255,204,0,0.15)" />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
