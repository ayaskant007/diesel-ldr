"use client";

import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

/**
 * SpotlightCard — inspired by ReactBits SpotlightCard component.
 * Creates a radial spotlight that follows the cursor on hover,
 * giving product cards a luxurious, interactive glow.
 */
export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(158, 126, 79, 0.15)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = divRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current?.style.setProperty("--mouse-x", `${x}px`);
    divRef.current?.style.setProperty("--mouse-y", `${y}px`);
    divRef.current?.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("spotlight-card", className)}
    >
      {children}
    </div>
  );
}
