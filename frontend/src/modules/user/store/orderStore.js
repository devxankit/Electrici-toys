import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (orderData, cartItems, total) => {
                const newOrder = {
                    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                    date: new Date().toISOString(),
                    items: cartItems,
                    total: total,
                    status: 'Processing',
                    shippingAddress: orderData.address,
                    paymentMethod: orderData.paymentMethod,
                };

                set((state) => ({
                    orders: [newOrder, ...state.orders]
                }));

                return newOrder.id;
            },

            getOrder: (id) => {
                return get().orders.find(o => o.id === id);
            }
        }),
        {
            name: 'order-storage',
        }
    )
);
