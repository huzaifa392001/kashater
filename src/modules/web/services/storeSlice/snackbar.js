import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: "success" };

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackbar(state, action) {
      state.message = action.payload.message;
      state.type =
        action.payload.status_code === 200 ||
        action.payload.status_code === 201 ||
        action.payload.type === "success"
          ? "success"
          : "error";
    },
  },
});
export const snackbarActions = snackbarSlice.actions;
export default snackbarSlice;
