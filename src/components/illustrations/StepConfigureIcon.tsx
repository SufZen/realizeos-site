import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function StepConfigureIcon({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Document with form fields and pencil icon representing business configuration"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Document page */}
      <motion.rect
        x={14}
        y={8}
        width={30}
        height={48}
        rx={3}
        fill="rgba(255,255,255,0.03)"
        stroke="#9a9ab0"
        strokeWidth={1.5}
        variants={fadeInChild}
      />

      {/* Form field lines — draw in sequentially */}
      <motion.line
        x1={20}
        y1={20}
        x2={38}
        y2={20}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeInOut' as const },
          },
        }}
      />
      <motion.line
        x1={20}
        y1={30}
        x2={38}
        y2={30}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeInOut' as const, delay: 0.15 },
          },
        }}
      />
      <motion.line
        x1={20}
        y1={40}
        x2={38}
        y2={40}
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.6, ease: 'easeInOut' as const, delay: 0.3 },
          },
        }}
      />

      {/* Pencil with subtle rotate oscillation */}
      <motion.g
        variants={fadeInChild}
        animate={{
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        }}
        style={{ transformOrigin: '47px 49px' }}
      >
        <path
          d="M42 54 L50 46 L53 49 L45 57 L42 57 Z"
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1={50}
          y1={46}
          x2={53}
          y2={49}
          stroke="#ffcc00"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}
