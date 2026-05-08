"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { CurrencySelector } from '@/components/interactive/CurrencySelector';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const cartCount = useCart((state) => state.getCartCount());

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collection', href: '/collection' },
    { name: 'Clothing', href: '/clothing' },
    { name: 'Lookbook', href: '/lookbook' },
    { name: 'About', href: '/about' },
  ];

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--accent-red)] focus:text-white focus:rounded-full">
        Skip to content
      </a>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`
            relative pointer-events-auto max-w-[780px] w-[calc(100%-40px)] h-[50px]
            rounded-full glass-specular
            flex items-center justify-between px-6
            transition-all duration-700 ease-[var(--ease-premium)]
            ${hasScrolled ? 'glass-ultra' : 'glass'}
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="relative flex items-center gap-4 z-10 shrink-0 group py-1">
            <div className="relative h-6 w-24 md:h-7 md:w-28 transition-transform duration-500 group-hover:scale-105">
              <Image 
                src="/images/diesel-wordmark.png" 
                alt="DIESEL" 
                fill 
                className="object-contain invert brightness-0"
              />
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="relative h-10 w-24 md:h-12 md:w-28 transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100">
              <Image 
                src="/images/lana-del-rey-logo.png" 
                alt="LANA DEL REY" 
                fill 
                className="object-contain mix-blend-screen"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-6 z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-[var(--font-display)] font-semibold text-[11px] tracking-[0.14em] uppercase transition-colors duration-500 ease-[var(--ease-premium)] ${pathname === link.href
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--accent-red)]"
                    style={{ boxShadow: '0 0 10px rgba(255,59,47,0.6)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-10">
            <CurrencySelector />
            <Link href="/cart" className="relative text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors duration-500">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute -top-1.5 -right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[var(--accent-red)] text-[7px] font-bold text-white shadow-[0_0_8px_rgba(255,59,47,0.4)]"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              className="md:hidden text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[rgba(3,4,8,0.85)] flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`font-[var(--font-display)] font-extrabold text-3xl uppercase tracking-[0.06em] transition-colors duration-500 ${pathname === link.href
                        ? 'text-[var(--accent-red)]'
                        : 'text-[var(--text-primary)] hover:text-[var(--accent-red)]'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
