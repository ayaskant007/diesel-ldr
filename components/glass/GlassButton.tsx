"use client";

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}

const sizeMap = {
  sm: 'px-5 py-2 text-[10px]',
  md: 'px-7 py-3 text-[11px]',
  lg: 'px-9 py-3.5 text-[12px]',
};

export function GlassButton({
  children,
  className = '',
  size = 'md',
  variant = 'default',
  href,
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
}: GlassButtonProps) {
  const baseClass = cn(
    'relative overflow-hidden rounded-full glass-specular metal-edge',
    variant === 'accent'
      ? 'bg-[var(--accent-red)] border border-[rgba(255,59,47,0.6)] shadow-[0_0_28px_rgba(255,59,47,0.25)]'
      : 'glass',
    'font-[var(--font-display)] font-bold uppercase tracking-[0.12em]',
    'text-[var(--text-primary)] cursor-pointer select-none whitespace-nowrap',
    'transition-all duration-500 ease-[var(--ease-premium)]',
    sizeMap[size],
    fullWidth && 'w-full text-center',
    disabled && 'opacity-40 pointer-events-none',
    className
  );

  const shimmerOverlay = (
    <span
      className="absolute inset-0 z-[2] pointer-events-none overflow-hidden rounded-full"
      aria-hidden="true"
    >
      <span
        className="absolute top-0 -left-full w-[80%] h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          animation: 'btnShimmer 3s ease-in-out infinite',
        }}
      />
    </span>
  );

  const spring = {
    whileHover: {
      scale: 1.04,
      boxShadow: variant === 'accent'
        ? '0 0 48px rgba(255,59,47,0.35), 0 10px 36px rgba(0,0,0,0.45)'
        : '0 0 42px rgba(255,255,255,0.18), 0 10px 36px rgba(0,0,0,0.45)',
    },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 250, damping: 30 },
  };

  if (href) {
    return (
      <motion.div {...spring} className={cn('inline-block group', fullWidth && 'w-full')}>
        <Link href={href} className={baseClass}>
          {shimmerOverlay}
          <span className="relative z-[3]">{children}</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...spring}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(baseClass, 'group')}
    >
      {shimmerOverlay}
      <span className="relative z-[3]">{children}</span>
    </motion.button>
  );
}
