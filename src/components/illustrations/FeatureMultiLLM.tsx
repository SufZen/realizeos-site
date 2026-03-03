import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

/* Regular hexagon path helper — returns an SVG path string */
function hexPath(cx: number, cy: number, r: number): string {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  });
  return `M${pts.join('L')}Z`;
}

export function FeatureMultiLLM({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Three hexagons connected by routing arrows representing multi-LLM routing"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Hexagon top-center */}
      <motion.path
        d={hexPath(40, 22, 12)}
        fill="rgba(255,204,0,0.06)"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Hexagon bottom-left */}
      <motion.path
        d={hexPath(22, 54, 12)}
        fill="rgba(255,204,0,0.1)"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Hexagon bottom-right */}
      <motion.path
        d={hexPath(58, 54, 12)}
        fill="rgba(255,204,0,0.15)"
        stroke="rgba(255,204,0,0.25)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Routing arrows — draw in via pathLength */}
      {/* Top to bottom-left */}
      <motion.path
        d="M34 32 L26 44"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        markerEnd="url(#arrowMultiLLM)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' as const },
          },
        }}
      />
      {/* Top to bottom-right */}
      <motion.path
        d="M46 32 L54 44"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        markerEnd="url(#arrowMultiLLM)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' as const, delay: 0.15 },
          },
        }}
      />
      {/* Bottom-left to bottom-right */}
      <motion.path
        d="M34 54 L46 54"
        stroke="#ffcc00"
        strokeWidth={1}
        strokeLinecap="round"
        markerEnd="url(#arrowMultiLLM)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: 'easeInOut' as const, delay: 0.3 },
          },
        }}
      />

      {/* Center dot where routes meet — pulses */}
      <motion.circle
        cx={40}
        cy={43}
        r={3}
        fill="#ffcc00"
        variants={fadeInChild}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
        style={{ transformOrigin: '40px 43px' }}
      />

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowMultiLLM"
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
