import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useVendorAuthStore = create(
    persist(
        (set) => ({
            vendor: null,
            isAuthenticated: false,

            login: (email, password) => {
                // Mock vendor login logic
                if (email && password) {
                    const mockVendor = {
                        id: 'v1',
                        name: 'Toy World Inc.',
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
                        role: 'vendor'
                    };
                    set({ vendor: mockVendor, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Invalid credentials' };
            },

            register: (businessName, email, password) => {
                // Mock vendor register logic
                if (businessName && email && password) {
                    const mockVendor = {
                        id: `v-${Math.random().toString(36).substr(2, 9)}`,
                        name: businessName,
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
                        role: 'vendor'
                    };
                    set({ vendor: mockVendor, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Registration failed' };
            },

            logout: () => set({ vendor: null, isAuthenticated: false }),

            updateProfile: (updates) => set((state) => ({
                vendor: { ...state.vendor, ...updates }
            })),
        }),
        {
            name: 'vendor-auth-storage',
        }
    )
);
