"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LiquidGlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LiquidGlassCard({ children, className, onClick }: LiquidGlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-sm group",
        onClick && "cursor-pointer",
        className
      )}
      whileHover="hover"
      initial="initial"
    >
      {/* Liquid border gradient animation */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--color-brass)_360deg)] animate-[spin_4s_linear_infinite] opacity-50" />
      </div>

      {/* Glass Panel */}
      <div className="absolute inset-[1px] z-10 bg-[var(--color-coal)]/40 backdrop-blur-md border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(158,126,79,0.3)] transition-colors duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]" />
      
      {/* Subtle top glare */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Content */}
      <div className="relative z-30 h-full">
        {children}
      </div>
    </motion.div>
  );
}
