"use client";

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { products } from '@/lib/products';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassButton } from '@/components/glass/GlassButton';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { GlassInput } from '@/components/glass/GlassInput';
import { LiquidOrb } from '@/components/glass/LiquidOrb';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 800], [0, 120]);
  const scrollOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 10, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5, delay: 0.3 })
        .fromTo('.hero-title-1', { opacity: 0, y: 16, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.2')
        .fromTo('.hero-title-2', { opacity: 0, y: 16, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, '-=0.4')
        .fromTo('.hero-sub', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
        .fromTo('.hero-cta', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.15');
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col">
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-end justify-start">
        <motion.div style={{ y: parallaxY }} className="absolute inset-0 z-0 will-change-transform">
          <Image src="/images/hero.png" alt="DIESEL × LDR Campaign" fill priority className="object-cover brightness-[0.4] contrast-[1.1]" sizes="100vw" />
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse 50% 50% at 60% 30%, rgba(37,99,235,0.12) 0%, transparent 70%),
              radial-gradient(ellipse 40% 50% at 30% 70%, rgba(229,56,42,0.08) 0%, transparent 60%),
              linear-gradient(to top, var(--bg-void) 0%, transparent 50%)
            `
          }} />
        </motion.div>

        <LiquidOrb color="rgba(37,99,235,0.5)" size={500} className="top-[-60px] right-[-100px]" opacity={0.2} delay={0} duration={14} />
        <LiquidOrb color="rgba(229,56,42,0.4)" size={350} className="bottom-[-30px] left-[-60px]" opacity={0.15} delay={3} duration={11} />

        <div className="relative z-10 p-6 md:p-12 pb-20 md:pb-28 w-full max-w-[640px]">
          <GlassPanel variant="heavy" breathe prismatic className="rounded-[28px] p-10 md:p-14">
            <div className="relative z-10">
              <p className="hero-eyebrow opacity-0 font-[var(--font-display)] font-bold text-[11px] tracking-[0.25em] uppercase text-[var(--accent-red)] mb-4">
                DIESEL × LANA DEL REY
              </p>
              <h1 className="mb-5">
                <span className="hero-title-1 block opacity-0 font-[var(--font-display)] font-extrabold text-[clamp(50px,10vw,96px)] leading-[0.95] uppercase text-[var(--text-primary)]">
                  YOUNG
                </span>
                <span className="hero-title-2 block opacity-0 font-[var(--font-display)] font-extrabold text-[clamp(50px,10vw,96px)] leading-[0.95] uppercase text-[var(--text-primary)]">
                  AND BEAUTIFUL
                </span>
              </h1>
              <p className="hero-sub opacity-0 text-[var(--text-secondary)] text-base mb-8 leading-relaxed max-w-sm">
                Six objects. One collaboration. A limited-edition beauty collection that refuses to be ordinary.
              </p>
              <div className="hero-cta opacity-0">
                <GlassButton href="/collection" size="lg" variant="accent">SHOP THE COLLECTION →</GlassButton>
              </div>
            </div>
          </GlassPanel>
        </div>

        <motion.div style={{ opacity: scrollOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={22} strokeWidth={1.5} className="text-[var(--text-secondary)]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="relative z-20 -mt-5 mx-auto max-w-[840px] w-[calc(100%-48px)]">
        <GlassPanel variant="ultra" className="rounded-full overflow-hidden py-3">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-void)] via-transparent to-[var(--bg-void)] z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] relative z-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center">
                {products.map((p) => (
                  <span key={`${i}-${p.id}`} className="flex items-center">
                    <span className="font-[var(--font-display)] font-semibold text-[13px] uppercase tracking-[0.06em] text-[var(--text-primary)] opacity-70 px-5">{p.name}</span>
                    <span className="text-[var(--accent-red)] text-[5px]">●</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* ═══ COLLECTION TEASER ═══ */}
      <section className="relative py-28 px-6 section-ambient">
        <LiquidOrb color="rgba(37,99,235,0.4)" size={450} className="top-[-80px] left-[-120px]" opacity={0.1} delay={0} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <p className="font-[var(--font-display)] font-bold text-[11px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-3">LIMITED EDITION</p>
            <h2 className="font-[var(--font-display)] font-extrabold text-[clamp(40px,7vw,88px)] uppercase text-[var(--text-primary)] leading-[0.95] mb-4">
              THE COLLECTION
            </h2>
            <p className="text-[var(--text-secondary)] text-base mb-14 max-w-lg leading-relaxed">
              Six pieces. One collaboration. Objects that are neither makeup nor industrial design — but something entirely new.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {products.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <Link href={`/collection/${product.slug}`} className="block group">
                  <GlassCard orbColor={product.orbColor}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between p-4 pb-0">
                        <p className="font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">{product.category}</p>
                        <span className="font-[var(--font-display)] font-bold text-sm text-[var(--text-primary)]">£{product.price}</span>
                      </div>
                      <div className="relative h-[260px] overflow-hidden mx-3 mt-2 rounded-[16px]">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition-transform duration-700 ease-[var(--ease-glass)] group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[rgba(9,9,11,0.7)] to-transparent" />
                      </div>
                      <div className="p-4 pt-3 flex justify-between items-center">
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
            <Link href="/collection" className="inline-flex items-center gap-2 font-[var(--font-display)] font-bold text-[12px] uppercase tracking-[0.12em] text-[var(--accent-red)] hover:text-[var(--text-primary)] transition-colors duration-300">
              View Full Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="py-32 relative overflow-hidden">
        <LiquidOrb color="rgba(229,56,42,0.3)" size={200} className="left-[20%] top-[30%]" opacity={0.1} delay={0} />
        <LiquidOrb color="rgba(37,99,235,0.3)" size={180} className="right-[20%] bottom-[30%]" opacity={0.08} delay={2} />

        <div className="max-w-[700px] mx-auto px-6 relative z-10">
          <motion.div {...fadeUp}>
            <GlassPanel variant="heavy" prismatic className="rounded-[28px] p-12 md:p-16 text-center">
              <div className="relative z-10">
                <div className="w-8 h-[2px] bg-[var(--accent-red)] mx-auto mb-10" />
                <blockquote className="font-[var(--font-display)] font-extrabold text-[clamp(24px,4vw,42px)] uppercase text-[var(--text-primary)] leading-[1.2] mb-10">
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
      <section className="py-28 relative overflow-hidden section-ambient">
        <LiquidOrb color="rgba(37,99,235,0.4)" size={400} className="right-[-100px] top-[-60px]" opacity={0.1} delay={1} />

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[55%_45%] gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <GlassPanel variant="heavy" prismatic className="rounded-[24px] overflow-hidden">
              <div className="relative aspect-[4/5] z-10">
                <Image src="/images/hero.png" alt="Campaign editorial" fill className="object-cover brightness-[0.7] contrast-[1.05]" sizes="(max-width: 768px) 100vw, 55vw" />
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
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
      <section className="py-32 px-6 relative">
        <LiquidOrb color="rgba(37,99,235,0.3)" size={300} className="top-[25%] left-1/2 -translate-x-1/2" opacity={0.08} delay={0} />

        <div className="max-w-[520px] mx-auto relative z-10">
          <motion.div {...fadeUp}>
            <GlassPanel variant="heavy" breathe prismatic className="rounded-[28px] p-10 md:p-14 text-center">
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
