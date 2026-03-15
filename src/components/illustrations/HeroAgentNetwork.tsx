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

/* Six satellite positions ~110px from center (200,180) */
const satellites = [
  { cx: 200, cy: 70, label: 'Orchestrator' },   // top
  { cx: 305, cy: 125, label: 'Writer' },         // top-right
  { cx: 305, cy: 235, label: 'Analyst' },         // bottom-right
  { cx: 200, cy: 290, label: 'Reviewer' },        // bottom
  { cx: 95, cy: 235, label: 'Knowledge' },        // bottom-left
  { cx: 95, cy: 125, label: 'Tools' },            // top-left
] as const;

/* Central hexagon points (~40px radius around 200,180) */
const hexR = 40;
const hexPoints = Array.from({ length: 6 }, (_, i) => {
  const angle = (Math.PI / 3) * i - Math.PI / 2;
  return `${200 + hexR * Math.cos(angle)},${180 + hexR * Math.sin(angle)}`;
}).join(' ');

export function HeroAgentNetwork({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 400 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Agent network diagram showing a central brain node connected to six specialized agent satellites"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{ willChange: 'transform' }}
    >
      {/* ---- Defs ---- */}
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(204,163,0,0.12)" />
          <stop offset="100%" stopColor="rgba(204,163,0,0)" />
        </radialGradient>
      </defs>

      {/* 1. Background glow */}
      <circle cx={200} cy={180} r={170} fill="url(#heroGlow)" />

      {/* 4. Connecting dashed lines from centre to each satellite */}
      {satellites.map((s, i) => (
        <motion.line
          key={`line-${i}`}
          x1={200}
          y1={180}
          x2={s.cx}
          y2={s.cy}
          className="stroke-amber-400/30 dark:stroke-yellow-400/[0.12]"
          strokeWidth={1}
          strokeDasharray="4 4"
          variants={drawVariants}
        />
      ))}

      {/* 3. Satellite circles */}
      {satellites.map((s, i) => (
        <motion.g key={`sat-${i}`} variants={fadeInChild}>
          {/* Outer ring */}
          <circle
            cx={s.cx}
            cy={s.cy}
            r={18}
            className="fill-amber-100/60 stroke-amber-500/50 dark:fill-white/[0.04] dark:stroke-yellow-400/25"
            strokeWidth={1}
          />
          {/* Icon per satellite */}
          {i === 0 && (
            /* Orchestrator: two crossing small arrows */
            <g className="stroke-amber-600 dark:stroke-yellow-400/70" strokeWidth={1.2} strokeLinecap="round">
              <line x1={193} y1={76} x2={207} y2={64} />
              <polyline points="204,64 207,64 207,67" fill="none" />
              <line x1={207} y1={76} x2={193} y2={64} />
              <polyline points="196,64 193,64 193,67" fill="none" />
            </g>
          )}
          {i === 1 && (
            /* Writer: pen nib */
            <g className="stroke-amber-600 dark:stroke-yellow-400/70" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" fill="none">
              <path d="M301 119l8 12-4-1-3 3-1-4z" />
              <line x1={303} y1={121} x2={307} y2={127} />
            </g>
          )}
          {i === 2 && (
            /* Analyst: 3 bar chart rects */
            <g className="fill-amber-600 dark:fill-yellow-400/70">
              <rect x={299} y={232} width={3} height={8} rx={0.5} />
              <rect x={304} y={228} width={3} height={12} rx={0.5} />
              <rect x={309} y={230} width={3} height={10} rx={0.5} />
            </g>
          )}
          {i === 3 && (
            /* Reviewer: checkmark inside small circle */
            <g>
              <circle cx={200} cy={290} r={8} className="stroke-amber-500/60 dark:stroke-yellow-400/40" strokeWidth={0.8} fill="none" />
              <polyline
                points="196,290 199,293 205,286"
                className="stroke-amber-600 dark:stroke-yellow-400/70"
                strokeWidth={1.3}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          )}
          {i === 4 && (
            /* Knowledge: open book (two angled rects) */
            <g className="stroke-amber-600 dark:stroke-yellow-400/70" strokeWidth={1.2} fill="none" strokeLinejoin="round">
              <path d="M89 232l6-6v12l-6-6z" />
              <path d="M101 232l-6-6v12l6-6z" />
              <line x1={95} y1={226} x2={95} y2={244} />
            </g>
          )}
          {i === 5 && (
            /* Tools: gear/cog outline */
            <g className="stroke-amber-600 dark:stroke-yellow-400/70" strokeWidth={1.2} fill="none">
              <circle cx={95} cy={125} r={5} />
              <circle cx={95} cy={125} r={2} />
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 95 + 5 * Math.cos(rad);
                const y1 = 125 + 5 * Math.sin(rad);
                const x2 = 95 + 8 * Math.cos(rad);
                const y2 = 125 + 8 * Math.sin(rad);
                return (
                  <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.5} strokeLinecap="round" />
                );
              })}
            </g>
          )}
        </motion.g>
      ))}

      {/* 2. Central hexagon with pulse */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
          style={{ transformOrigin: '200px 180px' }}
        >
          <polygon
            points={hexPoints}
            className="stroke-amber-500 fill-amber-400/15 dark:stroke-yellow-400 dark:fill-yellow-400/[0.08]"
            strokeWidth={1.5}
          />
          {/* Simple circuit / brain icon inside */}
          <g className="stroke-amber-500/80 dark:stroke-yellow-400/60" strokeWidth={1} strokeLinecap="round" fill="none">
            {/* Horizontal connector */}
            <line x1={188} y1={180} x2={212} y2={180} />
            {/* Upper branch */}
            <line x1={195} y1={180} x2={195} y2={170} />
            <line x1={195} y1={170} x2={205} y2={170} />
            {/* Lower branch */}
            <line x1={205} y1={180} x2={205} y2={190} />
            <line x1={205} y1={190} x2={195} y2={190} />
          </g>
          {/* Neural dots */}
          <circle cx={188} cy={180} r={2} className="fill-amber-500/70 dark:fill-yellow-400/50" />
          <circle cx={212} cy={180} r={2} className="fill-amber-500/70 dark:fill-yellow-400/50" />
          <circle cx={195} cy={170} r={1.5} className="fill-amber-500/60 dark:fill-yellow-400/40" />
          <circle cx={205} cy={170} r={1.5} className="fill-amber-500/60 dark:fill-yellow-400/40" />
          <circle cx={205} cy={190} r={1.5} className="fill-amber-500/60 dark:fill-yellow-400/40" />
          <circle cx={195} cy={190} r={1.5} className="fill-amber-500/60 dark:fill-yellow-400/40" />
        </motion.g>
      </motion.g>

      {/* 5. Signal dots travelling along each connecting line */}
      {satellites.map((s, i) => (
        <motion.circle
          key={`signal-${i}`}
          r={2.5}
          className="fill-amber-500 dark:fill-yellow-400"
          animate={{
            cx: [200, s.cx, 200],
            cy: [180, s.cy, 180],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
            delay: i * 0.4,
          }}
        />
      ))}

      {/* 6. Orbiting decorative dots on a large invisible circle (r=160) */}
      <motion.g
        variants={orbitVariants(25)}
        animate="animate"
        style={{ transformOrigin: '200px 180px' }}
      >
        {[0, 120, 240].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={deg}
              cx={200 + 160 * Math.cos(rad)}
              cy={180 + 160 * Math.sin(rad)}
              r={1.5}
              className="fill-amber-400/30 dark:fill-yellow-400/15"
            />
          );
        })}
      </motion.g>
    </motion.svg>
  );
}
