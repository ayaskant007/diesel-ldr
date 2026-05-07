"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import { useCurrencyStore, formatPrice } from '@/hooks/useCurrency';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount } = useCart();
  const currencyCode = useCurrencyStore((state) => state.currencyCode);
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);

  return (
    <div className="min-h-screen relative">
      <LiquidOrb color="rgba(229,56,42,0.4)" size={400} className="top-[-60px] right-[-120px]" opacity={0.1} delay={0} />

      <div className="max-w-[680px] mx-auto px-6 pt-28 pb-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-2">CHECKOUT</p>
          <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(36px,7vw,64px)] uppercase text-[var(--text-primary)] mb-10">
            YOUR BAG
          </h1>
        </motion.div>

        {getCartCount() === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlassPanel variant="heavy" prismatic className="rounded-[24px] p-14 text-center">
              <div className="relative z-10 flex flex-col items-center gap-5">
                <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-2">
                  <ShoppingBag size={28} strokeWidth={1.5} className="text-[var(--text-tertiary)]" />
                </div>
                <h2 className="font-[var(--font-display)] font-extrabold text-xl uppercase text-[var(--text-primary)]">YOUR BAG IS EMPTY</h2>
                <p className="text-[var(--text-tertiary)] text-sm">Nothing here yet. Go find something bold.</p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <GlassButton href="/collection" variant="accent">SHOP BEAUTY</GlassButton>
                  <GlassButton href="/clothing">SHOP CLOTHING</GlassButton>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <GlassPanel className="rounded-[20px] overflow-hidden">
              <div className="relative z-10 divide-y divide-[var(--glass-border-dim)]">
                <AnimatePresence>
                  {items.map((item) => {
                    const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
                    return (
                      <motion.div
                        key={itemKey}
                        layout
                        exit={{ opacity: 0, x: -40, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-4 p-4"
                      >
                        <div className="shrink-0 w-14 h-14 rounded-[10px] overflow-hidden glass">
                          <div className="relative w-full h-full">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                          </div>
                        </div>

                        <div className="flex-grow min-w-0">
                          <h3 className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)] uppercase truncate">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-0.5">
                            <GlassBadge className="text-[8px] px-1.5 py-0">{item.type === 'clothing' ? 'APPAREL' : 'BEAUTY'}</GlassBadge>
                            {item.size && <span className="text-[10px] text-[var(--text-tertiary)]">Size: {item.size}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)] transition-colors duration-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)] w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-7 rounded-full glass flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--glass-bg-hover)] transition-colors duration-300"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)] shrink-0 w-max text-right">
                          {formatPrice(item.price * item.quantity, currencyCode, exchangeRate)}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[var(--text-tertiary)] hover:text-[var(--accent-red)] transition-colors duration-300 shrink-0"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} strokeWidth={1.5} />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </GlassPanel>

            <GlassPanel variant="heavy" prismatic className="rounded-[20px] p-7">
              <div className="relative z-10 space-y-5">
                <div className="flex justify-between items-baseline">
                  <span className="font-[var(--font-display)] font-bold text-sm uppercase tracking-[0.12em] text-[var(--text-primary)]">Subtotal</span>
                  <span className="font-[var(--font-display)] font-extrabold text-2xl text-[var(--text-primary)]">{formatPrice(getCartTotal(), currencyCode, exchangeRate)}</span>
                </div>
                <p className="text-[11px] text-[var(--text-tertiary)]">Shipping calculated at checkout.</p>
                <GlassButton fullWidth size="lg" variant="accent">PROCEED TO CHECKOUT</GlassButton>
              </div>
            </GlassPanel>
          </div>
        )}
      </div>
    </div>
  );
}
