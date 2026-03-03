import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeInChild,
  pulseVariants,
} from './animation-variants';

interface Props {
  className?: string;
  src?: string;
}

export function FounderPhotoFrame({ className, src }: Props) {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Founder photo frame"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <defs>
        <clipPath id="founderClip">
          <circle cx={80} cy={80} r={66} />
        </clipPath>
      </defs>

      {/* 1. Outer decorative ring — slow rotate */}
      <motion.circle
        cx={80}
        cy={80}
        r={74}
        stroke="rgba(255,204,0,0.15)"
        strokeWidth={1}
        strokeDasharray="8 4"
        variants={fadeInChild}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '80px 80px' }}
      />

      {/* 2. Inner solid circle */}
      <motion.circle
        cx={80}
        cy={80}
        r={66}
        fill="rgba(26,26,36,0.8)"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* 3. Placeholder silhouette or real photo */}
      {src ? (
        <motion.image
          href={src}
          x={14}
          y={14}
          width={132}
          height={132}
          clipPath="url(#founderClip)"
          preserveAspectRatio="xMidYMid slice"
          variants={fadeInChild}
        />
      ) : (
        <motion.g variants={fadeInChild}>
          {/* Head */}
          <circle cx={80} cy={56} r={16} fill="#9a9ab0" opacity={0.3} />
          {/* Shoulders arc */}
          <path
            d="M52 100 C52 82, 66 76, 80 76 C94 76, 108 82, 108 100"
            fill="#9a9ab0"
            opacity={0.3}
          />
        </motion.g>
      )}

      {/* 4. Yellow diamond badge at bottom — pulses */}
      <motion.rect
        x={76}
        y={148}
        width={8}
        height={8}
        rx={1}
        fill="#ffcc00"
        transform="rotate(45 80 152)"
        variants={fadeInChild}
      />
      <motion.rect
        x={76}
        y={148}
        width={8}
        height={8}
        rx={1}
        fill="#ffcc00"
        transform="rotate(45 80 152)"
        variants={pulseVariants}
        animate="animate"
      />
    </motion.svg>
  );
}
