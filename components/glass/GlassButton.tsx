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
      ? 'bg-[var(--accent-red)] border border-[rgba(229,56,42,0.5)] shadow-[0_0_24px_rgba(229,56,42,0.2)]'
      : 'glass',
    'font-[var(--font-display)] font-bold uppercase tracking-[0.12em]',
    'text-[var(--text-primary)] cursor-pointer select-none whitespace-nowrap',
    'transition-all duration-300 ease-[var(--ease-glass)]',
    sizeMap[size],
    fullWidth && 'w-full text-center',
    disabled && 'opacity-40 pointer-events-none',
    className
  );

  const spring = {
    whileHover: {
      scale: 1.03,
      boxShadow: variant === 'accent'
        ? '0 0 40px rgba(229,56,42,0.30), 0 8px 32px rgba(0,0,0,0.4)'
        : '0 0 36px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.4)',
    },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  };

  if (href) {
    return (
      <motion.div {...spring} className={cn('inline-block', fullWidth && 'w-full')}>
        <Link href={href} className={baseClass}>
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
      className={baseClass}
    >
      <span className="relative z-[3]">{children}</span>
    </motion.button>
  );
}
