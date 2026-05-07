"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/products';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { LiquidOrb } from '@/components/glass/LiquidOrb';

type Category = 'ALL' | 'LIPS' | 'EYES' | 'CHEEKS' | 'GLOW';
const categories: Category[] = ['ALL', 'LIPS', 'EYES', 'CHEEKS', 'GLOW'];

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('ALL');
  const filtered = activeFilter === 'ALL' ? products : products.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen relative">
      <LiquidOrb color="rgba(37,99,235,0.4)" size={600} className="top-[-150px] left-1/2 -translate-x-1/2" opacity={0.08} delay={0} />

      <div className="pt-28 pb-10 px-6 max-w-[1400px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-3">LIMITED EDITION</p>
          <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(48px,9vw,110px)] uppercase text-[var(--text-primary)] leading-[0.95]">
            THE COLLECTION
          </h1>
          <p className="text-[var(--text-secondary)] mt-3 text-sm">6 pieces. One collaboration.</p>
        </motion.div>
        <div className="mt-6 h-[1px] bg-[var(--glass-border-dim)]" />
      </div>

      <div className="sticky top-[68px] z-40 flex justify-center px-6 mb-10">
        <GlassPanel variant="ultra" className="rounded-full px-2.5 py-1.5 inline-flex">
          <div className="flex gap-1 relative z-10" role="radiogroup" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                role="radio"
                aria-checked={activeFilter === cat}
                className={`relative font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.12em] px-4 py-1.5 rounded-full transition-all duration-300 ${
                  activeFilter === cat ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {activeFilter === cat && (
                  <motion.span
                    layoutId="filterPill"
                    className="absolute inset-0 rounded-full bg-[var(--accent-red)]"
                    style={{ boxShadow: '0 0 16px rgba(229,56,42,0.25)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/collection/${product.slug}`} className="block group">
                  <GlassCard orbColor={product.orbColor}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between p-4 pb-0">
                        <p className="font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">{product.category}</p>
                        <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)]">£{product.price}</span>
                      </div>
                      <div className="relative h-[260px] overflow-hidden mx-3 mt-2 rounded-[16px]">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[rgba(9,9,11,0.7)] to-transparent" />
                      </div>
                      <div className="p-4 pt-3">
                        <h3 className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm uppercase tracking-[0.04em] mb-2">{product.name}</h3>
                        <GlassBadge>{product.shade}</GlassBadge>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
