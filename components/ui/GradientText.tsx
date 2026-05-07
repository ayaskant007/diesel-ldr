"use client";

import { useState, useRef, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

/**
 * GradientText — adapted from ReactBits GradientText.
 * Animates a gradient sweep across text, creating a liquid-gold shimmer.
 * Customised with brass/gold/copper brand palette by default.
 */
export function GradientText({
  children,
  className = "",
  colors = ["#9E7E4F", "#C9A84C", "#D4836A", "#9E7E4F"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const [isPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    const fullCycle = animationDuration * 2;
    const cycleTime = elapsedRef.current % fullCycle;
    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100);
    } else {
      progress.set(
        100 - ((cycleTime - animationDuration) / animationDuration) * 100
      );
    }
  });

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);

  const gradientColors = [...colors, colors[0]].join(", ");

  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${gradientColors})`,
    backgroundSize: "300% 100%",
    backgroundRepeat: "repeat" as const,
  };

  return (
    <motion.span
      className={cn(
        "inline-block",
        showBorder && "gradient-text-border",
        className
      )}
    >
      <motion.span
        className="bg-clip-text text-transparent"
        style={{
          ...gradientStyle,
          backgroundPosition,
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
