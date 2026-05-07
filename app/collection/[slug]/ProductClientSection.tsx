"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import { GlassButton } from '@/components/glass/GlassButton';
import { Check } from 'lucide-react';

export default function ProductClientSection({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [buttonState, setButtonState] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleAddToBag = () => {
    setButtonState('adding');
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      type: 'beauty',
      category: product.category,
    });
    setTimeout(() => setButtonState('added'), 350);
    setTimeout(() => setButtonState('idle'), 2200);
  };

  return (
    <div className="space-y-5">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-[var(--font-display)] font-extrabold text-[38px] text-[var(--text-primary)]"
      >
        £{product.price}
      </motion.p>

      <GlassButton
        onClick={handleAddToBag}
        size="lg"
        fullWidth
        variant="accent"
        disabled={buttonState !== 'idle'}
      >
        {buttonState === 'idle' && 'ADD TO BAG'}
        {buttonState === 'adding' && 'ADDING...'}
        {buttonState === 'added' && (
          <span className="inline-flex items-center gap-1.5">
            <Check size={14} strokeWidth={2.5} /> ADDED
          </span>
        )}
      </GlassButton>
    </div>
  );
}
