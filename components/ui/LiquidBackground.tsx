"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LiquidBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}>
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-[var(--color-coal)]" />
      
      {/* Liquid Blobs */}
      <motion.div
        animate={{
          x: ["-5%", "5%", "-5%"],
          y: ["-5%", "5%", "-5%"],
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-[var(--color-brass)] mix-blend-color-dodge opacity-20 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["5%", "-5%", "5%"],
          scale: [1.1, 1, 1.1],
          rotate: [0, -90, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[20%] -right-[20%] w-[50vw] h-[50vw] rounded-full bg-[var(--color-copper)] mix-blend-color-dodge opacity-15 blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: ["0%", "10%", "0%"],
          y: ["10%", "0%", "10%"],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] rounded-full bg-[var(--color-gold)] mix-blend-color-dodge opacity-10 blur-[150px]"
      />

      {/* Noise layer for vintage feel */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
