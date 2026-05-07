import { cn } from '@/lib/utils';

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function GlassInput({ className = '', ...props }: GlassInputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-5 py-3 rounded-full glass font-[var(--font-display)] font-semibold',
        'text-[11px] uppercase tracking-[0.14em] text-[var(--text-primary)]',
        'placeholder:text-[var(--text-tertiary)]',
        'focus:outline-none focus:border-[rgba(255,255,255,0.35)] focus:shadow-[0_0_20px_rgba(255,255,255,0.08)]',
        'transition-all duration-300',
        className
      )}
    />
  );
}
