import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  drawVariants,
  orbitVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

/* Six module positions on a hexagonal grid around center (200,180) */
const modules = [
  { cx: 200, cy: 60, label: 'Orchestrator' },
  { cx: 310, cy: 120, label: 'Writer' },
  { cx: 310, cy: 240, label: 'Analyst' },
  { cx: 200, cy: 300, label: 'Reviewer' },
  { cx: 90, cy: 240, label: 'Knowledge' },
  { cx: 90, cy: 120, label: 'Tools' },
] as const;

/* Hexagonal node points generator */
function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

/* L-shaped orthogonal route from center to module */
function orthoPath(cx: number, cy: number): string {
  const midX = 200;
  const midY = 180;
  // Route: go horizontal first, then vertical
  return `M${midX},${midY} L${cx},${midY} L${cx},${cy}`;
}

export function HeroAgentNetwork({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Blueprint-style agent network diagram with hexagonal modules connected by orthogonal circuit traces"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ willChange: 'transform' }}
    >
      {/* ---- Defs ---- */}
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,204,0,0.05)" />
          <stop offset="100%" stopColor="rgba(255,204,0,0)" />
        </radialGradient>
      </defs>

      {/* 1. Background glow */}
      <circle cx={200} cy={180} r={170} fill="url(#heroGlow)" />

      {/* 2. Blueprint grid lines */}
      <motion.g variants={fadeInChild} opacity={0.04}>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`vg-${i}`} x1={40 + i * 40} y1={0} x2={40 + i * 40} y2={360} stroke="#ffcc00" strokeWidth={0.5} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`hg-${i}`} x1={0} y1={40 + i * 40} x2={400} y2={40 + i * 40} stroke="#ffcc00" strokeWidth={0.5} />
        ))}
      </motion.g>

      {/* 3. Orthogonal circuit-trace connections */}
      {modules.map((m, i) => (
        <motion.path
          key={`route-${i}`}
          d={orthoPath(m.cx, m.cy)}
          stroke="rgba(255,204,0,0.12)"
          strokeWidth={1}
          fill="none"
          variants={drawVariants}
        />
      ))}

      {/* 4. Hexagonal module nodes */}
      {modules.map((m, i) => (
        <motion.g key={`mod-${i}`} variants={fadeInChild}>
          {/* Hex outline */}
          <polygon
            points={hexPoints(m.cx, m.cy, 22)}
            stroke="rgba(255,204,0,0.3)"
            strokeWidth={1}
            fill="rgba(26,26,36,0.85)"
          />
          {/* Inner hex detail */}
          <polygon
            points={hexPoints(m.cx, m.cy, 14)}
            stroke="rgba(255,204,0,0.1)"
            strokeWidth={0.5}
            fill="none"
          />
          {/* Module-specific icons */}
          {i === 0 && (
            /* Orchestrator: crosshair */
            <g stroke="rgba(255,204,0,0.7)" strokeWidth={1} strokeLinecap="round">
              <line x1={m.cx - 8} y1={m.cy} x2={m.cx + 8} y2={m.cy} />
              <line x1={m.cx} y1={m.cy - 8} x2={m.cx} y2={m.cy + 8} />
              <circle cx={m.cx} cy={m.cy} r={4} fill="none" />
            </g>
          )}
          {i === 1 && (
            /* Writer: lines representing text */
            <g stroke="rgba(255,204,0,0.7)" strokeWidth={0.8} strokeLinecap="round">
              <line x1={m.cx - 7} y1={m.cy - 4} x2={m.cx + 7} y2={m.cy - 4} />
              <line x1={m.cx - 7} y1={m.cy} x2={m.cx + 5} y2={m.cy} />
              <line x1={m.cx - 7} y1={m.cy + 4} x2={m.cx + 3} y2={m.cy + 4} />
            </g>
          )}
          {i === 2 && (
            /* Analyst: bar chart */
            <g fill="rgba(255,204,0,0.7)">
              <rect x={m.cx - 7} y={m.cy - 1} width={3} height={8} rx={0.5} />
              <rect x={m.cx - 2} y={m.cy - 5} width={3} height={12} rx={0.5} />
              <rect x={m.cx + 3} y={m.cy - 3} width={3} height={10} rx={0.5} />
            </g>
          )}
          {i === 3 && (
            /* Reviewer: checkmark in box */
            <g stroke="rgba(255,204,0,0.7)" strokeWidth={1} strokeLinecap="round" fill="none">
              <rect x={m.cx - 7} y={m.cy - 7} width={14} height={14} rx={1} strokeWidth={0.8} />
              <polyline points={`${m.cx - 4},${m.cy} ${m.cx - 1},${m.cy + 3} ${m.cx + 5},${m.cy - 4}`} strokeWidth={1.3} />
            </g>
          )}
          {i === 4 && (
            /* Knowledge: open book */
            <g stroke="rgba(255,204,0,0.7)" strokeWidth={1} fill="none" strokeLinejoin="round">
              <path d={`M${m.cx - 7},${m.cy - 2} L${m.cx},${m.cy - 6} L${m.cx + 7},${m.cy - 2}`} />
              <path d={`M${m.cx - 7},${m.cy - 2} L${m.cx - 7},${m.cy + 5} L${m.cx},${m.cy + 1} L${m.cx + 7},${m.cy + 5} L${m.cx + 7},${m.cy - 2}`} />
              <line x1={m.cx} y1={m.cy - 6} x2={m.cx} y2={m.cy + 1} strokeWidth={0.6} />
            </g>
          )}
          {i === 5 && (
            /* Tools: gear/cog */
            <g stroke="rgba(255,204,0,0.7)" strokeWidth={1} fill="none">
              <circle cx={m.cx} cy={m.cy} r={5} />
              <circle cx={m.cx} cy={m.cy} r={2} />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = m.cx + 5 * Math.cos(rad);
                const y1 = m.cy + 5 * Math.sin(rad);
                const x2 = m.cx + 8 * Math.cos(rad);
                const y2 = m.cy + 8 * Math.sin(rad);
                return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.5} strokeLinecap="round" />;
              })}
            </g>
          )}
        </motion.g>
      ))}

      {/* 5. Central hexagonal core with pulse */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
          style={{ transformOrigin: '200px 180px' }}
        >
          <polygon
            points={hexPoints(200, 180, 44)}
            stroke="#ffcc00"
            strokeWidth={1.5}
            fill="rgba(255,204,0,0.06)"
          />
          <polygon
            points={hexPoints(200, 180, 36)}
            stroke="rgba(255,204,0,0.2)"
            strokeWidth={0.5}
            fill="none"
          />
          {/* Circuit brain icon */}
          <g stroke="rgba(255,204,0,0.6)" strokeWidth={1} strokeLinecap="round" fill="none">
            <line x1={188} y1={180} x2={212} y2={180} />
            <line x1={194} y1={180} x2={194} y2={170} />
            <line x1={194} y1={170} x2={206} y2={170} />
            <line x1={206} y1={180} x2={206} y2={190} />
            <line x1={206} y1={190} x2={194} y2={190} />
          </g>
          {/* Neural junction dots */}
          <circle cx={188} cy={180} r={2} fill="rgba(255,204,0,0.5)" />
          <circle cx={212} cy={180} r={2} fill="rgba(255,204,0,0.5)" />
          <circle cx={194} cy={170} r={1.5} fill="rgba(255,204,0,0.4)" />
          <circle cx={206} cy={170} r={1.5} fill="rgba(255,204,0,0.4)" />
          <circle cx={206} cy={190} r={1.5} fill="rgba(255,204,0,0.4)" />
          <circle cx={194} cy={190} r={1.5} fill="rgba(255,204,0,0.4)" />
        </motion.g>
      </motion.g>

      {/* 6. Signal dots on orthogonal routes */}
      {modules.map((m, i) => (
        <motion.circle
          key={`signal-${i}`}
          r={2.5}
          fill="#ffcc00"
          animate={{
            cx: [200, m.cx, m.cx, 200],
            cy: [180, 180, m.cy, 180],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* 7. Slow-orbiting corner markers */}
      <motion.g
        variants={orbitVariants(30)}
        animate="animate"
        style={{ transformOrigin: '200px 180px' }}
      >
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <rect
              key={deg}
              x={200 + 155 * Math.cos(rad) - 2}
              y={180 + 155 * Math.sin(rad) - 2}
              width={4}
              height={4}
              fill="rgba(255,204,0,0.12)"
              transform={`rotate(45 ${200 + 155 * Math.cos(rad)} ${180 + 155 * Math.sin(rad)})`}
            />
          );
        })}
      </motion.g>
    </motion.svg>
  );
}
