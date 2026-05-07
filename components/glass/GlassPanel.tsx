"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'heavy' | 'ultra' | 'accent';
  breathe?: boolean;
  prismatic?: boolean;
  glow?: string;
  isHero?: boolean;
}

const variantMap = {
  default: 'glass',
  heavy: 'glass-heavy',
  ultra: 'glass-ultra',
  accent: 'glass-accent',
};

export function GlassPanel({
  children,
  className = '',
  variant = 'default',
  breathe = false,
  prismatic = false,
  glow,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden glass-specular',
        variantMap[variant],
        prismatic && 'glass-prismatic',
        className
      )}
      style={breathe ? {
        animation: 'glassBreath 12s ease-in-out infinite',
        willChange: 'transform',
      } : undefined}
    >
      {glow && (
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(ellipse 120% 80% at 50% 50%, ${glow}, transparent 70%)`,
            opacity: 0.15,
            filter: 'blur(40px)',
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
