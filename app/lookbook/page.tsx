"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassButton } from '@/components/glass/GlassButton';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import { useRef } from 'react';

const editorialRows = [
  { product: products[0], reverse: false },
  { product: products[4], reverse: true },
  { product: products[5], reverse: false },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function LookbookPage() {
  const filmstripRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/hero.png" alt="Campaign" fill priority className="object-cover brightness-[0.35] contrast-[1.1]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-transparent opacity-80" />
        </div>
        <LiquidOrb color="rgba(229,56,42,0.5)" size={500} className="bottom-[-120px] right-[-60px]" opacity={0.18} delay={0} duration={14} />
        <LiquidOrb color="rgba(37,99,235,0.4)" size={300} className="top-[-30px] left-[-50px]" opacity={0.12} delay={2} />

        <div className="relative z-10 p-6 md:p-12 pb-20 md:pb-28">
          <GlassPanel variant="heavy" prismatic className="rounded-[24px] p-8 md:p-12 max-w-[480px]">
            <div className="relative z-10">
              <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-3">EDITORIAL CAMPAIGN 2024</p>
              <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(36px,6vw,60px)] uppercase text-[var(--text-primary)] leading-[0.95] mb-3">
                THE LOOKBOOK
              </h1>
              <p className="text-[var(--text-secondary)] text-base">
                Raw. Unapologetic. Beautiful.
              </p>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* FILMSTRIP */}
      <section className="py-20 overflow-hidden section-ambient">
        <div className="max-w-[1400px] mx-auto px-6 mb-6">
          <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)]">CAMPAIGN FRAMES</p>
        </div>
        <div ref={filmstripRef} className="flex gap-4 px-6 overflow-x-auto no-scrollbar">
          {products.map((product) => (
            <GlassPanel key={product.id} variant="heavy" className="rounded-[18px] overflow-hidden shrink-0">
              <div className="relative h-[55vh] w-[38vh] z-10">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover brightness-[0.8]" sizes="38vh" />
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[rgba(9,9,11,0.8)] to-transparent">
                  <p className="font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.08em] text-[var(--text-primary)]">{product.name}</p>
                  <p className="font-[var(--font-display)] text-[10px] uppercase text-[var(--text-tertiary)] mt-0.5">{product.category}</p>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* STATEMENT */}
      <section className="py-28 relative">
        <LiquidOrb color="rgba(37,99,235,0.3)" size={220} className="top-[25%] left-[30%]" opacity={0.08} delay={0} />
        <div className="max-w-[620px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <GlassPanel variant="heavy" prismatic className="rounded-[24px] p-10 md:p-14 text-center">
              <div className="relative z-10">
                <div className="w-8 h-[2px] bg-[var(--accent-red)] mx-auto mb-8" />
                <blockquote className="font-[var(--font-display)] font-extrabold text-[clamp(20px,3.5vw,34px)] uppercase text-[var(--text-primary)] leading-[1.3]">
                  &quot;WILL YOU STILL LOVE ME WHEN I&apos;M NO LONGER YOUNG AND BEAUTIFUL?&quot;
                </blockquote>
                <div className="w-8 h-[2px] bg-[var(--accent-red)] mx-auto mt-8" />
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL ROWS */}
      <section className="py-28 section-ambient">
        <div className="max-w-[1400px] mx-auto px-6 space-y-28">
          {editorialRows.map(({ product, reverse }) => (
            <motion.div key={product.id} {...fadeUp} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}>
              <div className="relative" style={{ direction: 'ltr' }}>
                <GlassPanel variant="heavy" prismatic className="rounded-[20px] overflow-hidden relative z-10">
                  <div className="relative aspect-[4/5] z-10">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover brightness-[0.8]" sizes="50vw" />
                  </div>
                </GlassPanel>
              </div>
              <div className="space-y-5" style={{ direction: 'ltr' }}>
                <p className="font-[var(--font-display)] font-bold text-[10px] uppercase tracking-[0.3em] text-[var(--accent-red)]">{product.category}</p>
                <h2 className="font-[var(--font-display)] font-extrabold text-2xl md:text-3xl uppercase text-[var(--text-primary)]">{product.name}</h2>
                <p className="text-[var(--text-secondary)] italic text-base">{product.tagline}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed">{product.description}</p>
                <Link href={`/collection/${product.slug}`} className="inline-flex items-center gap-2 font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.12em] text-[var(--accent-red)] hover:text-[var(--text-primary)] transition-colors">
                  VIEW PRODUCT →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6">
        <motion.div {...fadeUp}>
          <h2 className="font-[var(--font-display)] font-extrabold text-[clamp(40px,7vw,80px)] uppercase text-[var(--text-primary)] mb-6">SHOP THE COLLECTION</h2>
          <GlassButton href="/collection" size="lg" variant="accent">VIEW ALL PRODUCTS</GlassButton>
        </motion.div>
      </section>
    </div>
  );
}
