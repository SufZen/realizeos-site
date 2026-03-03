import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  floatSlowVariants,
  floatVariants,
} from './animation-variants';

interface Props {
  className?: string;
}

export function PackageFull({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Full package icon with folder, documents, gear, and terminal"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Folder — back panel */}
      <motion.path
        d="M14 34h52v26a2 2 0 01-2 2H16a2 2 0 01-2-2V34z"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        fill="rgba(255,255,255,0.03)"
        variants={fadeInChild}
      />
      {/* Folder — tab */}
      <motion.path
        d="M14 34V28a2 2 0 012-2h12l4 4h30v4H14z"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        fill="rgba(255,255,255,0.03)"
        variants={fadeInChild}
      />
      {/* Folder front panel (open) */}
      <motion.g variants={floatSlowVariants} animate="animate">
        <path
          d="M12 40h56a2 2 0 012 2v16a2 2 0 01-2 2H12a2 2 0 01-2-2V42a2 2 0 012-2z"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          fill="rgba(255,255,255,0.03)"
        />
      </motion.g>

      {/* 5 documents fanning out */}
      <motion.rect
        x={22}
        y={16}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(-12 27 23)"
      />
      <motion.rect
        x={28}
        y={14}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(-5 33 21)"
      />
      <motion.rect
        x={35}
        y={12}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
      />
      <motion.rect
        x={42}
        y={14}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(5 47 21)"
      />
      <motion.rect
        x={48}
        y={16}
        width={10}
        height={14}
        rx={1}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.2)"
        strokeWidth={1}
        variants={fadeInChild}
        transform="rotate(12 53 23)"
      />

      {/* Gear icon — floating above-right, slow rotation */}
      <motion.g variants={fadeInChild}>
        <motion.g
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '66px 10px' }}
        >
          <circle cx={66} cy={10} r={5} stroke="#ffcc00" strokeWidth={1} fill="none" />
          <circle cx={66} cy={10} r={2} stroke="#ffcc00" strokeWidth={0.8} fill="none" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 66 + 5 * Math.cos(rad);
            const y1 = 10 + 5 * Math.sin(rad);
            const x2 = 66 + 7.5 * Math.cos(rad);
            const y2 = 10 + 7.5 * Math.sin(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#ffcc00"
                strokeWidth={1}
                strokeLinecap="round"
              />
            );
          })}
        </motion.g>
      </motion.g>

      {/* Terminal icon — floating above-left, cursor blinks */}
      <motion.g variants={fadeInChild}>
        <motion.g variants={floatVariants} animate="animate">
          <rect
            x={4}
            y={4}
            width={14}
            height={10}
            rx={2}
            stroke="#ffcc00"
            strokeWidth={1}
            fill="none"
          />
          <text
            x={7}
            y={12}
            fill="#ffcc00"
            fontSize={6}
            fontFamily="monospace"
            fontWeight={600}
          >
            {'>'}
          </text>
          <motion.line
            x1={13}
            y1={8}
            x2={13}
            y2={12}
            stroke="#ffcc00"
            strokeWidth={1}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' as const }}
          />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}
