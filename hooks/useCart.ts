import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  type: 'beauty' | 'clothing';
  size?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item, quantity = 1) => {
        set((state) => {
          const cartKey = item.size ? `${item.id}-${item.size}` : item.id;
          const existingItem = state.items.find((i) => {
            const existingKey = i.size ? `${i.id}-${i.size}` : i.id;
            return existingKey === cartKey;
          });
          if (existingItem) {
            return {
              items: state.items.map((i) => {
                const existingKey = i.size ? `${i.id}-${i.size}` : i.id;
                return existingKey === cartKey
                  ? { ...i, quantity: i.quantity + quantity }
                  : i;
              }),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      
      getCartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'diesel-ldr-cart',
    }
  )
);
