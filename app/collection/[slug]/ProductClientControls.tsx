"use client";

import { useState } from 'react';
import { Product } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import { ShinyText } from '@/components/ui/ShinyText';

export default function ProductClientControls({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBag = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      type: 'beauty',
      category: product.category,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <button
      onClick={handleAddToBag}
      className="w-full primary-button py-5 text-xl bg-gradient-to-r from-[var(--color-brass)] to-[#d4af37] text-[var(--color-coal)] transition-transform duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(158,126,79,0.3)] border-none"
      disabled={isAdded}
    >
      {isAdded ? "ADDED ✓" : <ShinyText text="ADD TO BAG" speed={2} color="#1A1714" shineColor="#F2EBD9" />}
    </button>
  );
}
