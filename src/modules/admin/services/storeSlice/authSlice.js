import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  modules: [],
  is_reset_password: "",
};

// Retrieve stored user data securely
// const storedUser = localStorage.getItem("scannerUserData")
//   ? JSON.parse(localStorage.getItem("scannerUserData"))
//   : null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setBearerToken(state, action) {
      const storedUser = localStorage.getItem("adminUserData")
        ? JSON.parse(localStorage.getItem("adminUserData"))
        : null;
      if (storedUser) {
        const updatedUser = { ...storedUser, authToken: action.payload };
        localStorage.setItem("adminUserData", JSON.stringify(updatedUser));
      }
    },
    // setStage(state, action) {
    //   const storedUser = localStorage.getItem("adminUserData")
    //     ? JSON.parse(localStorage.getItem("adminUserData"))
    //     : null;
    //   if (storedUser) {
    //     const updatedUser = { ...storedUser, stages2: action.payload };
    //     localStorage.setItem("adminUserData", JSON.stringify(updatedUser));
    //   }
    //   state.stages2 = action.payload;
    // },
    login(state, action) {
      const storedUser = localStorage.getItem("adminUserData")
        ? JSON.parse(localStorage.getItem("adminUserData"))
        : null;
      const { token, name, email, modules, is_reset_password  } = action.payload;
 

      state.name = name;
      state.email = email;
      state.modules = modules;
      state.is_reset_password = is_reset_password;
      const updatedUser = {
        ...storedUser,
        authToken: token,
        email,
        modules,
        is_reset_password,
      };
      localStorage.setItem("adminUserData", JSON.stringify(updatedUser));
    },
    logout(state) {
      state.name = "";
      state.email = "";
      state.is_reset_password = "";
      state.modules = [];
      localStorage.removeItem("adminUserData");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
