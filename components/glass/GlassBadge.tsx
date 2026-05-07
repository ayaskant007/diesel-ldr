import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassBadgeProps {
  children: ReactNode;
  className?: string;
}

export function GlassBadge({ children, className = '' }: GlassBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.1em]',
      'bg-[rgba(255,255,255,0.08)] backdrop-blur-sm border border-[rgba(255,255,255,0.12)]',
      'text-[var(--text-secondary)]',
      className
    )}>
      {children}
    </span>
  );
}
