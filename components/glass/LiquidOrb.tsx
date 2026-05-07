import { cn } from '@/lib/utils';
import { CSSProperties } from 'react';

interface LiquidOrbProps {
  color: string;
  size?: number;
  className?: string;
  delay?: number;
  duration?: number;
  blendMode?: 'screen' | 'multiply';
  opacity?: number;
  blur?: number;
  style?: CSSProperties;
}

export function LiquidOrb({
  color,
  size = 400,
  className = '',
  delay = 0,
  duration = 8,
  blendMode = 'screen',
  opacity = 0.5,
  blur = 80,
  style,
}: LiquidOrbProps) {
  return (
    <div
      className={cn('absolute rounded-full pointer-events-none', className)}
      style={{
        width: size,
        height: size,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        mixBlendMode: blendMode,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
