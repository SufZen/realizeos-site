import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function FeatureMultiChannel({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Central hub connected to multiple channels"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Central hub circle */}
      <motion.circle
        cx={40}
        cy={40}
        r={10}
        fill="rgba(255,204,0,0.12)"
        stroke="rgba(255,204,0,0.4)"
        strokeWidth={1.5}
        variants={fadeInChild}
      />

      {/* Inner pulsing dot */}
      <motion.circle
        cx={40}
        cy={40}
        r={3.5}
        fill="#ffcc00"
        variants={fadeInChild}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
        style={{ transformOrigin: '40px 40px' }}
      />

      {/* Channel endpoints — five small circles around the hub */}
      {[
        { cx: 40, cy: 14 },  // top
        { cx: 64, cy: 28 },  // top-right
        { cx: 64, cy: 54 },  // bottom-right
        { cx: 16, cy: 54 },  // bottom-left
        { cx: 16, cy: 28 },  // top-left
      ].map((pos, i) => (
        <motion.circle
          key={i}
          cx={pos.cx}
          cy={pos.cy}
          r={5}
          fill="rgba(255,204,0,0.08)"
          stroke="rgba(255,204,0,0.3)"
          strokeWidth={1}
          variants={fadeInChild}
        />
      ))}

      {/* Lines from center to each endpoint */}
      {[
        'M40 30 L40 19',
        'M49 36 L59 30',
        'M49 45 L59 50',
        'M31 45 L21 50',
        'M31 36 L21 30',
      ].map((d, i) => (
        <motion.path
          key={`line-${i}`}
          d={d}
          stroke="rgba(255,204,0,0.35)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="3 2"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.6, ease: 'easeInOut' as const, delay: i * 0.1 },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
