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

export function TierFull({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Full tier server engine icon"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Server/engine shape — pulses gently */}
      <motion.g variants={fadeInChild}>
        <motion.rect
          x={14}
          y={16}
          width={36}
          height={32}
          rx={4}
          fill="rgba(255,204,0,0.08)"
          stroke="#ffcc00"
          strokeWidth={1.5}
          variants={pulseVariants}
          animate="animate"
        />
      </motion.g>

      {/* 3 horizontal slot lines inside */}
      <motion.line
        x1={20}
        y1={26}
        x2={44}
        y2={26}
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
      />
      <motion.line
        x1={20}
        y1={32}
        x2={44}
        y2={32}
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
      />
      <motion.line
        x1={20}
        y1={38}
        x2={44}
        y2={38}
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* 3 outgoing rays — draw in via pathLength */}
      {/* Ray right-up */}
      <motion.path
        d="M50 24l8-8"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        pathLength={1}
        variants={drawVariants}
      />
      <motion.path
        d="M56 16l2 0 0 2"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        variants={drawVariants}
      />

      {/* Ray right */}
      <motion.path
        d="M50 32l10 0"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        pathLength={1}
        variants={drawVariants}
      />
      <motion.path
        d="M58 30l2 2-2 2"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        variants={drawVariants}
      />

      {/* Ray right-down */}
      <motion.path
        d="M50 40l8 8"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        pathLength={1}
        variants={drawVariants}
      />
      <motion.path
        d="M58 46l0 2-2 0"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        variants={drawVariants}
      />
    </motion.svg>
  );
}
