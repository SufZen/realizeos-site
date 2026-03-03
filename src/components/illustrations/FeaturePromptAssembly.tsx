import { motion } from 'framer-motion';
import { staggerContainer } from './animation-variants';

interface Props {
  className?: string;
}

const layers = [
  { width: 28, fill: 'rgba(255,204,0,0.05)', stroke: 'none' },
  { width: 32, fill: 'rgba(255,204,0,0.1)', stroke: 'none' },
  { width: 36, fill: 'rgba(255,204,0,0.05)', stroke: 'none' },
  { width: 42, fill: 'rgba(255,204,0,0.1)', stroke: 'none' },
  { width: 48, fill: 'rgba(255,204,0,0.05)', stroke: 'none' },
  { width: 54, fill: 'rgba(255,204,0,0.1)', stroke: 'none' },
  { width: 60, fill: 'rgba(255,204,0,0.18)', stroke: '#ffcc00' },
] as const;

const layerHeight = 5;
const gap = 4;
const totalHeight = layers.length * layerHeight + (layers.length - 1) * gap;
const startY = (80 - totalHeight) / 2;

export function FeaturePromptAssembly({ className }: Props) {
  return (
    <motion.svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Seven stacked layers representing 7-layer prompt assembly"
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* 7 layers stacking from top */}
      {layers.map((layer, i) => {
        const y = startY + i * (layerHeight + gap);
        const x = (80 - layer.width) / 2;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={layer.width}
            height={layerHeight}
            rx={2}
            fill={layer.fill}
            stroke={layer.stroke !== 'none' ? layer.stroke : undefined}
            strokeWidth={layer.stroke !== 'none' ? 0.5 : undefined}
            variants={{
              hidden: { opacity: 0, y: -8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: 'easeOut' as const },
              },
            }}
          />
        );
      })}

      {/* Small downward arrow on left side */}
      <motion.g
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 0.5, delay: 0.5 },
          },
        }}
      >
        <line
          x1={8}
          y1={startY + 2}
          x2={8}
          y2={startY + totalHeight - 2}
          stroke="rgba(255,204,0,0.3)"
          strokeWidth={1}
          strokeLinecap="round"
        />
        <path
          d={`M5 ${startY + totalHeight - 6} L8 ${startY + totalHeight - 2} L11 ${startY + totalHeight - 6}`}
          stroke="rgba(255,204,0,0.3)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.g>
    </motion.svg>
  );
}
