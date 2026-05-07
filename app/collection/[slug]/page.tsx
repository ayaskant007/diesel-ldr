import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductBySlug } from '@/lib/products';
import { Metadata } from 'next';
import { Box, Package, PenTool, BookOpen, Gem } from 'lucide-react';
import { GlassPanel } from '@/components/glass/GlassPanel';
import { GlassCard } from '@/components/glass/GlassCard';
import { GlassBadge } from '@/components/glass/GlassBadge';
import { LiquidOrb } from '@/components/glass/LiquidOrb';
import ProductClientSection from './ProductClientSection';

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.name} | Diesel × LDR`, description: product.description };
}

const packagingIcons: Record<string, React.ReactNode> = {
  'cigarette-box': <Box size={18} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'zippo-lighter': <Package size={18} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'pencil': <PenTool size={18} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'denim-wrap': <BookOpen size={18} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
  'engraved-compact': <Gem size={18} strokeWidth={1.5} className="text-[var(--accent-red)]" />,
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = products.filter(p => product.relatedSlugs.includes(p.slug)).slice(0, 3);

  return (
    <div className="min-h-screen relative">
      <LiquidOrb color={`${product.orbColor}60`} size={700} className="top-[-120px] right-[-180px]" opacity={0.15} blur={100} delay={0} />

      <div className="max-w-[1400px] mx-auto px-6 pt-28 pb-28 relative z-10">
        <nav className="mb-8 font-[var(--font-display)] font-semibold text-[10px] uppercase tracking-[0.12em]">
          <Link href="/collection" className="text-[var(--text-tertiary)] hover:text-[var(--accent-red)] transition-colors">Collection</Link>
          <span className="text-[var(--text-tertiary)] opacity-40 mx-2">/</span>
          <span className="text-[var(--text-tertiary)]">{product.category}</span>
          <span className="text-[var(--text-tertiary)] opacity-40 mx-2">/</span>
          <span className="text-[var(--text-primary)]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 lg:gap-16">
          <GlassPanel variant="heavy" prismatic className="rounded-[24px] p-5">
            <div className="relative w-full aspect-[4/5] z-10 rounded-[18px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, ${product.orbColor}20 0%, transparent 65%)` }} />
              <Image src={product.images[0]} alt={product.name} fill className="object-contain relative z-10" sizes="(max-width: 1024px) 100vw, 55vw" priority />
            </div>
          </GlassPanel>

          <div className="space-y-5">
            <div>
              <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-2">{product.category}</p>
              <h1 className="font-[var(--font-display)] font-extrabold text-[clamp(28px,4vw,48px)] uppercase text-[var(--text-primary)] leading-[1.0]">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full border border-[var(--glass-border)]" style={{ background: product.shadeHex }} />
              <GlassBadge>{product.shade}</GlassBadge>
            </div>

            <ProductClientSection product={product} />

            <div className="h-[1px] bg-[var(--glass-border-dim)]" />

            <div className="border-l-2 border-[var(--accent-red)] pl-4 py-1">
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed italic">{product.tagline}</p>
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed text-[15px]">{product.description}</p>

            <GlassPanel className="rounded-[16px] p-5">
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-3">
                  {packagingIcons[product.packagingType]}
                  <span className="font-[var(--font-display)] font-bold text-[10px] uppercase tracking-[0.15em] text-[var(--text-tertiary)]">PACKAGING</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{product.packagingStory}</p>
              </div>
            </GlassPanel>

            <details className="group">
              <summary className="cursor-pointer font-[var(--font-display)] font-bold text-[12px] uppercase tracking-[0.12em] text-[var(--text-primary)] flex items-center justify-between py-3 border-t border-[var(--glass-border-dim)]">
                INGREDIENTS
                <span className="text-[var(--text-tertiary)] transition-transform duration-300 group-open:rotate-45 text-lg">+</span>
              </summary>
              <p className="text-[var(--text-tertiary)] text-sm leading-relaxed pb-4">{product.ingredients}</p>
            </details>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <p className="font-[var(--font-display)] font-bold text-[10px] tracking-[0.3em] uppercase text-[var(--accent-red)] mb-2">RECOMMENDED</p>
            <h2 className="font-[var(--font-display)] font-extrabold text-xl uppercase tracking-[0.08em] text-[var(--text-primary)] mb-8">YOU MAY ALSO LIKE</h2>
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-5 pb-4 no-scrollbar">
              {relatedProducts.map(related => (
                <Link key={related.id} href={`/collection/${related.slug}`} className="min-w-[260px] lg:min-w-0 flex-shrink-0 group">
                  <GlassCard orbColor={related.orbColor}>
                    <div className="relative z-10">
                      <div className="relative h-[180px] overflow-hidden mx-3 mt-3 rounded-[14px]">
                        <Image src={related.images[0]} alt={related.name} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="33vw" />
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <h3 className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm uppercase">{related.name}</h3>
                        <span className="font-[var(--font-display)] font-bold text-[var(--text-primary)] text-sm">£{related.price}</span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
