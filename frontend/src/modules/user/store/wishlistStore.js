import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create()(
    persist(
        (set, get) => ({
            items: [],

            toggleWishlist: (product) => {
                const { items } = get();
                const isExist = items.find((item) => item.id === product.id);

                if (isExist) {
                    set({
                        items: items.filter((item) => item.id !== product.id),
                    });
                } else {
                    set({ items: [...items, product] });
                }
            },

            isInWishlist: (productId) => {
                return !!get().items.find((item) => item.id === productId);
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
