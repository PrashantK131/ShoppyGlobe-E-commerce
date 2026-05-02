// Redux store configuration with localStorage persistence
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import searchReducer from './searchSlice';
import { saveCartToStorage } from './cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer,
    },
});

// Subscribe to store changes and persist cart items to localStorage automatically
store.subscribe(() => {
    saveCartToStorage(store.getState().cart.items);
});

export default store;