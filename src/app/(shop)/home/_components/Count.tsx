"use client";

import { useCartStore } from "@/app/store/cartStore";

export default function Count() {
  const { items } = useCartStore();

  return (
    <div className="absolute bottom-3 right-3">
      <span className="flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full">
        {items.reduce((acc, item) => acc + item.quantity, 0)}
      </span>
    </div>
  );
}
