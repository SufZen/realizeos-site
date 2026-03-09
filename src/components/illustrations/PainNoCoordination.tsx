import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  className?: string;
}

export function PainNoCoordination({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Misaligned structural modules unable to connect"
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Blueprint grid */}
      <motion.g variants={fadeInChild} opacity={0.04}>
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`g-${i}`} x1={10 * (i + 1)} y1={0} x2={10 * (i + 1)} y2={80} stroke="#ffcc00" strokeWidth={0.3} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h-${i}`} x1={0} y1={10 * (i + 1)} x2={80} y2={10 * (i + 1)} stroke="#ffcc00" strokeWidth={0.3} />
        ))}
      </motion.g>

      {/* Module 1 — left block, slightly misaligned up */}
      <motion.g
        variants={fadeInChild}
        animate={{ y: [0, -1, 0.5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={6} y={24} width={20} height={30} rx={1}
          stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Internal structure */}
        <line x1={10} y1={30} x2={22} y2={30} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={10} y1={38} x2={22} y2={38} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={16} y1={26} x2={16} y2={50} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.2} />
        {/* Exit port (right side) — misaligned */}
        <rect x={24} y={36} width={4} height={4} rx={0.5}
          fill="rgba(255,204,0,0.2)" stroke="rgba(255,204,0,0.3)" strokeWidth={0.5} />
      </motion.g>

      {/* Module 2 — center block, slightly shifted down */}
      <motion.g
        variants={fadeInChild}
        animate={{ y: [0, 1, -0.5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={32} y={28} width={18} height={26} rx={1}
          stroke="#b0b0c0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Internal structure */}
        <line x1={35} y1={34} x2={47} y2={34} stroke="#b0b0c0" strokeWidth={0.5} opacity={0.3} />
        <line x1={35} y1={42} x2={47} y2={42} stroke="#b0b0c0" strokeWidth={0.5} opacity={0.3} />
        <line x1={41} y1={30} x2={41} y2={52} stroke="#b0b0c0" strokeWidth={0.3} opacity={0.2} />
        {/* Entry port (left side) — doesn't align with Module 1 */}
        <rect x={30} y={40} width={4} height={4} rx={0.5}
          fill="rgba(255,204,0,0.2)" stroke="rgba(255,204,0,0.3)" strokeWidth={0.5} />
        {/* Exit port (right side) */}
        <rect x={48} y={38} width={4} height={4} rx={0.5}
          fill="rgba(255,204,0,0.2)" stroke="rgba(255,204,0,0.3)" strokeWidth={0.5} />
        {/* Stress marks above */}
        <line x1={38} y1={22} x2={36} y2={20} stroke="#b0b0c0" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={44} y1={22} x2={46} y2={20} stroke="#b0b0c0" strokeWidth={0.8} strokeLinecap="round" />
      </motion.g>

      {/* Module 3 — right block, shifted up */}
      <motion.g
        variants={fadeInChild}
        animate={{ y: [0, -0.5, 1, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <rect x={56} y={22} width={18} height={28} rx={1}
          stroke="#9a9ab0" strokeWidth={1} fill="rgba(255,255,255,0.02)" />
        {/* Internal structure */}
        <line x1={60} y1={30} x2={70} y2={30} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={60} y1={38} x2={70} y2={38} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.3} />
        <line x1={65} y1={24} x2={65} y2={48} stroke="#9a9ab0" strokeWidth={0.5} opacity={0.2} />
        {/* Entry port (left side) — misaligns */}
        <rect x={54} y={34} width={4} height={4} rx={0.5}
          fill="rgba(255,204,0,0.2)" stroke="rgba(255,204,0,0.3)" strokeWidth={0.5} />
      </motion.g>

      {/* Broken connections between modules */}
      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      >
        <line x1={28} y1={38} x2={30} y2={42}
          stroke="rgba(255,100,100,0.25)" strokeWidth={0.8} strokeDasharray="2 2" />
        {/* X mark at break */}
        <line x1={28.5} y1={39.5} x2={30} y2={41} stroke="rgba(255,100,100,0.3)" strokeWidth={0.6} />
        <line x1={30} y1={39.5} x2={28.5} y2={41} stroke="rgba(255,100,100,0.3)" strokeWidth={0.6} />
      </motion.g>

      <motion.g
        variants={fadeInChild}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
      >
        <line x1={52} y1={40} x2={54} y2={36}
          stroke="rgba(255,100,100,0.25)" strokeWidth={0.8} strokeDasharray="2 2" />
        {/* X mark at break */}
        <line x1={52.5} y1={37.5} x2={54} y2={39} stroke="rgba(255,100,100,0.3)" strokeWidth={0.6} />
        <line x1={54} y1={37.5} x2={52.5} y2={39} stroke="rgba(255,100,100,0.3)" strokeWidth={0.6} />
      </motion.g>

      {/* Dimension annotations that don't match */}
      <motion.g variants={fadeInChild} opacity={0.2}>
        <text x={10} y={66} fill="#9a9ab0" fontSize={5} fontFamily="JetBrains Mono, monospace">20m</text>
        <text x={36} y={62} fill="#b0b0c0" fontSize={5} fontFamily="JetBrains Mono, monospace">18m</text>
        <text x={60} y={58} fill="#9a9ab0" fontSize={5} fontFamily="JetBrains Mono, monospace">??</text>
      </motion.g>
    </motion.svg>
  );
}
