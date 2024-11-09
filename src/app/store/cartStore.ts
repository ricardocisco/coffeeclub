import { create } from "zustand";

interface Coffee {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl: string;
  quantity: number;
}

interface CartState {
  items: Coffee[];
  total: number;
  addCart: (cart: Coffee) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addCart: (cart) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === cart.id);
      const newItems = existingItem
        ? state.items.map((item) =>
            item.id === cart.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...cart, quantity: 1 }];

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const newItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const newItems = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return { items: newItems, total };
    }),
}));
