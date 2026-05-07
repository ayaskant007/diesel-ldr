"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'heavy' | 'ultra' | 'accent';
  breathe?: boolean;
  prismatic?: boolean;
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
      {children}
    </div>
  );
}
