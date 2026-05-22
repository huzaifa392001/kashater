import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/storeSlice/authSlice";
import sidBarSlice from "../services/storeSlice/sideBar";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    sidbar: sidBarSlice,
  
  },
});

export default store;
