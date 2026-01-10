import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVendorAnalyticsStore = create()(
    persist(
        (set, get) => ({
            revenueData: [
                { name: 'Mon', revenue: 4500, orders: 12 },
                { name: 'Tue', revenue: 5200, orders: 15 },
                { name: 'Wed', revenue: 4800, orders: 11 },
                { name: 'Thu', revenue: 6100, orders: 18 },
                { name: 'Fri', revenue: 5900, orders: 16 },
                { name: 'Sat', revenue: 8500, orders: 25 },
                { name: 'Sun', revenue: 7800, orders: 22 },
            ],

            categorySales: [
                { name: 'Hoverboards', value: 45 },
                { name: 'Scooters', value: 25 },
                { name: 'RC Cars', value: 15 },
                { name: 'Robotics', value: 15 },
            ],

            topProducts: [
                { name: 'Turbo Glide X1', sold: 124, revenue: 154800 },
                { name: 'Stunt Tank 360', sold: 98, revenue: 34300 },
                { name: 'Solar Bot Kit', sold: 85, revenue: 42415 },
                { name: 'Drift King Pro', sold: 72, revenue: 89900 },
            ],

            getSummary: () => {
                const data = get().revenueData;
                const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
                const totalOrders = data.reduce((acc, curr) => acc + curr.orders, 0);
                return {
                    totalRevenue,
                    totalOrders,
                    avgOrderValue: totalRevenue / totalOrders,
                    growth: 12.5 // Simulated growth percentage
                };
            }
        }),
        {
            name: 'vendor-analytics-storage',
        }
    )
);
