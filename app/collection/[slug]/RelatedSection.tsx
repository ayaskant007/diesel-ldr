"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { GlassCard } from '@/components/glass/GlassCard';
import { useCurrencyStore, formatPrice } from '@/hooks/useCurrency';

export function RelatedProductSection({ products }: { products: Product[] }) {
  const currencyCode = useCurrencyStore((state) => state.currencyCode);
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);

  if (products.length === 0) return null;

  return (
    <div className="mt-20 md:mt-28 border-t border-[var(--glass-border-dim)] pt-12 md:pt-14">
      <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-2 md:mb-3">RECOMMENDED</p>
      <h2 className="font-[var(--font-display)] font-extrabold text-2xl md:text-3xl uppercase tracking-[0.06em] text-[var(--text-primary)] mb-8">YOU MAY ALSO LIKE</h2>
      <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-5 pb-6 no-scrollbar">
        {products.map(related => (
          <Link key={related.id} href={`/collection/${related.slug}`} className="min-w-[260px] lg:min-w-0 flex-shrink-0 group">
            <GlassCard orbColor={related.orbColor}>
              <div className="relative z-10">
                <div className="relative h-[180px] overflow-hidden mx-3 mt-3 rounded-[14px]">
                  <Image src={related.images[0]} alt={related.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="33vw" />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm uppercase">{related.name}</h3>
                  <span className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm">
                    {formatPrice(related.price, currencyCode, exchangeRate)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
