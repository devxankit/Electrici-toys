import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAdminAuthStore = create(
    persist(
        (set) => ({
            admin: null,
            isAuthenticated: false,

            login: (email, password) => {
                // Mock admin login logic
                if (email && password) {
                    const mockAdmin = {
                        id: 'a1',
                        name: 'Toy World Admin',
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
                        role: 'admin'
                    };
                    set({ admin: mockAdmin, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Invalid credentials' };
            },

            register: (businessName, email, password) => {
                // Mock admin register logic
                if (businessName && email && password) {
                    const mockAdmin = {
                        id: `a-${Math.random().toString(36).substr(2, 9)}`,
                        name: businessName,
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${email}`,
                        role: 'admin'
                    };
                    set({ admin: mockAdmin, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Registration failed' };
            },

            logout: () => set({ admin: null, isAuthenticated: false }),

            updateProfile: (updates) => set((state) => ({
                admin: { ...state.admin, ...updates }
            })),
        }),
        {
            name: 'admin-auth-storage',
        }
    )
);
