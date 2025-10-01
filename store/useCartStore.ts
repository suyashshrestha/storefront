import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, CartItem, Product, ProductVariant, CartState } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => Promise<boolean>;
  calculateTotals: () => void;
}

const TAX_RATE = 0.08; // 8% tax
const SHIPPING_COST = 9.99;
const FREE_SHIPPING_THRESHOLD = 75;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        id: uuidv4(),
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
      },
      isLoading: false,

      addItem: (product: Product, quantity = 1, variant?: ProductVariant) => {
        const { cart } = get();
        const existingItemIndex = cart.items.findIndex(
          (item) => 
            item.product.id === product.id && 
            (!variant || item.selectedVariant?.id === variant.id)
        );

        let updatedItems = [...cart.items];

        if (existingItemIndex >= 0) {
          // Update existing item quantity
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity,
          };
        } else {
          // Add new item
          const newItem: CartItem = {
            id: uuidv4(),
            product,
            quantity,
            selectedVariant: variant,
          };
          updatedItems.push(newItem);
        }

        const updatedCart = { ...cart, items: updatedItems };
        set({ cart: updatedCart });
        get().calculateTotals();
      },

      removeItem: (itemId: string) => {
        const { cart } = get();
        const updatedItems = cart.items.filter((item) => item.id !== itemId);
        const updatedCart = { ...cart, items: updatedItems };
        set({ cart: updatedCart });
        get().calculateTotals();
      },

      updateQuantity: (itemId: string, quantity: number) => {
        const { cart } = get();
        
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const updatedItems = cart.items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        
        const updatedCart = { ...cart, items: updatedItems };
        set({ cart: updatedCart });
        get().calculateTotals();
      },

      clearCart: () => {
        set({
          cart: {
            id: uuidv4(),
            items: [],
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
          },
        });
      },

      applyDiscount: async (code: string) => {
        // Mock discount validation
        const validCodes = ['SAVE10', 'WELCOME20', 'FREESHIP'];
        const { cart } = get();
        
        if (validCodes.includes(code.toUpperCase())) {
          let discountAmount = 0;
          
          switch (code.toUpperCase()) {
            case 'SAVE10':
              discountAmount = cart.subtotal * 0.1;
              break;
            case 'WELCOME20':
              discountAmount = cart.subtotal * 0.2;
              break;
            case 'FREESHIP':
              discountAmount = cart.shipping;
              break;
          }
          
          const updatedCart = {
            ...cart,
            discountCode: code.toUpperCase(),
            discountAmount,
          };
          
          set({ cart: updatedCart });
          get().calculateTotals();
          return true;
        }
        
        return false;
      },

      calculateTotals: () => {
        const { cart } = get();
        
        const subtotal = cart.items.reduce((sum, item) => {
          const itemPrice = item.product.price + (item.selectedVariant?.priceModifier || 0);
          return sum + (itemPrice * item.quantity);
        }, 0);

        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
        const tax = subtotal * TAX_RATE;
        const discountAmount = cart.discountAmount || 0;
        const total = subtotal + shipping + tax - discountAmount;

        const updatedCart = {
          ...cart,
          subtotal,
          tax,
          shipping,
          total: Math.max(0, total), // Ensure total is never negative
        };

        set({ cart: updatedCart });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

// Initialize calculations on load
if (typeof window !== 'undefined') {
  useCartStore.getState().calculateTotals();
}