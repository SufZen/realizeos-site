import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function FeatureCreativePipeline({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Pipeline with three stages representing creative pipelines from brief to approval"
      variants={staggerContainer(0.15)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Horizontal connecting line */}
      <motion.line
        x1={22}
        y1={40}
        x2={57}
        y2={40}
        stroke="rgba(255,204,0,0.12)"
        strokeWidth={1}
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1, ease: 'easeInOut' as const },
          },
        }}
      />

      {/* Flow arrows on the line */}
      <motion.path
        d="M30 37 L33 40 L30 43"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={fadeInChild}
      />
      <motion.path
        d="M50 37 L53 40 L50 43"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={fadeInChild}
      />

      {/* Stage 1 — diamond (brief) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
          },
        }}
        style={{ transformOrigin: '15px 40px' }}
      >
        <path
          d="M15 32 L23 40 L15 48 L7 40 Z"
          fill="rgba(255,204,0,0.06)"
          stroke="rgba(255,204,0,0.2)"
          strokeWidth={1}
        />
      </motion.g>

      {/* Stage 2 — rectangle (draft) with pencil */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
          },
        }}
        style={{ transformOrigin: '40px 40px' }}
      >
        <rect
          x={34}
          y={35}
          width={12}
          height={10}
          rx={2}
          fill="rgba(255,204,0,0.06)"
          stroke="rgba(255,204,0,0.2)"
          strokeWidth={1}
        />
        {/* Tiny pencil inside */}
        <line
          x1={37}
          y1={43}
          x2={43}
          y2={37}
          stroke="rgba(255,204,0,0.4)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      </motion.g>

      {/* Stage 3 — circle (approved) with checkmark — scale pop */}
      <motion.g
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.4,
              type: 'spring',
              stiffness: 300,
              damping: 15,
            },
          },
        }}
        style={{ transformOrigin: '65px 40px' }}
      >
        <circle
          cx={65}
          cy={40}
          r={8}
          fill="rgba(255,204,0,0.12)"
          stroke="#ffcc00"
          strokeWidth={1}
        />
        {/* Checkmark */}
        <motion.polyline
          points="60,40 63,43 70,36"
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={{
            hidden: { pathLength: 0 },
            visible: {
              pathLength: 1,
              transition: { duration: 0.4, ease: 'easeOut' as const },
            },
          }}
        />
      </motion.g>

      {/* Labels */}
      <motion.text
        x={15}
        y={58}
        textAnchor="middle"
        fill="rgba(255,255,255,0.3)"
        fontSize={6}
        fontFamily="sans-serif"
        variants={fadeInChild}
      >
        brief
      </motion.text>
      <motion.text
        x={40}
        y={58}
        textAnchor="middle"
        fill="rgba(255,255,255,0.3)"
        fontSize={6}
        fontFamily="sans-serif"
        variants={fadeInChild}
      >
        draft
      </motion.text>
      <motion.text
        x={65}
        y={58}
        textAnchor="middle"
        fill="rgba(255,255,255,0.3)"
        fontSize={6}
        fontFamily="sans-serif"
        variants={fadeInChild}
      >
        done
      </motion.text>
    </motion.svg>
  );
}
