import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    token: localStorage.getItem("access-token") || null,
  },

  reducers: {
    getToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("access-token", action.payload);
    },
    getUserDetails(state, action) {
      state.bearerToken = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("access-token", action.payload.token);
    },
    logOut(state, action) {
      state.token = null;
      localStorage.removeItem("access-token");
    },
  },
});

const { reducer, actions } = authSlice;
export const { getToken, logOut, getUserDetails } = actions;
export default reducer;
