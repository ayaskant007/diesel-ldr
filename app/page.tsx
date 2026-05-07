"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { products, clothingProducts } from '@/lib/products';
import { ArrowRight, ChevronDown, Shirt, Sparkles } from 'lucide-react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { GlassInput } from '@/components/glass/GlassInput';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import { ClothingCard } from '@/components/glass/ClothingCard';
import { useCurrencyStore, formatPrice } from '@/hooks/useCurrency';

const fadeUp = {
  initial: { opacity: 0, y: 28, filter: 'blur(6px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.12 } },
  viewport: { once: true, margin: '-40px' as const },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lookbookRef = useRef<HTMLDivElement>(null);
  const currencyCode = useCurrencyStore((state) => state.currencyCode);
  const exchangeRate = useCurrencyStore((state) => state.exchangeRate);
  
  const { scrollY } = useScroll();
  const { scrollYProgress: lookbookProgress } = useScroll({
    target: lookbookRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollY, [0, 800], [0, 140]);
  const parallaxY2 = useTransform(lookbookProgress, [0, 1], [-60, 60]);
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.08]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-eyebrow',
        { opacity: 0, y: 12, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, delay: 0.4 }
      )
      .fromTo('.hero-title-1',
        { opacity: 0, y: 20, filter: 'blur(10px)', clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)', duration: 1.0 },
        '-=0.3'
      )
      .fromTo('.hero-title-2',
        { opacity: 0, y: 20, filter: 'blur(10px)', clipPath: 'inset(0 100% 0 0)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0% 0 0)', duration: 1.0 },
        '-=0.6'
      )
      .fromTo('.hero-sub',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )
      .fromTo('.hero-cta',
        { opacity: 0, y: 10, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 },
        '-=0.2'
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-end justify-start">
        <motion.div style={{ y: parallaxY, scale: heroScale }} className="absolute inset-0 z-0 will-change-transform">
          <Image src="/images/hero.png" alt="DIESEL × LDR Campaign" fill priority className="object-cover brightness-[0.30] contrast-[1.25] saturate-[1.15]" sizes="100vw" />
          <div className="absolute inset-0 hero-backdrop" />
          <div className="absolute inset-0 hero-texture" />
        </motion.div>

        <LiquidOrb color="rgba(37,99,235,0.5)" size={550} className="top-[-80px] right-[-120px]" opacity={0.22} delay={0} duration={16} pulse />
        <LiquidOrb color="rgba(229,56,42,0.4)" size={400} className="bottom-[-40px] left-[-80px]" opacity={0.18} delay={3} duration={13} pulse />
        <LiquidOrb color="rgba(199,168,107,0.3)" size={250} className="top-[30%] right-[15%]" opacity={0.10} delay={5} duration={10} />

        <div className="relative z-10 p-4 sm:p-6 md:p-12 pb-20 md:pb-28 w-full max-w-[660px]">
          <GlassPanel variant="heavy" breathe prismatic glow="rgba(75,125,255,0.15)" className="rounded-[26px] p-8 sm:p-10 md:p-14 cut-panel">
            <div className="relative z-10">
              <p className="hero-eyebrow opacity-0 font-[var(--font-display)] font-bold text-[11px] tracking-[0.25em] uppercase text-[var(--accent-red)] mb-4">
                DIESEL × LANA DEL REY
              </p>
              <h1 className="mb-5 break-words">
                <span className="hero-title-1 block opacity-0 font-[var(--font-display)] font-extrabold text-[clamp(42px,9vw,80px)] leading-[0.93] uppercase text-[var(--text-primary)] tracking-tight">
                  YOUNG
                </span>
                <span className="hero-title-2 block opacity-0 font-[var(--font-display)] font-extrabold text-[clamp(42px,9vw,80px)] leading-[0.93] uppercase text-[var(--text-primary)] tracking-tight">
                  AND BEAUTIFUL
                </span>
              </h1>
              <p className="hero-sub opacity-0 text-[var(--text-secondary)] text-base mb-8 leading-relaxed max-w-sm">
                Six objects. Eight garments. One collaboration. A limited-edition collection that refuses to be ordinary.
              </p>
              <div className="hero-cta opacity-0 flex flex-wrap gap-3">
                <GlassButton href="/collection" size="lg" variant="accent">SHOP BEAUTY →</GlassButton>
                <GlassButton href="/clothing" size="lg">SHOP CLOTHING</GlassButton>
              </div>
            </div>
          </GlassPanel>
        </div>

        <motion.div style={{ opacity: scrollOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={22} strokeWidth={1.5} className="text-[var(--text-secondary)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="relative z-20 -mt-5 mx-auto max-w-[880px] px-4 w-full md:w-[calc(100%-48px)]">
        <GlassPanel variant="ultra" className="rounded-full overflow-hidden py-3 metal-edge">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-void)] via-transparent to-[var(--bg-void)] z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] relative z-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                {products.map((p) => (
                  <span key={`${i}-${p.id}`} className="flex items-center">
                    <span className="font-[var(--font-display)] font-semibold text-[13px] uppercase tracking-[0.06em] text-[var(--text-primary)] opacity-75 px-5">{p.name}</span>
                    <span className="text-[var(--accent-red)] text-[5px]">●</span>
                  </span>
                ))}
                {clothingProducts.slice(0, 3).map((p) => (
                  <span key={`${i}-${p.id}`} className="flex items-center">
                    <span className="font-[var(--font-display)] font-semibold text-[13px] uppercase tracking-[0.06em] text-[var(--text-primary)] opacity-75 px-5">{p.name}</span>
                    <span className="text-[var(--accent-blue)] text-[5px]">●</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* ═══ CATEGORY STRIP ═══ */}
      <section className="py-14 px-4 sm:px-6 relative z-10">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Sparkles, label: 'Beauty', desc: '6 Limited Pieces', href: '/collection', color: 'var(--accent-red)' },
              { icon: Shirt, label: 'Clothing', desc: '8 Apparel Items', href: '/clothing', color: 'var(--accent-blue)' },
              { icon: Sparkles, label: 'Lookbook', desc: 'The Campaign', href: '/lookbook', color: 'var(--accent-brass)' },
              { icon: Sparkles, label: 'About', desc: 'The Collaboration', href: '/about', color: 'var(--accent-steel)' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={item.href} className="block group">
                  <GlassPanel variant="default" className="rounded-[16px] p-5 text-center hover:border-[rgba(255,255,255,0.35)] transition-all duration-500">
                    <div className="relative z-10">
                      <item.icon size={22} strokeWidth={1.5} className="mx-auto mb-3 transition-colors duration-500" style={{ color: item.color }} />
                      <h3 className="font-[var(--font-display)] font-bold text-sm uppercase tracking-[0.08em] text-[var(--text-primary)] mb-1">{item.label}</h3>
                      <p className="text-[var(--text-tertiary)] text-[11px]">{item.desc}</p>
                    </div>
                  </GlassPanel>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COLLECTION TEASER ═══ */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 section-ambient">
        <LiquidOrb color="rgba(37,99,235,0.4)" size={500} className="top-[-100px] left-[-140px]" opacity={0.10} delay={0} duration={14} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={14} className="text-[var(--accent-red)]" />
              <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)]">LIMITED EDITION BEAUTY</p>
            </div>
            <h2 className="font-[var(--font-display)] font-extrabold text-[clamp(42px,7vw,90px)] uppercase text-[var(--text-primary)] leading-[0.93] mb-4">
              THE COLLECTION
            </h2>
            <p className="text-[var(--text-secondary)] text-base mb-14 max-w-lg leading-relaxed">
              Six pieces. One collaboration. Objects that are neither makeup nor industrial design — but something entirely new.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-10">
            {products.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link href={`/collection/${product.slug}`} className="block group">
                  <GlassCard orbColor={product.orbColor}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between p-4 pb-0">
                        <p className="font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">{product.category}</p>
                        <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)]">{formatPrice(product.price, currencyCode, exchangeRate)}</span>
                      </div>
                      <div className="relative h-[280px] overflow-hidden mx-3 mt-3 rounded-[14px]">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-900 ease-[var(--ease-premium)] group-hover:scale-[1.05]" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[rgba(3,4,8,0.75)] to-transparent" />
                      </div>
                      <div className="p-4 pt-4 flex justify-between items-center">
                        <h3 className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm uppercase tracking-[0.04em]">{product.name}</h3>
                        <GlassBadge>{product.shade}</GlassBadge>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp}>
            <Link href="/collection" className="inline-flex items-center gap-2 font-[var(--font-display)] font-bold text-[12px] uppercase tracking-[0.12em] text-[var(--accent-red)] hover:text-[var(--text-primary)] transition-colors duration-500">
              View Full Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION DIVIDER ═══ */}
      <div className="section-divider mx-6 max-w-[1400px] md:mx-auto" />

      {/* ═══ CLOTHING TEASER ═══ */}
      <section className="relative py-20 md:py-28 px-4 sm:px-6 section-clothing">
        <LiquidOrb color="rgba(199,168,107,0.35)" size={450} className="top-[-80px] right-[-100px]" opacity={0.10} delay={1} duration={14} />
        <LiquidOrb color="rgba(75,125,255,0.3)" size={350} className="bottom-[-60px] left-[-80px]" opacity={0.08} delay={4} duration={11} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <div className="flex items-center gap-3 mb-3">
              <Shirt size={14} className="text-[var(--accent-blue)]" />
              <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-blue)]">DIESEL × LDR APPAREL</p>
            </div>
            <h2 className="font-[var(--font-display)] font-extrabold text-[clamp(42px,7vw,90px)] uppercase text-[var(--text-primary)] leading-[0.93] mb-4">
              THE CLOTHING
            </h2>
            <p className="text-[var(--text-secondary)] text-base mb-14 max-w-lg leading-relaxed">
              Eight pieces that blur the line between fashion editorial and the everyday. Wear the collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10">
            {clothingProducts.filter(p => p.featured).concat(clothingProducts.filter(p => !p.featured).slice(0, 1)).map((product, idx) => (
              <ClothingCard key={product.id} product={product} index={idx} />
            ))}
          </div>

          <motion.div {...fadeUp}>
            <Link href="/clothing" className="inline-flex items-center gap-2 font-[var(--font-display)] font-bold text-[12px] uppercase tracking-[0.12em] text-[var(--accent-blue)] hover:text-[var(--text-primary)] transition-colors duration-500">
              View Full Clothing Line <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION DIVIDER ═══ */}
      <div className="section-divider mx-6 max-w-[1400px] md:mx-auto" />

      {/* ═══ STATEMENT ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <LiquidOrb color="rgba(229,56,42,0.3)" size={220} className="left-[20%] top-[30%]" opacity={0.12} delay={0} pulse />
        <LiquidOrb color="rgba(37,99,235,0.3)" size={200} className="right-[20%] bottom-[30%]" opacity={0.10} delay={2} pulse />

        <div className="max-w-[720px] mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassPanel variant="heavy" prismatic glow="rgba(255,59,47,0.10)" className="rounded-[26px] p-8 sm:p-12 md:p-16 text-center cut-panel">
              <div className="relative z-10">
                <div className="w-10 h-[2px] bg-[var(--accent-red)] mx-auto mb-8 sm:mb-10 shadow-[0_0_12px_rgba(255,59,47,0.4)]" />
                <blockquote className="font-[var(--font-display)] font-extrabold text-[clamp(24px,4.5vw,46px)] uppercase text-[var(--text-primary)] leading-[1.15] mb-8 sm:mb-10">
                  &quot;YOUNG AND BEAUTIFUL IS A WAY OF DRESSING.&quot;
                </blockquote>
                <cite className="font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] not-italic">
                  — DIESEL × LANA DEL REY
                </cite>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>

      {/* ═══ LOOKBOOK TEASER ═══ */}
      <section ref={lookbookRef} className="py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden section-ambient">
        <LiquidOrb color="rgba(37,99,235,0.4)" size={450} className="right-[-120px] top-[-80px]" opacity={0.10} delay={1} duration={14} />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 md:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <GlassPanel variant="heavy" prismatic className="rounded-[22px] overflow-hidden cut-panel border-0!">
              <div className="relative aspect-[4/5] z-10 overflow-hidden">
                <motion.div
                  className="absolute inset-[0%_-10%] scale-110"
                  style={{ y: parallaxY2 }}
                >
                  <Image src="/images/hero.png" alt="Campaign editorial" fill className="object-cover brightness-[0.65] contrast-[1.10]" sizes="(max-width: 768px) 100vw, 55vw" />
                </motion.div>
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
            className="space-y-5"
          >
            <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)]">EDITORIAL</p>
            <h2 className="font-[var(--font-display)] font-extrabold text-3xl md:text-4xl uppercase tracking-[0.04em] text-[var(--text-primary)]">THE CAMPAIGN</h2>
            <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">
              Bold beauty meets industrial craft. A visual narrative that refuses polish and embraces raw, unapologetic confidence.
            </p>
            <GlassButton href="/lookbook">EXPLORE THE LOOKBOOK</GlassButton>
          </motion.div>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section className="py-24 md:py-32 px-4 sm:px-6 relative">
        <LiquidOrb color="rgba(37,99,235,0.3)" size={320} className="top-[25%] left-1/2 -translate-x-1/2" opacity={0.10} delay={0} pulse />

        <div className="max-w-[540px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassPanel variant="heavy" breathe prismatic glow="rgba(75,125,255,0.10)" className="rounded-[26px] p-8 sm:p-10 md:p-14 text-center cut-panel">
              <div className="relative z-10">
                <h2 className="font-[var(--font-display)] font-extrabold text-3xl md:text-4xl uppercase text-[var(--text-primary)] mb-2">
                  GET IT FIRST.
                </h2>
                <p className="text-[var(--text-tertiary)] text-sm mb-8">No spam. Just drops.</p>
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex-grow">
                    <GlassInput type="email" placeholder="YOUR EMAIL" required />
                  </div>
                  <GlassButton type="submit" size="md" variant="accent">NOTIFY ME</GlassButton>
                </form>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
