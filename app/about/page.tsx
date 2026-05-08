"use client";

import { motion } from 'framer-motion';
import { Wrench, Sparkles, Gem, Box, Package, PenTool, BookOpen } from 'lucide-react';
import { products } from '@/lib/products';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import { useRef } from 'react';

const pillars = [
  { icon: Wrench, title: 'INDUSTRIAL DESIGN', orbColor: 'rgba(229,56,42,0.3)', desc: 'Each product is a collision of utility and beauty. Packaging from workshops, not boutiques.' },
  { icon: Sparkles, title: 'BOLD BEAUTY', orbColor: 'rgba(37,99,235,0.3)', desc: 'Unapologetic color. Zero compromise formulations. Beauty that refuses to be subtle.' },
  { icon: Gem, title: 'UNCOMPROMISED CRAFT', orbColor: 'rgba(196,162,101,0.3)', desc: 'Premium formulations that perform without pretension. Just pigment, precision, and confidence.' },
];

const icons: Record<string, React.ReactNode> = {
  'cigarette-box': <Box size={20} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'zippo-lighter': <Package size={20} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'pencil': <PenTool size={20} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'denim-wrap': <BookOpen size={20} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'engraved-compact': <Gem size={20} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
};

const press = [
  { quote: 'The most audacious beauty collaboration of the decade.', pub: 'Vogue Business' },
  { quote: 'Industrial packaging meets bold, unapologetic glamour.', pub: 'Hypebeast' },
  { quote: 'A masterclass in brand storytelling through product design.', pub: 'WWD' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <LiquidOrb color="rgba(229,56,42,0.4)" size={450} className="top-[-60px] right-[-120px]" opacity={0.1} delay={0} />
      <LiquidOrb color="rgba(37,99,235,0.3)" size={350} className="top-[40%] left-[-120px]" opacity={0.08} delay={2} />

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 max-w-[1400px] mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-4">
            <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(44px,8vw,100px)] uppercase text-[var(--text-primary)] leading-none">DIESEL</h1>
            <span className="font-[var(--font-display)] font-bold text-[clamp(36px,6vw,80px)] text-[var(--accent-red)]">×</span>
            <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(44px,8vw,100px)] uppercase text-[var(--text-primary)] leading-none">LDR</h1>
          </div>
          <p className="text-[var(--text-secondary)] text-lg">Two worlds. One vision. Zero rules.</p>
        </motion.div>

        <motion.div {...fadeUp} className="max-w-[600px] mx-auto">
          <GlassPanel variant="heavy" className="rounded-[22px] p-8 md:p-10">
            <p className="relative z-10 text-[var(--text-secondary)] leading-[1.8] text-[15px]">
              When Renzo Rosso met Lizzy Grant, neither came to compromise. Diesel brought five decades of denim heritage
              and industrial fearlessness. Lana brought the vision, the poetry, and the aesthetic. Together they made eleven objects that are
              neither makeup nor industrial design — but something entirely new.
            </p>
          </GlassPanel>
        </motion.div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-28 px-6 section-ambient">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
              <GlassCard orbColor={p.orbColor} className="h-full">
                <div className="relative z-10 p-7 space-y-5">
                  <p.icon size={28} strokeWidth={1.5} className="text-[var(--accent-red)]" />
                  <h3 className="font-[var(--font-display)] font-extrabold text-lg uppercase text-[var(--text-primary)] tracking-[0.06em]">{p.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed text-sm">{p.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE OBJECTS */}
      {/* <section className="py-28 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto mb-8">
          <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-2">THE DETAILS</p>
          <h2 className="font-[var(--font-display)] font-extrabold text-[clamp(40px,7vw,72px)] uppercase text-[var(--text-primary)]">THE OBJECTS</h2>
        </div>
        <div ref={scrollRef} className="flex gap-5 px-6 overflow-x-auto no-scrollbar">
          {products.map((product) => (
            <GlassCard key={product.id} orbColor={product.orbColor} className="shrink-0 w-[280px]">
              <div className="relative z-10 p-6 space-y-4">
                {icons[product.packagingType]}
                <h3 className="font-[var(--font-display)] font-bold uppercase text-[var(--text-primary)] text-sm tracking-[0.06em]">{product.name}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{product.packagingStory}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section> */}

      {/* PRESS
      <section className="py-28 px-6 section-ambient">
        <div className="max-w-[1400px] mx-auto">
          <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-8">PRESS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {press.map((q, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}>
                <GlassPanel prismatic className="rounded-[20px] p-7 h-full">
                  <div className="relative z-10 flex gap-4">
                    <div className="w-[2px] bg-[var(--accent-red)] shrink-0 rounded-full" />
                    <div>
                      <blockquote className="text-[var(--text-primary)] text-sm leading-[1.8] mb-4 italic">&ldquo;{q.quote}&rdquo;</blockquote>
                      <cite className="font-[var(--font-display)] font-bold text-[9px] uppercase tracking-[0.2em] text-[var(--text-tertiary)] not-italic">{q.pub}</cite>
                    </div>
                  </div>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CREDITS */}
      <section className="py-12 px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
          Creative Direction: Tech Mobius Club
        </p>
      </section>
    </div>
  );
}
