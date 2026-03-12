import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface AuraStore {
  cart: CartItem[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (id: string) => void;
  toggleCart: () => void;
  cartCount: () => number;
}

export const useAuraStore = create<AuraStore>((set, get) => ({
  cart: [],
  cartOpen: false,
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((c) => c.id === item.id);
      if (exists) {
        return { cart: state.cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
  toggleCart: () => set((state) => ({ cartOpen: !state.cartOpen })),
  cartCount: () => get().cart.reduce((acc, c) => acc + c.qty, 0),
}));
