import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  enabled?: boolean;
}

export function AnimatedCounter({ target, suffix = '', enabled = true }: AnimatedCounterProps) {
  const count = useAnimatedCounter(target, 1500, enabled);
  return <>{count.toLocaleString()}{suffix}</>;
}
