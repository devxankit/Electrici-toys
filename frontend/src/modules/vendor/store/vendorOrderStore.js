import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useOrderStore } from '../../user/store/orderStore';

// Helper to get static mock data
const getMockOrders = () => [
    {
        id: 'ORD-5482',
        customer: 'Ankit Sharma',
        email: 'ankit@example.com',
        date: new Date(Date.now() - 86400000).toISOString(),
        total: 12500,
        status: 'Delivered',
        items: [{ name: 'Turbo Hoverboard', quantity: 1, price: 12500 }],
        address: 'Sector 44, Gurgaon, HR',
        paymentMethod: 'card'
    },
    {
        id: 'ORD-9931',
        customer: 'Rahul Gupta',
        email: 'rahul@example.com',
        date: new Date().toISOString(),
        total: 3500,
        status: 'Processing',
        items: [{ name: 'Stunt Tank RC', quantity: 1, price: 3500 }],
        address: 'Hauz Khas, New Delhi, DL',
        paymentMethod: 'cod'
    },
    {
        id: 'ORD-2210',
        customer: 'Sanya Mirza',
        email: 'sanya@example.com',
        date: new Date(Date.now() - 3600000).toISOString(),
        total: 9999,
        status: 'Pending',
        items: [{ name: 'Solar Robot Kit', quantity: 2, price: 4999.5 }],
        address: 'Bandra West, Mumbai, MH',
        paymentMethod: 'card'
    }
];

// Helper to fetch user orders from localStorage
const getUserOrders = () => {
    try {
        const storage = localStorage.getItem('order-storage');
        if (!storage) return [];

        const parsed = JSON.parse(storage);
        const userOrders = parsed.state?.orders || [];

        return userOrders.map(order => ({
            id: order.id,
            customer: 'Current User', // Since auth might be mocked
            email: 'user@example.com',
            date: order.date,
            total: order.total,
            status: order.status || 'Pending',
            items: order.items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            address: typeof order.shippingAddress === 'string' ? order.shippingAddress : 'User Address',
            paymentMethod: order.paymentMethod
        }));
    } catch (e) {
        console.error("Failed to sync user orders:", e);
        return [];
    }
};

export const useVendorOrderStore = create()(
    persist(
        (set, get) => ({
            orders: [
                ...getMockOrders(), // Helper to get static mock data
                ...getUserOrders()  // Helper to get real user orders from localStorage
            ],

            updateOrderStatus: (id, status) => {
                set({
                    orders: get().orders.map(o =>
                        o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o
                    )
                });
            },

            getOrderById: (id) => {
                return get().orders.find(o => o.id === id);
            },

            getStats: () => {
                const orders = get().orders;
                return {
                    totalRevenue: orders.reduce((acc, curr) => acc + curr.total, 0),
                    pendingOrders: orders.filter(o => o.status === 'Pending').length,
                    shippedOrders: orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered').length,
                    averageOrder: orders.length > 0 ? orders.reduce((acc, curr) => acc + curr.total, 0) / orders.length : 0
                };
            }
        }),
        {
            name: 'vendor-order-storage',
        }
    )
);
