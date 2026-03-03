import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild, floatSlowVariants } from './animation-variants';

interface Props {
  className?: string;
}

export function StepBuildIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Stacked layers with upward arrow representing building your system"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Bottom layer */}
      <motion.rect
        x={14}
        y={42}
        width={36}
        height={10}
        rx={3}
        fill="rgba(255,204,0,0.06)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      />

      {/* Middle layer */}
      <motion.rect
        x={14}
        y={30}
        width={36}
        height={10}
        rx={3}
        fill="rgba(255,204,0,0.1)"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      />

      {/* Top layer */}
      <motion.rect
        x={14}
        y={18}
        width={36}
        height={10}
        rx={3}
        fill="rgba(255,204,0,0.18)"
        stroke="#ffcc00"
        strokeWidth={1}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      />

      {/* Upward arrow with subtle float */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate="animate"
          variants={floatSlowVariants}
        >
          <path
            d="M32 14 L32 6"
            stroke="#ffcc00"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <path
            d="M28 9 L32 5 L36 9"
            stroke="#ffcc00"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
