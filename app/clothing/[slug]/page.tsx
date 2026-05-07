"use client";

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { getClothingBySlug, clothingProducts } from '@/lib/products';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import { useCart } from '@/hooks/useCart';

export default function ClothingProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getClothingBySlug(slug);
  const addItem = useCart((state) => state.addItem);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] font-extrabold text-4xl text-[var(--text-primary)] mb-4">NOT FOUND</h1>
          <GlassButton href="/clothing">BACK TO CLOTHING</GlassButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <LiquidOrb color={`${product.orbColor}80`} size={500} className="top-[-100px] right-[-100px]" opacity={0.12} delay={0} duration={14} pulse />

      <div className="pt-24 pb-20 px-4 sm:px-6 max-w-[1200px] mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/clothing" className="inline-flex items-center gap-2 font-[var(--font-display)] font-semibold text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-500">
            <ArrowLeft size={14} /> Back to Clothing
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassPanel variant="heavy" prismatic className="rounded-[22px] overflow-hidden cut-panel">
              <div className="relative aspect-[3/4] z-10">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-6"
          >
            <div>
              <GlassBadge className="mb-4">{product.category}</GlassBadge>
              <h1 className="font-[var(--font-display)] font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-[var(--text-primary)] leading-tight mb-3">
                {product.name}
              </h1>
              <p className="font-[var(--font-display)] font-bold text-2xl text-[var(--accent-red)]">
                £{product.price}
              </p>
            </div>

            <p className="text-[var(--text-secondary)] italic text-lg">{product.tagline}</p>

            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              {product.description}
            </p>

            <div>
              <p className="font-[var(--font-display)] font-bold text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] mb-3">SIZES</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className="font-[var(--font-display)] font-semibold text-[11px] uppercase tracking-[0.08em] px-4 py-2 rounded-full glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--glass-border-bright)] transition-all duration-400"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <GlassButton
                variant="accent"
                size="lg"
                fullWidth
                onClick={() => addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                  quantity: 1,
                })}
              >
                <span className="flex items-center justify-center gap-2">
                  <ShoppingBag size={16} /> ADD TO BAG
                </span>
              </GlassButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
