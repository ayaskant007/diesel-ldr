"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyStore } from '@/hooks/useCurrency';

const CURRENCIES = [
  { code: 'GBP', symbol: '£' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'INR', symbol: '₹' },
];

export function CurrencySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currencyCode = useCurrencyStore((state) => state.currencyCode);
  const setCurrency = useCurrencyStore((state) => state.setCurrency);
  const isInitialized = useCurrencyStore((state) => state.isInitialized);

  const activeCurrency = CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-[60]" ref={dropdownRef}>
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1 text-[11px] font-[var(--font-display)] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 py-1"
        aria-label="Select Currency"
      >
        <span>{activeCurrency.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-3 w-28 py-1.5 rounded-xl glass-ultra border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-[70] text-[10px] font-[var(--font-display)] pointer-events-auto"
          >
            {CURRENCIES.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  setCurrency(currency.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/5 transition-colors ${
                  currencyCode === currency.code ? 'text-[var(--accent-red)] font-bold' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {currency.symbol} {currency.code}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
