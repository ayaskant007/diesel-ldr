"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clothingProducts } from '@/lib/products';
import { ClothingCard } from '@/components/glass/ClothingCard';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LiquidOrb } from '@/components/glass/LiquidOrb';

type ClothingFilter = 'ALL' | 'TOPS' | 'OUTERWEAR' | 'DENIM' | 'BOTTOMS' | 'ACCESSORIES';
const categories: ClothingFilter[] = ['ALL', 'TOPS', 'OUTERWEAR', 'DENIM', 'BOTTOMS', 'ACCESSORIES'];

export default function ClothingPage() {
  const [activeFilter, setActiveFilter] = useState<ClothingFilter>('ALL');
  const filtered = activeFilter === 'ALL'
    ? clothingProducts
    : clothingProducts.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen relative">
      <LiquidOrb color="rgba(75,125,255,0.35)" size={650} className="top-[-180px] left-1/2 -translate-x-1/2" opacity={0.08} delay={0} duration={16} />
      <LiquidOrb color="rgba(199,168,107,0.3)" size={400} className="bottom-[20%] right-[-100px]" opacity={0.06} delay={3} duration={12} />

      <div className="pt-28 pb-10 px-6 max-w-[1400px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-3">
            DIESEL × LDR APPAREL
          </p>
          <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(48px,9vw,110px)] uppercase text-[var(--text-primary)] leading-[0.95]">
            THE CLOTHING
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 text-sm max-w-md">
            Wear the collaboration. Eight pieces that blur the line between fashion editorial and the everyday.
          </p>
        </motion.div>
        <div className="mt-6 section-divider" />
      </div>

      <div className="sticky top-[68px] z-40 flex justify-center px-6 mb-10">
        <GlassPanel variant="ultra" className="rounded-full px-2.5 py-1.5 inline-flex">
          <div className="flex gap-1 relative z-10 flex-wrap justify-center" role="radiogroup" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                role="radio"
                aria-checked={activeFilter === cat}
                className={`relative font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full transition-all duration-500 ease-[var(--ease-premium)] ${
                  activeFilter === cat ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {activeFilter === cat && (
                  <motion.span
                    layoutId="clothingFilterPill"
                    className="absolute inset-0 rounded-full bg-[var(--accent-red)]"
                    style={{ boxShadow: '0 0 20px rgba(255,59,47,0.30)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-28 relative z-10">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bento-grid"
          >
            {filtered.map((product, idx) => (
              <ClothingCard
                key={product.id}
                product={product}
                featured={product.featured}
                index={idx}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
