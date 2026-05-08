import Link from 'next/link';
import { Camera, MessageCircle, Video } from 'lucide-react';
import Image from 'next/image';
import { GlassPanel } from '@/components/glass/GlassPanel';

export default function Footer() {
  return (
    <footer className="relative mt-auto pt-1">
      <div className="section-divider mx-6 mb-0" />
      <GlassPanel className="rounded-none px-4 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 sm:mb-16">
            <div className="space-y-8">
              <div className="flex flex-col gap-6">
                <div className="relative h-7 w-32">
                  <Image src="/images/diesel-wordmark.png" alt="Diesel" fill className="object-contain invert brightness-0" />
                </div>
                <div className="relative h-12 w-40 ml-[-4px] opacity-80 hover:opacity-100 transition-opacity">
                  <Image src="/images/lana-del-rey-logo.png" alt="Lana Del Rey" fill className="object-contain mix-blend-screen" />
                </div>
              </div>
              <p className="text-[var(--text-secondary)] text-sm font-medium tracking-wide">
                Young and Beautiful, 2024
              </p>
            </div>

            <div className="space-y-3 flex flex-col">
              <h4 className="font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.2em] text-[var(--accent-red)] mb-1">Explore</h4>
              {[
                { name: 'Home', href: '/' },
                { name: 'Collection', href: '/collection' },
                { name: 'Clothing', href: '/clothing' },
                { name: 'Lookbook', href: '/lookbook' },
                { name: 'About', href: '/about' },
              ].map((link) => (
                <Link key={link.name} href={link.href} className="font-[var(--font-display)] font-semibold text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-400">
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="space-y-3 flex flex-col">
              <h4 className="font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.2em] text-[var(--accent-red)] mb-1">Information</h4>
              {['Shipping Policy', 'Returns', 'Privacy Policy', 'Terms'].map((name) => (
                <Link key={name} href="#" className="font-[var(--font-display)] font-semibold text-sm uppercase tracking-[0.08em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-400">
                  {name}
                </Link>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-[var(--font-display)] font-bold text-[11px] uppercase tracking-[0.2em] text-[var(--accent-red)] mb-1">Social</h4>
              <div className="flex gap-5">
                {[Camera, MessageCircle, Video].map((Icon, i) => (
                  <Link key={i} href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors duration-400" aria-label={['Instagram', 'Twitter', 'TikTok'][i]}>
                    <Icon size={20} strokeWidth={1.5} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--glass-border-dim)] flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] opacity-60">
              © 2024 Diesel S.p.A. × Lana Del Rey. Limited Edition.
            </p>
            <p className="text-[12px] sm:text-[13px] text-[var(--text-secondary)] opacity-60">
              Built with obsession.
            </p>
          </div>
        </div>
      </GlassPanel>
    </footer>
  );
}
