import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  drawVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

/* FABRIC layers: top (F) to bottom (C), alternating right/left */
const layers = [
  { letter: 'F', title: 'Foundations', y: 50, side: 'right' as const },
  { letter: 'A', title: 'Agents', y: 114, side: 'left' as const },
  { letter: 'B', title: 'Brand', y: 178, side: 'right' as const },
  { letter: 'R', title: 'Routines', y: 242, side: 'left' as const },
  { letter: 'I', title: 'Intelligence', y: 306, side: 'right' as const },
  { letter: 'C', title: 'Creations', y: 370, side: 'left' as const },
] as const;

/* Node dimensions */
const NODE_W = 110;
const NODE_H = 36;
const NODE_RX = 8;
const SPINE_X = 160;
const LEFT_X = 50;
const RIGHT_X = 210;

function getNodeX(side: 'left' | 'right') {
  return side === 'left' ? LEFT_X : RIGHT_X;
}

/* Stagger container for branch nodes — they appear after spine draws */
const branchStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 1.2 },
  },
} as const;

export function FabricDiagram({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="FABRIC system architecture diagram with six interconnected layers"
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* 1. Central vertical spine (draws bottom to top) */}
      <motion.line
        x1={SPINE_X}
        y1={380}
        x2={SPINE_X}
        y2={40}
        stroke="rgba(255,204,0,0.15)"
        strokeWidth={2}
        variants={drawVariants}
      />

      {/* 2. Small upward arrow at top of spine */}
      <motion.polyline
        points="154,42 160,33 166,42"
        stroke="#ffcc00"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={fadeInChild}
      />

      {/* 6. Small upward chevrons between branch levels on the spine */}
      {[82, 146, 210, 274, 338].map((y) => (
        <motion.polyline
          key={`chev-${y}`}
          points={`156,${y + 4} 160,${y} 164,${y + 4}`}
          stroke="rgba(255,204,0,0.2)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={fadeInChild}
        />
      ))}

      {/* 5. Pulse dots at junction points on the spine */}
      {layers.map((layer) => (
        <motion.circle
          key={`pulse-${layer.letter}`}
          cx={SPINE_X}
          cy={layer.y}
          r={3}
          fill="rgba(255,204,0,0.3)"
          variants={fadeInChild}
        />
      ))}
      {/* Continuous pulse overlay on junction dots */}
      {layers.map((layer, i) => (
        <motion.circle
          key={`pulse-anim-${layer.letter}`}
          cx={SPINE_X}
          cy={layer.y}
          r={3}
          fill="rgba(255,204,0,0.3)"
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: i * 0.3,
          }}
          style={{ transformOrigin: `${SPINE_X}px ${layer.y}px` }}
        />
      ))}

      {/* 3 & 4. Branch nodes with horizontal connectors */}
      <motion.g variants={branchStagger} initial="hidden" animate="visible">
        {layers.map((layer) => {
          const nodeX = getNodeX(layer.side);
          const connectorStartX = layer.side === 'left' ? nodeX + NODE_W : nodeX;

          return (
            <motion.g key={layer.letter} variants={fadeInChild}>
              {/* Horizontal connector from spine to node */}
              <line
                x1={SPINE_X}
                y1={layer.y}
                x2={connectorStartX}
                y2={layer.y}
                stroke="rgba(255,204,0,0.1)"
                strokeWidth={1}
              />
              {/* Rounded rect background */}
              <rect
                x={nodeX}
                y={layer.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RX}
                fill="rgba(26,26,36,0.9)"
                stroke="rgba(255,204,0,0.15)"
                strokeWidth={1}
              />
              {/* Letter */}
              <text
                x={nodeX + 12}
                y={layer.y + 5}
                fill="#ffcc00"
                fontFamily="JetBrains Mono, monospace"
                fontSize={14}
                fontWeight={700}
              >
                {layer.letter}
              </text>
              {/* Title */}
              <text
                x={nodeX + 28}
                y={layer.y + 4}
                fill="#e8e8ed"
                fontFamily="Poppins, sans-serif"
                fontSize={11}
              >
                {layer.title}
              </text>
            </motion.g>
          );
        })}
      </motion.g>
    </motion.svg>
  );
}
