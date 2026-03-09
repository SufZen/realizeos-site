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

/* Node dimensions — more angular / architectural */
const NODE_W = 110;
const NODE_H = 36;
const NODE_RX = 2; // sharp corners for blueprint feel
const SPINE_X = 160;
const LEFT_X = 50;
const RIGHT_X = 210;

function getNodeX(side: 'left' | 'right') {
  return side === 'left' ? LEFT_X : RIGHT_X;
}

/* Stagger container for branch nodes */
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
      aria-label="FABRIC system architecture diagram — blueprint style with six interconnected layers"
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Blueprint grid background */}
      <motion.g variants={fadeInChild} opacity={0.035}>
        {Array.from({ length: 8 }, (_, i) => (
          <line key={`vg-${i}`} x1={40 * (i + 1)} y1={0} x2={40 * (i + 1)} y2={420} stroke="#ffcc00" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`hg-${i}`} x1={0} y1={42 * (i + 1)} x2={320} y2={42 * (i + 1)} stroke="#ffcc00" strokeWidth={0.5} />
        ))}
      </motion.g>

      {/* 1. Central vertical spine (draws bottom to top) */}
      <motion.line
        x1={SPINE_X}
        y1={380}
        x2={SPINE_X}
        y2={40}
        stroke="rgba(255,204,0,0.18)"
        strokeWidth={2}
        variants={drawVariants}
      />

      {/* 2. Arrow-head marker at top of spine */}
      <motion.g variants={fadeInChild}>
        <polygon
          points="154,42 160,30 166,42"
          fill="rgba(255,204,0,0.3)"
          stroke="#ffcc00"
          strokeWidth={0.8}
        />
      </motion.g>

      {/* Grid tick marks along spine */}
      {[82, 146, 210, 274, 338].map((y) => (
        <motion.g key={`tick-${y}`} variants={fadeInChild}>
          <line
            x1={SPINE_X - 4}
            y1={y}
            x2={SPINE_X + 4}
            y2={y}
            stroke="rgba(255,204,0,0.2)"
            strokeWidth={1}
          />
        </motion.g>
      ))}

      {/* 5. Junction dots on the spine — diamond shaped */}
      {layers.map((layer) => (
        <motion.rect
          key={`junc-${layer.letter}`}
          x={SPINE_X - 3}
          y={layer.y - 3}
          width={6}
          height={6}
          fill="rgba(255,204,0,0.4)"
          transform={`rotate(45 ${SPINE_X} ${layer.y})`}
          variants={fadeInChild}
        />
      ))}

      {/* Pulse overlay on junction diamonds */}
      {layers.map((layer, i) => (
        <motion.rect
          key={`pulse-${layer.letter}`}
          x={SPINE_X - 3}
          y={layer.y - 3}
          width={6}
          height={6}
          fill="rgba(255,204,0,0.3)"
          transform={`rotate(45 ${SPINE_X} ${layer.y})`}
          animate={{
            opacity: [0.15, 0.5, 0.15],
            scale: [1, 1.5, 1],
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

      {/* 3 & 4. Branch nodes with orthogonal connectors */}
      <motion.g variants={branchStagger} initial="hidden" animate="visible">
        {layers.map((layer) => {
          const nodeX = getNodeX(layer.side);
          const connectorStartX = layer.side === 'left' ? nodeX + NODE_W : nodeX;

          return (
            <motion.g key={layer.letter} variants={fadeInChild}>
              {/* Orthogonal connector from spine to node */}
              <line
                x1={SPINE_X}
                y1={layer.y}
                x2={connectorStartX}
                y2={layer.y}
                stroke="rgba(255,204,0,0.12)"
                strokeWidth={1}
              />
              {/* Small right-angle marker at node junction */}
              <rect
                x={connectorStartX - (layer.side === 'left' ? 3 : -1)}
                y={layer.y - 2}
                width={4}
                height={4}
                fill="rgba(255,204,0,0.15)"
                stroke="rgba(255,204,0,0.25)"
                strokeWidth={0.5}
              />
              {/* Angular rect background */}
              <rect
                x={nodeX}
                y={layer.y - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RX}
                fill="rgba(26,26,36,0.9)"
                stroke="rgba(255,204,0,0.2)"
                strokeWidth={1}
              />
              {/* Inner border detail */}
              <rect
                x={nodeX + 2}
                y={layer.y - NODE_H / 2 + 2}
                width={NODE_W - 4}
                height={NODE_H - 4}
                rx={1}
                fill="none"
                stroke="rgba(255,204,0,0.06)"
                strokeWidth={0.5}
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
