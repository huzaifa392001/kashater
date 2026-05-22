import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../services/storeSlice/authSlice"
import scrollNavSlice from "../services/scrollNavSlice"
import addCartSlice from "../services/storeSlice/addCart"

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    addCart: addCartSlice.reducer,
    scrollnav: scrollNavSlice,
  },
})

export default store
