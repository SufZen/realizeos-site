import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function ComparisonTeamIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Team of people icon"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Small clock behind them */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={38}
          cy={12}
          r={6}
          stroke="var(--rz-border)"
          strokeWidth={1}
          fill="none"
        />
        {/* Clock hands */}
        <line
          x1={38}
          y1={12}
          x2={38}
          y2={8.5}
          stroke="var(--rz-border)"
          strokeWidth={0.8}
          strokeLinecap="round"
        />
        <line
          x1={38}
          y1={12}
          x2={41}
          y2={12}
          stroke="var(--rz-border)"
          strokeWidth={0.8}
          strokeLinecap="round"
        />
      </motion.g>

      {/* Person 1 (left) */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={14}
          cy={16}
          r={4}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
        <ellipse
          cx={14}
          cy={30}
          rx={6}
          ry={8}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
      </motion.g>

      {/* Person 2 (center) */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={24}
          cy={16}
          r={4}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
        <ellipse
          cx={24}
          cy={30}
          rx={6}
          ry={8}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
      </motion.g>

      {/* Person 3 (right) */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={34}
          cy={16}
          r={4}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
        <ellipse
          cx={34}
          cy={30}
          rx={6}
          ry={8}
          stroke="var(--rz-fg-muted)"
          strokeWidth={1}
          fill="var(--rz-border)"
        />
      </motion.g>
    </motion.svg>
  );
}
