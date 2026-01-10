import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            login: (email, password) => {
                // Mock login logic
                // In a real app, this would be an API call
                if (email && password) {
                    const mockUser = {
                        id: '1',
                        name: email.split('@')[0], // Use part of email as name
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                    };
                    set({ user: mockUser, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Invalid credentials' };
            },

            register: (name, email, password) => {
                // Mock register logic
                if (name && email && password) {
                    const mockUser = {
                        id: Math.random().toString(36).substr(2, 9),
                        name: name,
                        email: email,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                    };
                    set({ user: mockUser, isAuthenticated: true });
                    return { success: true };
                }
                return { success: false, error: 'Registration failed' };
            },

            logout: () => set({ user: null, isAuthenticated: false }),

            updateProfile: (updates) => set((state) => ({
                user: { ...state.user, ...updates }
            })),
        }),
        {
            name: 'auth-storage', // unique name for localStorage key
        }
    )
);
