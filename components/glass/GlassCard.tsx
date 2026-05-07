"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  orbColor?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', orbColor, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-[22px] glass glass-specular cursor-pointer',
        'transition-[border-color] duration-500',
        className
      )}
      whileHover={{
        scale: 1.015,
        y: -3,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={onClick}
    >
      {/* Ambient orb glow behind card */}
      {orbColor && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10 transition-all duration-700"
          style={{
            width: 180,
            height: 180,
            background: `radial-gradient(circle, ${orbColor}60 0%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: 0.6,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
