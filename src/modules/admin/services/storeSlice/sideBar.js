import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

import toast from "react-hot-toast";
export const fetchList = createAsyncThunk('data/fetchList', async () => {
    const AdminbearerToken = JSON.parse(localStorage.getItem("adminUserData"))?.authToken;
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
    const response = await axios.get(`${baseUrl}/admin/modules`, {
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



const initialState = {
    sidbarData: [],
    listApiStatus: "idle",

};

const sidBarSlice = createSlice({
    name: "sidbar",
    initialState,
    reducers: {
        setMetaData(state, action) {
            state.metaData = action.payload;
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchList.pending, (state) => {
                state.listApiStatus = 'loading';
            })
            .addCase(fetchList.fulfilled, (state, action) => {
                state.listApiStatus = 'succeeded';
                state.sidbarData = action.payload;
            })
            .addCase(fetchList.rejected, (state, action) => {
                state.listApiStatus = 'failed';
                state.listApiError = action.error.message;
                toast.error((action.error.message || 'Something went wrong!'), {
                    position: "top-center"
                });
            })
    }
});



// Export actions
export const {
    setProductsData,
} = sidBarSlice.actions;

// Export reducer
export default sidBarSlice.reducer;