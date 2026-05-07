"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { cn } from '@/lib/utils';

interface DraggableCardProps {
  product: Product;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function DraggableCard({ product, index, containerRef }: DraggableCardProps) {
  const [zIndex, setZIndex] = useState(index + 10);
  const [isRotating, setIsRotating] = useState(false);

  // Random initial position and rotation
  const initialX = typeof window !== 'undefined' ? (Math.random() - 0.5) * 200 : 0;
  const initialY = typeof window !== 'undefined' ? (Math.random() - 0.5) * 150 : 0;
  const initialRotate = typeof window !== 'undefined' ? (Math.random() - 0.5) * 15 : 0;

  const dragX = useMotionValue(initialX);
  const dragY = useMotionValue(initialY);
  
  const rotateX = useTransform(dragY, [-200, 200], [10, -10]);
  const rotateY = useTransform(dragX, [-200, 200], [-10, 10]);

  const handleDragStart = () => {
    setZIndex(prev => prev + 50); // Bring to front
    setIsRotating(true);
  };

  const handleDragEnd = () => {
    setIsRotating(false);
  };

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.05}
      dragTransition={{ power: 0.2, timeConstant: 200 }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      initial={{ x: initialX, y: initialY, rotate: initialRotate, opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ x: dragX, y: dragY, zIndex, rotate: isRotating ? 0 : initialRotate }}
      whileDrag={{ scale: 1.08, cursor: 'grabbing', rotate: 0, filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.5))' }}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.5 }}
      className="absolute cursor-grab active:cursor-grabbing select-none"
    >
      <div className="relative group">
        <div 
          className="relative w-[280px] h-[380px] md:w-[320px] md:h-[420px] glass-heavy metal-edge rounded-[12px] p-3 shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_70px_rgba(0,0,0,0.7)] group-active:scale-[0.98]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Noise/Grain Overlay */}
          <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] mix-blend-overlay rounded-[12px]"
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

          <div className="relative h-full w-full rounded-[8px] overflow-hidden bg-black/40">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover brightness-[0.8] contrast-[1.1] transition-transform duration-700 group-hover:scale-[1.03]"
              draggable={false}
            />
            
            {/* Polaroid-style footer */}
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.4)] to-transparent">
              <p className="font-[var(--font-display)] font-extrabold text-[12px] uppercase tracking-[0.1em] text-white/90 mb-0.5">
                {product.name}
              </p>
              <div className="flex justify-between items-center">
                <p className="font-[var(--font-display)] text-[9px] uppercase tracking-[0.2em] text-[var(--accent-red)]">
                  {product.category}
                </p>
                <p className="font-[var(--font-display)] text-[9px] uppercase tracking-[0.05em] text-white/40">
                  FRAME_{index.toString().padStart(3, '0')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Subtle specular reflection layer */}
          <div className="absolute inset-0 z-20 pointer-events-none rounded-[12px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
               style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)' }} />
        </div>
      </div>
    </motion.div>
  );
}

export function DraggableWorkbench({ items }: { items: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="h-[70vh]" />;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden section-ambient" ref={containerRef}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <p className="font-[var(--font-display)] font-black text-[clamp(100px,25vw,300px)] text-white/[0.02] uppercase select-none leading-none">
          DIESEL
        </p>
      </div>

      <div className="relative w-full h-full flex items-center justify-center p-12">
        {items.map((product, idx) => (
          <DraggableCard 
            key={product.id} 
            product={product} 
            index={idx} 
            containerRef={containerRef} 
          />
        ))}
      </div>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-10 left-12 z-50 flex items-center gap-3">
        <div className="w-10 h-[1px] bg-[var(--text-tertiary)]" />
        <p className="font-[var(--font-display)] font-bold text-[9px] uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
          DRAG TO EXPLORE THE CAMPAIGN FRAMES
        </p>
      </div>

      {/* Decorative Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[var(--accent-red)]/5 blur-[120px] pointer-events-none"
      />
    </div>
  );
}
