import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful login
          const mockUser: User = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const mockToken = 'mock-jwt-token';
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock successful registration
          const mockUser: User = {
            id: Date.now().toString(),
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          
          const mockToken = 'mock-jwt-token';
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        } catch (error) {
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
        
        // Clear any stored data
        localStorage.removeItem('auth-storage');
      },

      updateUser: (userData) => {
        const { user } = get();
        if (user) {
          set({
            user: { ...user, ...userData, updatedAt: new Date().toISOString() },
          });
        }
      },

      clearError: () => {
        // This can be expanded to handle error states
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);