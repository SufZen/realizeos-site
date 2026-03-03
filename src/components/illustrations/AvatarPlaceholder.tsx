import { motion } from 'framer-motion';
import { staggerContainer, fadeInChild } from './animation-variants';

interface Props {
  initials: string;
  size?: number;
  className?: string;
}

export function AvatarPlaceholder({ initials, size, className }: Props) {
  const hash = initials.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);

  // Generate 2-3 small decorative circles based on hash
  const decorCount = (hash % 2) + 2; // 2 or 3
  const decorCircles = Array.from({ length: decorCount }, (_, i) => {
    const angle = ((hash + i * 137) % 360) * (Math.PI / 180);
    const radius = 12 + (hash % 6);
    const cx = 24 + radius * Math.cos(angle);
    const cy = 24 + radius * Math.sin(angle);
    const r = 2 + ((hash + i) % 3);
    return { cx, cy, r, key: i };
  });

  return (
    <motion.svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      role="img"
      aria-label={`Avatar for ${initials}`}
      variants={staggerContainer(0.08)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Outer circle */}
      <motion.circle
        cx={24}
        cy={24}
        r={22}
        fill="rgba(255,204,0,0.08)"
        stroke="rgba(255,204,0,0.18)"
        strokeWidth={1}
        variants={fadeInChild}
      />

      {/* Decorative circles based on hash */}
      {decorCircles.map((d) => (
        <motion.circle
          key={d.key}
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill="rgba(255,204,0,0.1)"
          variants={fadeInChild}
        />
      ))}

      {/* Centered initials text */}
      <motion.text
        x={24}
        y={24}
        fill="#ffcc00"
        fontFamily="Poppins"
        fontWeight={600}
        fontSize={14}
        textAnchor="middle"
        dominantBaseline="central"
        variants={fadeInChild}
      >
        {initials}
      </motion.text>
    </motion.svg>
  );
}
