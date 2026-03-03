import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild, floatSlowVariants } from './animation-variants';

interface Props {
  className?: string;
}

export function StepConversationIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Speech bubbles with typing dots representing first conversation"
      variants={staggerContainer()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Back speech bubble with gentle float */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate="animate"
          variants={floatSlowVariants}
        >
          <rect
            x={8}
            y={8}
            width={32}
            height={24}
            rx={6}
            fill="rgba(255,204,0,0.08)"
            stroke="rgba(255,204,0,0.25)"
            strokeWidth={1}
          />
          {/* Tail triangle at bottom-left */}
          <path
            d="M14 32 L10 38 L20 32"
            fill="rgba(255,204,0,0.08)"
            stroke="rgba(255,204,0,0.25)"
            strokeWidth={1}
            strokeLinejoin="round"
          />
        </motion.g>
      </motion.g>

      {/* Front speech bubble with gentle float */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate="animate"
          variants={floatSlowVariants}
        >
          <rect
            x={24}
            y={24}
            width={32}
            height={24}
            rx={6}
            fill="rgba(26,26,36,0.8)"
            stroke="#9a9ab0"
            strokeWidth={1}
          />
          {/* Tail at bottom-right */}
          <path
            d="M48 48 L54 54 L44 48"
            fill="rgba(26,26,36,0.8)"
            stroke="#9a9ab0"
            strokeWidth={1}
            strokeLinejoin="round"
          />

          {/* 3 typing dots */}
          <motion.circle
            cx={34}
            cy={36}
            r={2}
            fill="#9a9ab0"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
              delay: 0,
            }}
          />
          <motion.circle
            cx={40}
            cy={36}
            r={2}
            fill="#9a9ab0"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
              delay: 0.2,
            }}
          />
          <motion.circle
            cx={46}
            cy={36}
            r={2}
            fill="#9a9ab0"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut' as const,
              delay: 0.4,
            }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
