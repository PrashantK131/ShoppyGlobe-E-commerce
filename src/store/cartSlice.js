// Redux slice for cart state management
import { createSlice } from '@reduxjs/toolkit';

const CART_STORAGE_KEY = 'shoppyglobe_cart';

// Load cart items persisted in localStorage 
export function loadCartFromStorage() {
    try {
        const serialized = localStorage.getItem(CART_STORAGE_KEY);
        return serialized ? JSON.parse(serialized) : [];
    } catch {
        return [];
    }
};

// Save current cart items to localStorage
export function saveCartToStorage(items) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
        // Ignores storage quota or security errors
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: loadCartFromStorage(), // Restoring cart from localStorage on app start
    },
    reducers: {
        // Add product to cart or increment quantity if already exists
        addToCart(state, action) {
            const product = action.payload;
            const existing = state.items.find(item => item.id === product.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },

        // Remove product from cart entirely
        removeFromCart(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },

        // Increase quantity of a cart item
        incrementQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item) item.quantity += 1;
        },

        // Decrease quantity — minimum is 1
        decrementQuantity(state, action) {
            const item = state.items.find(i => i.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
        },

        // Clear all items from cart (used after order placement)
        clearCart(state) {
            state.items = [];
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = state => state.cart.items;
export const selectCartCount = state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotal = state => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;