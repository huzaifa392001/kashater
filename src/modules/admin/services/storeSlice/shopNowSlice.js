import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import Fuse from "fuse.js";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
export const fetchList = createAsyncThunk('data/fetchList', async () => {
    const AdminbearerToken = secureLocalStorage.getItem('dealerBearerToken');

    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/dealer/shop-now/cart/list`, {
        headers: AdminbearerToken
            ? {
                Authorization: `Bearer ${AdminbearerToken}`,
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
            }
            : {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
            }
    });

    return response.data.data;
});
export const fetchRemoveList = createAsyncThunk('data/fetchRemoveList', async (requestConfig) => {
    const AdminbearerToken = secureLocalStorage.getItem('dealerBearerToken');

    const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/dealer/shop-now/cart/remove-product`,

        requestConfig.body,  // This is the data you want to send in the POST request
        {
            headers: AdminbearerToken
                ? {
                    Authorization: `Bearer ${AdminbearerToken}`,
                    "Content-Type": "application/vnd.api+json",
                    "Accept": "application/vnd.api+json",
                }
                : {
                    "Content-Type": "application/vnd.api+json",
                    "Accept": "application/vnd.api+json",
                }
        }
    );

    return response.data.data;
});

export const updateQtyDate = createAsyncThunk(
    "data/updateQtyDate",
    async (requestConfig, { rejectWithValue }) => {
        try {
            const AdminbearerToken = secureLocalStorage.getItem("dealerBearerToken");
            const response = await axios.put(
                `${process.env.REACT_APP_BASE_API_URL}/dealer/shop-now/cart/update`,
                requestConfig.body,
                {
                    headers: AdminbearerToken
                        ? {
                            Authorization: `Bearer ${AdminbearerToken}`,
                            "Content-Type": "application/vnd.api+json",
                            Accept: "application/vnd.api+json",
                        }
                        : {
                            "Content-Type": "application/vnd.api+json",
                            Accept: "application/vnd.api+json",
                        },
                }
            );

            return response.data.data;
        } catch (error) {
            // Return a rejected value with a custom error message
            return rejectWithValue(

                toast.error((error.response?.data?.message || 'Something went wrong!'), {
                    position: "top-center"
                })
            );
        }
    }
);


export const uploadCsvTable = createAsyncThunk(
    "data/uploadCsvTable",
    async (requestConfig, { dispatch, rejectWithValue }) => {
        try {
            const AdminbearerToken = secureLocalStorage.getItem("dealerBearerToken");
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/dealer/shop-now/cart/add/bulk`,
                requestConfig.body,
                {
                    headers: AdminbearerToken
                        ? {
                            Authorization: `Bearer ${AdminbearerToken}`,
                            "Content-Type": "application/vnd.api+json",
                            Accept: "application/vnd.api+json",
                        }
                        : {
                            "Content-Type": "application/vnd.api+json",
                            Accept: "application/vnd.api+json",
                        },
                }
            );

            const { status_code, message, data } = response.data;

            if (status_code === 200) {
                // Successful upload
                dispatch(fetchList());  // Refresh data if needed
                toast.success(message);
                return data;
            } else if (status_code === 400) {
                // Error response handling with message
                toast.error(message || 'Something went wrong!');
                return rejectWithValue(message || 'Something went wrong!');
            } else {
                // Handle unexpected status codes
                toast.error('Unexpected error occurred!');
                return rejectWithValue('Unexpected error occurred!');
            }
        } catch (error) {
            // Network or unexpected errors
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong!';
            toast.error(errorMessage,);
            return rejectWithValue(errorMessage);
        }
    }
);

// Options for Fuse.js
const options = {
    keys: [
        "delimitter",
        "product_code",
        "name",
        "category",
        "category_token",
        "sub_category",
        "coating",
        "type",
        "size",
        "material",
        "variant",
        "vertical",
    ],
    threshold: 0.1,   // Adjust this if stricter matching is acceptable
    minMatchCharLength: 2,  // Ignore short search terms
    distance: 100,  // Control how far matches are allowed
    ignoreLocation: true,  // Speed up search by ignoring location-based matches
};

const options2 = {
    keys: ["product_code"], // Keys you want to search on
    threshold: 0.1,   // Adjust this if stricter matching is acceptable
    minMatchCharLength: 2,  // Ignore short search terms
    distance: 100,  // Control how far matches are allowed
    ignoreLocation: true,  // Speed up search by ignoring location-based matches
};

// Options for Fuse.js
const options3 = {
    keys: [
        "category",
        "sub_category",
        "coating",
        "material",
        "delimitter",
    ], // Keys you want to search on
    threshold: 0.3,   // Adjust this if stricter matching is acceptable
    minMatchCharLength: 3,  // Ignore short search terms
    distance: 100,  // Control how far matches are allowed
    ignoreLocation: true,  // Speed up search by ignoring location-based matches
};

const initialState = {
    products: [], // Product data will be fetched
    metaData: [],
    filteredProducts: [],
    stockProducts: [],
    filteredstockProducts: [],
    searchTerm: "",
    selectedCategory: "",
    selectedSubCategory: "",
    slectmaterial: "",
    slectfinish: "",
    verticalMaterial: "",
    verticalFinish: "",
    sizeValue: null,
    selectedSizeName:null,
    materialAndFinish: null,
    suggestions: [],
    cartData: {},
    resultsTotal: 0,
    stockResultsTotal: 0,
    listApiStatus: "idle",
    listApiError: null,
    removeListStatus: "idle",
    searchbyitemcode: "",
    searchByAllData: "",
    updateQtyDateStatus: "idle",
    setperStatus: 0,
    // uplode csv
    uploadCsvTableStatus: "idle",
    csvProducts: null,
    csvFailedProduct: null,
    shopNowActiveTab: 0,

};

const shopNowSlice = createSlice({
    name: "shopnow",
    initialState,
    reducers: {
        setMetaData(state, action) {
            state.metaData = action.payload;
        },
        setProductsData(state, action) {
            state.products = action?.payload;
            state.stockProducts = action?.payload?.filter(product => product.stock_status === 1);
            
            state.stockResultsTotal = state?.stockProducts.length;
            state.filteredstockProducts = action?.payload?.filter(product => product.stock_status === 1).slice(0, 200);
            console.log(state.filteredstockProducts, "filteredstockProducts");
            
        },

        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            shopNowSlice.caseReducers.applyFilters(state);
        },
        setCategory(state, action) {
            state.selectedCategory = action.payload;
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting category
            shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setSubCategory(state, action) {
            state.selectedSubCategory = action.payload;
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting sub-category
            shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setVerticalMaterialValue(state, action) {
            state.verticalMaterial = action.payload;
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting material
        },
        setVerticalFinish(state, action) {
            state.verticalFinish = action.payload;
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting finish
        },
        setMaterialValue(state, action) {
            state.slectmaterial = action.payload;
            // shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting material
            shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setFinish(state, action) {
            state.slectfinish = action.payload;
            // shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting finish
            shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setVerticalSizeValue(state, action) {
            state.sizeValue = action.payload;
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting finish
            // shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setSizeValue(state, action) {
            state.sizeValue = action.payload;
            // shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting finish
            shopNowSlice.caseReducers.stockApplyFilters(state); 
        },
        setSelectedSizeName(state, action) {
            state.selectedSizeName = action.payload;
        },
        setCartData(state, action) {
            state.cartData = action.payload;
        },
        searchByItemCode(state, action) {
            state.searchbyitemcode = action.payload
            shopNowSlice.caseReducers.applyFilters(state); // Apply filters after selecting finish
        },
        searchByAllDats(state, action) {
            state.searchByAllData = action.payload
            shopNowSlice.caseReducers.applyFilters(state);
        },
        setSteperVlue(state, action) {
            state.setperStatus = action.payload
        },

        // csv upload data
        setCsvProducts(state, action) {
            state.csvProducts = action.payload;
        },
        setCsvFailedProduct(state, action) {
            state.csvFailedProduct = action.payload;
        },
        setShopNowActiveTab(state, action) {
            state.shopNowActiveTab = action.payload;
        },

        applyFilters(state) {
            let results = state.products; // Start with the full list of products

            // Fuse.js search for search term
            if (state.searchTerm) {
                // const fuse = new Fuse(state.products, options);
                const fuseIndex = Fuse.createIndex(options.keys, state.products);
                const fuse = new Fuse(state.products, options, fuseIndex);

                results = fuse.search(state.searchTerm).map((result) => result.item);
            }

            if (state.searchbyitemcode) {
                const fuse = new Fuse(state.products, options2);
                results = fuse.search(state.searchbyitemcode).map((result) => result.item);
            }
            if (state.searchByAllData) {
                const fuse = new Fuse(state.products, options);
                results = fuse.search(state.searchByAllData).map((result) => result.item);
            }
            // Filter by category
            if (state.selectedCategory) {
                const Category = results?.filter(
                    (product) => product.category_token === state.selectedCategory
                );

                if (Category.length > 0) {
                    state.materialAndFinish = null
                    results = Category
                } else {
                    state.materialAndFinish = "No Data"
                }


            }

            // Filter by subcategory
            if (state.selectedSubCategory) {
                const Category = results?.filter(
                    (product) => product.sub_category_token === state.selectedSubCategory
                );

                if (Category.length > 0) {
                    state.materialAndFinish = null
                    results = Category
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

        
            // Filter by material
            if (state.verticalMaterial) {

                const productMaterial = results?.filter(
                    (product) => product.material_token === state.verticalMaterial
                );

                if (productMaterial.length > 0) {
                    state.materialAndFinish = null
                    results = productMaterial
                } else {
                    state.materialAndFinish = "No Data"
                }
            }

            // Filter by finish
            if (state.verticalFinish) {
                const product = results?.filter((product) => product.coating_token === state.verticalFinish);

                if (product.length > 0) {
                    state.materialAndFinish = null
                    results = product
                } else {
                    state.materialAndFinish = "No Data"
                }

            }
            // Filter by finish
            if (state.sizeValue) {
                const product = results?.filter((product) => product.size_token === state.sizeValue);

                if (product.length > 0) {
                    state.materialAndFinish = null
                    results = product
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            // Filter by material
            if (state.slectmaterial) {
                const productMaterial = results?.filter(
                    (product) => product.material_token === state.slectmaterial
                );
                if (productMaterial.length > 0) {
                    state.materialAndFinish = null
                    results = productMaterial
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            // Filter by finish
            if (state.slectfinish) {
                const product = results?.filter((product) => product.coating_token === state.slectfinish);
                if(product.length > 0){
                    state.materialAndFinish = null
                    results = product
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            state.resultsTotal = results.length;
            state.suggestions = results.slice(0, 400); // Limit suggestions to top 10
            // .slice(0, 10);
        },
        stockApplyFilters(state) {
            let results = state.stockProducts;

            // Filter by category
            if (state.selectedCategory) {
                const Category = results?.filter(
                    (product) => product.category_token === state.selectedCategory
                );
                if (Category.length > 0) {
                    state.materialAndFinish = null
                    results = Category
                } else {
                    state.materialAndFinish = "No Data"
                }


            }

            // Filter by subcategory
            if (state.selectedSubCategory) {
                const Category = results?.filter(
                    (product) => product.sub_category_token === state.selectedSubCategory
                );
                if (Category.length > 0) {
                    state.materialAndFinish = null
                    results = Category
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            // Filter by material
            if (state.slectmaterial) {
                const productMaterial = results?.filter(
                    (product) => product.material_token === state.slectmaterial
                );
                if (productMaterial.length > 0) {
                    state.materialAndFinish = null
                    results = productMaterial
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            // Filter by finish
            if (state.slectfinish) {
                const product = results?.filter((product) => product.coating_token === state.slectfinish);

                if(product.length > 0){
                    state.materialAndFinish = null
                    results = product
                } else {
                    state.materialAndFinish = "No Data"
                }

            }
            // Filter by finish
            if (state.sizeValue) {
                const product = results?.filter((product) => product.size_token === state.sizeValue);
                
                
                if (product.length > 0) {
                    state.materialAndFinish = null
                    results = product
                } else {
                    state.materialAndFinish = "No Data"
                }

            }

            state.stockResultsTotal = results.length;
            state.filteredstockProducts = results.slice(0, 200); // Limit suggestions to top 10

        },
        clearSuggestions(state) {
            state.suggestions = [];
        },
        clearCategory(state) {
            state.selectedCategory = "";
        },
        clearSubCategory(state) {
            state.selectedSubCategory = "";
        },
        clearSizeValue(state) {
            state.sizeValue = null;
        },
        clearSelectedSizeName(state) {
            state.selectedSizeName = null;
        },
        clearAllData(state) {
            state.searchTerm = "";
            state.selectedCategory = "";
            state.selectedSubCategory = "";
            state.slectmaterial = "";
            state.slectfinish = "";
            state.verticalMaterial = "";
            state.verticalFinish = "";
            state.suggestions = [];
            state.searchByAllData = ''
            state.searchbyitemcode = ''
            state.materialAndFinish = null
            state.sizeValue = null
            // state.selectedSizeName = null

        },
        updateCartItems(state, action) {
            state.cartData.cart_items[action.payload.index] = action.payload.value;
        },
        resetStockFilters(state) {
            state.selectedCategory = "";
            state.selectedSubCategory = "";
            state.slectmaterial = "";
            state.slectfinish = "";
            state.materialAndFinish = null;

            // Reset the stock product filters to show all stock products
            state.filteredstockProducts = state.stockProducts?.filter(product => product.stock_status === 1)?.slice(0, 300); // Adjust limit as needed
            state.stockResultsTotal = state.stockProducts.length;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.pending, (state) => {
                state.listApiStatus = 'loading';
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.listApiStatus = 'succeeded';
                state.cartData = action.payload;
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.listApiStatus = 'failed';
                state.listApiError = action.error.message;
                toast.error((action.error.message || 'Something went wrong!'), {
                    position: "top-center"
                });
            })
            
            .addCase(fetchRemoveList.pending, (state) => {
                state.removeListStatus = 'loading';
            })
            .addCase(fetchRemoveList.fulfilled, (state, action) => {
                state.removeListStatus = 'succeeded';

            })
            .addCase(fetchRemoveList.rejected, (state, action) => {
                state.removeListStatus = 'failed';
                toast.error((action.error.message || 'Something went wrong!'), {
                    position: "top-center"
                });

            })

            .addCase(updateQtyDate.pending, (state) => {
                state.updateQtyDateStatus = "loading";
            })
            .addCase(updateQtyDate.fulfilled, (state, action) => {
                state.updateQtyDateStatus = "succeeded";
            })
            .addCase(updateQtyDate.rejected, (state, action) => {
                state.updateQtyDateStatus = "failed";
 
            })
            
            .addCase(uploadCsvTable.pending, (state) => {
                state.uploadCsvTableStatus = "loading";
            })
            .addCase(uploadCsvTable.fulfilled, (state, action) => {
                state.uploadCsvTableStatus = "succeeded";
            })
            .addCase(uploadCsvTable.rejected, (state, action) => {
                state.uploadCsvTableStatus = "failed";
       
            });

    }
});



// Export actions
export const {
    setProductsData,
    setSearchTerm,
    setCategory,
    setSubCategory,
    clearSuggestions,
    setCartData,
    removeFromCart,
    clearAllData,
    clearCategory,
    clearSubCategory,
    setMetaData,
    setMaterialValue,
    setFinish,
    setSizeValue,
    setVerticalSizeValue,
    setVerticalMaterialValue,
    setVerticalFinish,
    searchByItemCode,
    searchByAllDats,
    updateCartItems,
    setSteperVlue,
    setCsvProducts,
    setCsvFailedProduct,
    resetStockFilters,
    setShopNowActiveTab,
    setSelectedSizeName,
    clearSizeValue,
    clearSelectedSizeName,
} = shopNowSlice.actions;

// Export reducer
export default shopNowSlice.reducer;