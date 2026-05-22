import { createSlice } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

// Options for Fuse.js search
const searchOptions = {
    keys: [
        "product_code",
        "name",
        "category",
        "sub_category",
        "material",
        "coating"
    ],
    threshold: 0.1,   // Adjust this based on how strict you want the search to be
    minMatchCharLength: 2,  // Ignore very short search terms
    distance: 100,  // Control how far matches are allowed
    ignoreLocation: true,  // Speed up search by ignoring location-based matches
};

// Initial state
const initialState = {
    stockProducts: [], // Products that meet stock_status === 1
    filteredStockProducts: [], // Products filtered by various criteria
    searchTerm: "",
    selectedCategory: "",
    selectedSubCategory: "",
    selectedMaterial: "",
    selectedFinish: "",
    filterResults: 0,
};

// Create a new slice
const stockFilterSlice = createSlice({
    name: "stockFilter",
    initialState,
    reducers: {
        setStockProducts(state, action) {
            state.stockProducts = action.payload.filter(product => product.stock_status === 1); // Filter by stock_status === 1
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            stockFilterSlice.caseReducers.applyFilters(state); // Reapply filters after setting the search term
        },
        setCategory(state, action) {
            state.selectedCategory = action.payload;
            stockFilterSlice.caseReducers.applyFilters(state); // Reapply filters after selecting category
        },
        setSubCategory(state, action) {
            state.selectedSubCategory = action.payload;
            stockFilterSlice.caseReducers.applyFilters(state); // Reapply filters after selecting sub-category
        },
        setMaterial(state, action) {
            state.selectedMaterial = action.payload;
            stockFilterSlice.caseReducers.applyFilters(state); // Reapply filters after selecting material
        },
        setFinish(state, action) {
            state.selectedFinish = action.payload;
            stockFilterSlice.caseReducers.applyFilters(state); // Reapply filters after selecting finish
        },
        applyFilters(state) {
            let results = state.stockProducts; // Start with the stock filtered products

            // Search term filter using Fuse.js
            if (state.searchTerm) {
                const fuse = new Fuse(state.stockProducts, searchOptions);
                results = fuse.search(state.searchTerm).map(result => result.item);
            }

            // Filter by category
            if (state.selectedCategory) {
                results = results.filter(product => product.category === state.selectedCategory);
            }

            // Filter by sub-category
            if (state.selectedSubCategory) {
                results = results.filter(product => product.sub_category === state.selectedSubCategory);
            }

            // Filter by material
            if (state.selectedMaterial) {
                results = results.filter(product => product.material === state.selectedMaterial);
            }

            // Filter by finish
            if (state.selectedFinish) {
                results = results.filter(product => product.coating === state.selectedFinish);
            }

            state.filteredStockProducts = results;
            state.filterResults = results.length;
        },
        clearFilters(state) {
            state.searchTerm = "";
            state.selectedCategory = "";
            state.selectedSubCategory = "";
            state.selectedMaterial = "";
            state.selectedFinish = "";
            state.filteredStockProducts = state.stockProducts; // Reset to all stock products
        },
    },
});

// Export actions
export const {
    setStockProducts,
    setSearchTerm,
    setCategory,
    setSubCategory,
    setMaterial,
    setFinish,
    applyFilters,
    clearFilters,
} = stockFilterSlice.actions;

// Export the reducer
export default stockFilterSlice.reducer;
