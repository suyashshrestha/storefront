import { create } from 'zustand';
import { UIState } from '@/types';

interface UIStore extends UIState {
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  isMobileMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  currentModal: null,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },

  toggleMobileMenu: () => {
    set((state) => ({ 
      isMobileMenuOpen: !state.isMobileMenuOpen,
      // Close other overlays when opening mobile menu
      isCartOpen: false,
      isSearchOpen: false,
    }));
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
  },

  toggleCart: () => {
    set((state) => ({ 
      isCartOpen: !state.isCartOpen,
      // Close other overlays when opening cart
      isMobileMenuOpen: false,
      isSearchOpen: false,
    }));
  },

  closeCart: () => {
    set({ isCartOpen: false });
  },

  toggleSearch: () => {
    set((state) => ({ 
      isSearchOpen: !state.isSearchOpen,
      // Close other overlays when opening search
      isMobileMenuOpen: false,
      isCartOpen: false,
    }));
  },

  closeSearch: () => {
    set({ isSearchOpen: false });
  },

  openModal: (modalId: string) => {
    set({ 
      currentModal: modalId,
      // Close overlays when opening modal
      isMobileMenuOpen: false,
      isCartOpen: false,
      isSearchOpen: false,
    });
  },

  closeModal: () => {
    set({ currentModal: null });
  },

  showToast: (message: string, type = 'info' as const) => {
    set({
      toast: {
        message,
        type,
        isVisible: true,
      },
    });

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      get().hideToast();
    }, 5000);
  },

  hideToast: () => {
    set({
      toast: {
        message: '',
        type: 'info',
        isVisible: false,
      },
    });
  },
}));