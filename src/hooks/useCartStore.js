import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;

        const existingItem = items.find(
          (item) =>
            item.id === product.id &&
            JSON.stringify(item.toppings) === JSON.stringify(product.toppings)
        );

        const newItem = {
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          quantity: parseInt(product.quantity, 10),
          toppings: product.toppings.map((t) => ({
            id: t.id,
            name: t.name,
            price: parseFloat(t.price),
          })),
        };

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id &&
              JSON.stringify(item.toppings) === JSON.stringify(product.toppings)
                ? {
                    ...item,
                    quantity: item.quantity + parseInt(product.quantity, 10),
                  }
                : item
            ),
          });
        } else {
          set({
            items: [...items, newItem],
          });
        }
      },

      updateItem: (productId, updates) => {
        set({
          items: get().items.map((item) =>
            item.id === productId &&
            JSON.stringify(item.toppings) === JSON.stringify(updates.toppings)
              ? {
                  ...item,
                  quantity: parseInt(updates.quantity, 10),
                  toppings: updates.toppings.map((t) => ({
                    id: t.id,
                    name: t.name,
                    price: parseFloat(t.price),
                  })),
                }
              : item
          ),
        });
      },

      removeItem: (productId, toppings = []) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.id === productId &&
                JSON.stringify(item.toppings) === JSON.stringify(toppings)
              )
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          const toppingsPrice = item.toppings.reduce(
            (sum, topping) => sum + parseFloat(topping.price),
            0
          );
          return (
            total +
            (parseFloat(item.price) + toppingsPrice) *
              parseInt(item.quantity, 10)
          );
        }, 0);
      },
    }),
    {
      name: "pizza-cart",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
