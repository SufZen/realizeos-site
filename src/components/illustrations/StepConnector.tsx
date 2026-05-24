import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

export function StepConnector({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 32 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Arrow connector between steps"
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      }}
    >
      {/* Dashed horizontal line */}
      <line
        x1={2}
        y1={8}
        x2={24}
        y2={8}
        stroke="var(--rz-accent)"
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* Chevron arrow */}
      <path
        d="M24 4 L30 8 L24 12"
        stroke="var(--rz-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
  );
}
