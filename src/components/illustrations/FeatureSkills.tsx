import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function FeatureSkills({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Three connected circles with icons representing multi-step skills"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Circle 1 — magnifier */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={18}
          cy={40}
          r={10}
          fill="rgba(26,26,36,0.8)"
          stroke="rgba(255,204,0,0.25)"
          strokeWidth={1}
        />
        {/* Magnifier icon */}
        <circle cx={16} cy={38} r={3.5} stroke="#9a9ab0" strokeWidth={1} fill="none" />
        <line x1={18.5} y1={40.5} x2={21} y2={43} stroke="#9a9ab0" strokeWidth={1} strokeLinecap="round" />
      </motion.g>

      {/* Arrow 1→2 */}
      <motion.path
        d="M28 40 L32 40"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        markerEnd="url(#arrowSkills)"
        variants={fadeInChild}
      />

      {/* Circle 2 — document */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={40}
          cy={40}
          r={10}
          fill="rgba(26,26,36,0.8)"
          stroke="rgba(255,204,0,0.25)"
          strokeWidth={1}
        />
        {/* Document lines icon */}
        <line x1={36} y1={37} x2={44} y2={37} stroke="#9a9ab0" strokeWidth={1} strokeLinecap="round" />
        <line x1={36} y1={40} x2={43} y2={40} stroke="#9a9ab0" strokeWidth={1} strokeLinecap="round" />
        <line x1={36} y1={43} x2={41} y2={43} stroke="#9a9ab0" strokeWidth={1} strokeLinecap="round" />
      </motion.g>

      {/* Arrow 2→3 */}
      <motion.path
        d="M50 40 L54 40"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        markerEnd="url(#arrowSkills)"
        variants={fadeInChild}
      />

      {/* Circle 3 — checkmark */}
      <motion.g variants={fadeInChild}>
        <circle
          cx={62}
          cy={40}
          r={10}
          fill="rgba(26,26,36,0.8)"
          stroke="rgba(255,204,0,0.25)"
          strokeWidth={1}
        />
        {/* Checkmark icon */}
        <polyline
          points="57,40 60,43 67,36"
          stroke="#9a9ab0"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>

      {/* Travelling signal dot */}
      <motion.circle
        r={2}
        fill="#ffcc00"
        animate={{
          cx: [18, 40, 62, 62, 40, 18],
          cy: [40, 40, 40, 40, 40, 40],
          opacity: [0, 1, 1, 0.5, 0.5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
      />

      {/* Curving return path below (dashed) */}
      <motion.path
        d="M62 50 Q40 66 18 50"
        stroke="rgba(255,204,0,0.12)"
        strokeWidth={1}
        strokeDasharray="3 3"
        fill="none"
        variants={fadeInChild}
      />

      {/* Arrow marker def */}
      <defs>
        <marker
          id="arrowSkills"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6" fill="none" stroke="#ffcc00" strokeWidth={1} />
        </marker>
      </defs>
    </motion.svg>
  );
}
