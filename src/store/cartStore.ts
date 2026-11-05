import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../api/products";

export type CartItem = Product & { quantity: number };

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  decrementItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const found = state.items.some((i) => i.id === product.id);
          if (!found) return { items: [...state.items, { ...product, quantity: 1 }] };
          return {
            items: state.items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }),

      decrementItem: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      clearCart: () => set({ items: [] }),
    }),
    { name: "cart" }
  )
);

export const selectCount = (s: CartState) =>
  s.items.reduce((n, i) => n + i.quantity, 0);

export const selectTotal = (s: CartState) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
