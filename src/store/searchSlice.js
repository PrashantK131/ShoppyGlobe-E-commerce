// Redux slice for product search state
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        query: '',
    },
    reducers: {
        // Update the search query
        setSearchQuery(state, action) {
        state.query = action.payload;
        },
        // Clear the search query
        clearSearchQuery(state) {
        state.query = '';
        },
    },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

// Selector to get the current search query
export const selectSearchQuery = state => state.search.query;

export default searchSlice.reducer;