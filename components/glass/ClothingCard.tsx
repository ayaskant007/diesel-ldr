"use client";

import { ReactNode, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ClothingProduct } from '@/lib/products';
import { GlassBadge } from './GlassBadge';

interface ClothingCardProps {
  product: ClothingProduct;
  featured?: boolean;
  index?: number;
}

export function ClothingCard({ product, featured = false, index = 0 }: ClothingCardProps) {
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
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(featured && 'bento-featured')}
    >
      <Link href={`/clothing/${product.slug}`} className="block group h-full">
        <motion.div
          ref={cardRef}
          className="relative overflow-hidden rounded-[18px] glass glass-specular spotlight-card metal-edge cursor-pointer h-full transition-[border-color,box-shadow] duration-600"
          whileHover={{ scale: 1.01, y: -3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 30, mass: 0.8 }}
          onMouseMove={handleMouseMove}
        >
          {product.orbColor && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none -z-10 transition-all duration-1000"
              style={{
                width: featured ? 260 : 180,
                height: featured ? 260 : 180,
                background: `radial-gradient(circle, ${product.orbColor}60 0%, transparent 70%)`,
                filter: 'blur(50px)',
                opacity: 0.6,
              }}
              aria-hidden="true"
            />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between p-4 pb-0">
              <p className="font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
                {product.category}
              </p>
              <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)]">
                £{product.price}
              </span>
            </div>

            <div className={cn(
              "relative overflow-hidden mx-3 mt-2 rounded-[16px]",
              featured ? "h-[380px] md:h-[480px]" : "h-[300px]"
            )}>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-900 ease-[var(--ease-premium)] group-hover:scale-[1.05]"
                sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 25vw"}
              />
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgba(3,4,8,0.80)] to-transparent" />

              <div className="quick-view-overlay">
                <span className="font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.2em] text-white border border-white/30 rounded-full px-6 py-2.5 backdrop-blur-sm">
                  VIEW DETAILS
                </span>
              </div>
            </div>

            <div className="p-4 pt-3">
              <h3 className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm uppercase tracking-[0.04em] mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-[var(--text-tertiary)] text-xs mb-3 line-clamp-1">
                {product.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.slice(0, 4).map((size) => (
                  <GlassBadge key={size} className="text-[8px] px-2 py-0.5">{size}</GlassBadge>
                ))}
                {product.sizes.length > 4 && (
                  <GlassBadge className="text-[8px] px-2 py-0.5">+{product.sizes.length - 4}</GlassBadge>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
