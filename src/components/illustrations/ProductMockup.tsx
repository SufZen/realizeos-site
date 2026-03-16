import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function ProductMockup({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 640 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Product mockup showing a chat interface with agent messages"
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <defs>
        <radialGradient id="mockupGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(255,204,0,0.04)" />
          <stop offset="100%" stopColor="rgba(255,204,0,0)" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <rect x={0} y={0} width={640} height={400} fill="url(#mockupGlow)" />

      {/* ---- Browser chrome frame ---- */}
      <motion.rect
        x={0} y={0} width={640} height={400} rx={12}
        fill="#0a0a0f"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* ---- Title bar ---- */}
      <motion.g variants={fadeInChild}>
        {/* 3 dots */}
        <circle cx={16} cy={18} r={4} fill="#9a9ab0" opacity={0.3} />
        <circle cx={28} cy={18} r={4} fill="#9a9ab0" opacity={0.3} />
        <circle cx={40} cy={18} r={4} fill="#9a9ab0" opacity={0.3} />
        {/* URL bar */}
        <rect x={60} y={8} width={340} height={20} rx={4} fill="rgba(255,255,255,0.04)" />
        <text x={70} y={22} fill="#9a9ab0" fontSize={10} fontFamily="JetBrains Mono, monospace">
          realizeos.ai
        </text>
        {/* Separator */}
        <line x1={0} y1={36} x2={640} y2={36} stroke="rgba(255,255,255,0.06)" />
      </motion.g>

      {/* ---- Left sidebar ---- */}
      <motion.g variants={fadeInChild}>
        <rect x={0} y={36} width={140} height={364} fill="rgba(255,255,255,0.02)" />
        {/* Vertical separator */}
        <line x1={140} y1={36} x2={140} y2={400} stroke="rgba(255,255,255,0.04)" />
      </motion.g>

      {/* Nav items — stagger in */}
      {[52, 72, 92, 112, 132].map((y, i) => (
        <motion.rect
          key={`nav-${i}`}
          x={16}
          y={y}
          width={80}
          height={8}
          rx={2}
          fill="rgba(255,255,255,0.06)"
          variants={fadeInChild}
        />
      ))}

      {/* ---- Main chat area ---- */}

      {/* User message 1 (right-aligned, slide from right) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.5 } },
        }}
      >
        <rect x={400} y={60} width={200} height={40} rx={8} fill="rgba(255,255,255,0.05)" />
        <text x={416} y={78} fill="#9a9ab0" fontSize={9} fontFamily="sans-serif">
          Create a blog post about our new
        </text>
        <text x={416} y={90} fill="#9a9ab0" fontSize={9} fontFamily="sans-serif">
          product launch for next week
        </text>
      </motion.g>

      {/* Agent message (left-aligned, slide from left) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: -30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.8 } },
        }}
      >
        {/* Yellow left border */}
        <rect x={160} y={120} width={2} height={70} rx={1} fill="#ffcc00" />
        <rect x={162} y={120} width={318} height={70} rx={8} fill="rgba(255,204,0,0.04)" />
        <text x={178} y={140} fill="#c0c0d0" fontSize={9} fontFamily="sans-serif">
          I&apos;ll draft that blog post. I found 3 relevant
        </text>
        <text x={178} y={153} fill="#c0c0d0" fontSize={9} fontFamily="sans-serif">
          docs in your knowledge base. Here&apos;s an outline
        </text>
        <text x={178} y={166} fill="#c0c0d0" fontSize={9} fontFamily="sans-serif">
          with your venture voice applied...
        </text>
      </motion.g>

      {/* User message 2 (right-aligned) */}
      <motion.g
        variants={{
          hidden: { opacity: 0, x: 30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 1.1 } },
        }}
      >
        <rect x={420} y={210} width={180} height={30} rx={8} fill="rgba(255,255,255,0.05)" />
        <text x={436} y={229} fill="#9a9ab0" fontSize={9} fontFamily="sans-serif">
          Great, also schedule it for Tuesday
        </text>
      </motion.g>

      {/* Typing indicator */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.3, delay: 1.4 } },
        }}
      >
        {/* Dot 1 */}
        <motion.circle
          cx={180}
          cy={265}
          r={3}
          fill="#9a9ab0"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0 }}
        />
        {/* Dot 2 */}
        <motion.circle
          cx={192}
          cy={265}
          r={3}
          fill="#9a9ab0"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.2 }}
        />
        {/* Dot 3 */}
        <motion.circle
          cx={204}
          cy={265}
          r={3}
          fill="#9a9ab0"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.4 }}
        />
      </motion.g>

      {/* Decorative sidebar active indicator */}
      <motion.rect
        x={4}
        y={52}
        width={3}
        height={8}
        rx={1.5}
        fill="#ffcc00"
        opacity={0.5}
        variants={fadeInChild}
      />
    </motion.svg>
  );
}
