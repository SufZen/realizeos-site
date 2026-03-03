import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild, floatSlowVariants } from './animation-variants';

interface Props {
  className?: string;
}

/* Dot positions inside lens (3x2 grid) */
const dots = [
  { cx: 27, cy: 30 },
  { cx: 34, cy: 30 },
  { cx: 41, cy: 30 },
  { cx: 27, cy: 37 },
  { cx: 34, cy: 37 },
  { cx: 41, cy: 37 },
] as const;

export function FeatureKBSearch({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Magnifying glass with search dots and text lines representing hybrid KB search"
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Magnifier with gentle float */}
      <motion.g variants={fadeInChild}>
        <motion.g animate="animate" variants={floatSlowVariants}>
          {/* Lens circle */}
          <circle
            cx={34}
            cy={34}
            r={18}
            stroke="#9a9ab0"
            strokeWidth={2}
            fill="none"
          />
          {/* Handle */}
          <line
            x1={47}
            y1={47}
            x2={58}
            y2={58}
            stroke="#9a9ab0"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Inside lens — text search lines */}
          <line x1={24} y1={24} x2={38} y2={24} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={24} y1={28} x2={35} y2={28} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeLinecap="round" />
          <line x1={24} y1={42} x2={40} y2={42} stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeLinecap="round" />

          {/* Inside lens — vector embedding dots with wave pulse */}
          {dots.map((d, i) => (
            <motion.circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={1.5}
              fill="rgba(255,204,0,0.3)"
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut' as const,
                delay: i * 0.15,
              }}
            />
          ))}
        </motion.g>
      </motion.g>

      {/* Brackets near handle */}
      <motion.g variants={fadeInChild}>
        <text
          x={58}
          y={44}
          fill="#ffcc00"
          fontSize={10}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {'{'}
        </text>
        <text
          x={64}
          y={44}
          fill="#ffcc00"
          fontSize={10}
          fontFamily="monospace"
          fontWeight="bold"
        >
          {'}'}
        </text>
      </motion.g>
    </motion.svg>
  );
}
