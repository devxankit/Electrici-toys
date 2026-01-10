import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products as initialProducts } from '../../../data/products';

export const useVendorProductStore = create()(
    persist(
        (set, get) => ({
            products: initialProducts.map(p => ({ ...p, status: 'Active', stock: Math.floor(Math.random() * 100) })),

            addProduct: (product) => {
                const newProduct = {
                    ...product,
                    id: Date.now(),
                    status: product.status || 'Active',
                    stock: product.stock || 0,
                    createdAt: new Date().toISOString()
                };
                set({ products: [newProduct, ...get().products] });
            },

            updateProduct: (id, updates) => {
                set({
                    products: get().products.map((p) =>
                        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
                    ),
                });
            },

            deleteProduct: (id) => {
                set({
                    products: get().products.filter((p) => p.id !== id),
                });
            },

            getProductById: (id) => {
                return get().products.find((p) => String(p.id) === String(id));
            },

            toggleStatus: (id) => {
                set({
                    products: get().products.map((p) =>
                        p.id === id
                            ? { ...p, status: p.status === 'Active' ? 'Draft' : 'Active' }
                            : p
                    ),
                });
            }
        }),
        {
            name: 'vendor-product-storage',
        }
    )
);
