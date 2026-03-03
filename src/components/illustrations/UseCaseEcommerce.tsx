import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function UseCaseEcommerce({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="E-commerce shopping cart with AI sparkle"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* ---- Shopping cart ---- */}
      <motion.g variants={fadeInChild}>
        {/* Handle */}
        <path
          d="M10 20 L16 20"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
        {/* Basket (trapezoid) */}
        <path
          d="M16 20 L18 40 L38 40 L40 24 L16 24"
          stroke="#9a9ab0"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="rgba(255,255,255,0.03)"
        />
        {/* Cross bar */}
        <line
          x1={16} y1={24} x2={40} y2={24}
          stroke="#9a9ab0"
          strokeWidth={1}
        />
        {/* Wheels */}
        <circle cx={22} cy={44} r={3} stroke="#9a9ab0" strokeWidth={1.5} fill="none" />
        <circle cx={34} cy={44} r={3} stroke="#9a9ab0" strokeWidth={1.5} fill="none" />
        {/* Axle lines */}
        <line x1={19} y1={40} x2={22} y2={41} stroke="#9a9ab0" strokeWidth={0.8} />
        <line x1={37} y1={40} x2={34} y2={41} stroke="#9a9ab0" strokeWidth={0.8} />
      </motion.g>

      {/* ---- Price tag ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
        style={{ transformOrigin: '42px 14px' }}
      >
        {/* String line from tag to cart */}
        <path
          d="M42 22 C42 18, 40 16, 42 14"
          stroke="rgba(255,204,0,0.2)"
          strokeWidth={0.8}
          fill="none"
        />
        {/* Tag body */}
        <rect
          x={36} y={8} width={12} height={10} rx={2}
          fill="rgba(255,204,0,0.1)"
          stroke="rgba(255,204,0,0.3)"
          strokeWidth={1}
        />
        {/* Tag hole */}
        <circle cx={39} cy={11} r={1} stroke="rgba(255,204,0,0.3)" strokeWidth={0.6} fill="none" />
        {/* $ sign */}
        <text x={41} y={16} fill="rgba(255,204,0,0.5)" fontSize={6} fontFamily="sans-serif">$</text>
      </motion.g>

      {/* ---- AI sparkle (4-pointed star) ---- */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
        style={{ transformOrigin: '52px 10px' }}
      >
        <path
          d="M52 4 L53.5 8.5 L58 10 L53.5 11.5 L52 16 L50.5 11.5 L46 10 L50.5 8.5 Z"
          fill="#ffcc00"
        />
      </motion.g>
    </motion.svg>
  );
}
