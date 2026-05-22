import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  mobile_number: "",
  country_code: "",
  available_point: "",
  profile_picture:"",
  id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfilePicture(state, action) {
      state.profile_picture = action.payload
    },
    setBearerToken(state, action) {
      const storedUser = localStorage.getItem("webAppUserData")
        ? JSON.parse(localStorage.getItem("webAppUserData"))
        : {};
      const updatedUser = { ...storedUser, authToken: action.payload };
      localStorage.setItem("webAppUserData", JSON.stringify(updatedUser));
    },

    login(state, action) {
      const storedUser = localStorage.getItem("webAppUserData")
        ? JSON.parse(localStorage.getItem("webAppUserData"))
        : {};
      const {
        id,
        name,
        email,
        mobile_number,
        country_code,
        available_point,
        profile_picture
      } = action.payload;

      state.id = id;
      state.name = name;
      state.email = email;
      state.mobile_number = mobile_number;
      state.country_code = country_code;
      state.available_point = available_point;
      state.profile_picture = profile_picture;

      const updatedUser = {
        ...storedUser,
        id,
        name,
        email,
        mobile_number,
        country_code,
        available_point,
        profile_picture
      };
      localStorage.setItem("webAppUserData", JSON.stringify(updatedUser));
    },

    logout(state) {
      state.id = "";
      state.name = "";
      state.email = "";
      state.mobile_number = "";
      state.country_code = "";
      state.available_point = "";
      state.profile_picture = "";
      localStorage.removeItem("webAppUserData");
      localStorage.removeItem("Gift");
      
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
