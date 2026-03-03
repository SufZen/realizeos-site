import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

/* 270-degree arc (3/4 circle) centered at 40,40 with r=22 */
const arcR = 22;
const arcD = `M${40 + arcR} 40 A${arcR} ${arcR} 0 1 0 40 ${40 - arcR}`;

/* Plus symbols scattered */
const plusSymbols = [
  { x: 14, y: 20 },
  { x: 64, y: 24 },
  { x: 18, y: 60 },
  { x: 62, y: 58 },
] as const;

export function FeatureSelfEvolution({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Circular arrow with upward-trending graph representing self-evolution"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Circular arrow — slow continuous rotation */}
      <motion.g
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear' as const,
        }}
        style={{ transformOrigin: '40px 40px' }}
      >
        <motion.path
          d={arcD}
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
          variants={fadeInChild}
        />
        {/* Arrowhead at the end of the arc (at the top, 40, 18) */}
        <motion.path
          d="M36 22 L40 18 L44 22"
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={fadeInChild}
        />
      </motion.g>

      {/* Upward-trending graph line inside circle — draws in */}
      <motion.path
        d="M30 48 L36 42 L42 44 L50 32"
        stroke="rgba(255,204,0,0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: 'easeInOut' as const, delay: 0.3 },
          },
        }}
      />

      {/* Plus symbols — stagger fade in and float up */}
      {plusSymbols.map((p, i) => (
        <motion.text
          key={i}
          x={p.x}
          y={p.y}
          fill="rgba(255,204,0,0.2)"
          fontSize={10}
          fontFamily="monospace"
          textAnchor="middle"
          dominantBaseline="central"
          variants={{
            hidden: { opacity: 0, y: 4 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.4 + i * 0.1 },
            },
          }}
        >
          +
        </motion.text>
      ))}
    </motion.svg>
  );
}
