import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  floatVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

export function TierSetup({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Setup assistance handshake icon"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Small wrench floating above — gentle float */}
      <motion.g variants={fadeInChild}>
        <motion.g variants={floatVariants} animate="animate">
          <path
            d="M34 6a5 5 0 00-4 8l-2 2 3 3 2-2a5 5 0 008-4 5 5 0 00-5-5l-1 3 2 2-2 2-2-2 3-1a3 3 0 01-2-6z"
            stroke="#ffcc00"
            strokeWidth={1.5}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </motion.g>
      </motion.g>

      {/* Handshake — two L-shapes interlocking */}
      <motion.g variants={fadeInChild}>
        {/* Left hand */}
        <path
          d="M10 36h10l6-6 4 4-4 4h-2l-2 2v6H10z"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Right hand */}
        <path
          d="M54 36H44l-6-6-4 4 4 4h2l2 2v6H54z"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Central grip */}
        <path
          d="M28 34l4-4 4 4"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}
