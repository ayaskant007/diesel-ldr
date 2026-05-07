"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

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
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`
            relative pointer-events-auto max-w-[720px] w-[calc(100%-40px)] h-[50px]
            rounded-full overflow-hidden glass-specular
            flex items-center justify-between px-6
            transition-all duration-700 ease-[var(--ease-glass)]
            ${hasScrolled ? 'glass-ultra' : 'glass'}
          `}
          role="navigation"
          aria-label="Main navigation"
        >
          <Link href="/" className="font-[var(--font-display)] font-extrabold text-[var(--text-primary)] text-[14px] tracking-[0.1em] uppercase hover:text-[var(--accent-red)] transition-colors duration-300 z-10 shrink-0">
            DIESEL × LDR
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-7 z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-[var(--font-display)] font-semibold text-[11px] tracking-[0.14em] uppercase transition-colors duration-300 ${pathname === link.href
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full bg-[var(--accent-red)]"
                    style={{ boxShadow: '0 0 8px rgba(229,56,42,0.5)' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 z-10">
            <Link href="/cart" className="relative text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors duration-300">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1.5 -right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[var(--accent-red)] text-[7px] font-bold text-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              className="md:hidden text-[var(--text-primary)] hover:text-[var(--accent-red)] transition-colors"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-ultra flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-[var(--font-display)] font-extrabold text-3xl uppercase tracking-[0.06em] transition-colors duration-300 ${pathname === link.href
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
