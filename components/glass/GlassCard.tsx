"use client";

import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  orbColor?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', orbColor, onClick }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden rounded-[18px] glass glass-specular spotlight-card metal-edge cursor-pointer',
        'transition-[border-color,box-shadow] duration-600',
        className
      )}
      whileHover={{
        scale: 1.012,
        y: -4,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.8 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
    >
      {orbColor && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10 transition-all duration-1000"
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${orbColor}70 0%, transparent 70%)`,
            filter: 'blur(45px)',
            opacity: 0.65,
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  );
}
