import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: false,
    agencyCode: null,
    userName: null,
    token: null
  },
  reducers: {
    login: (state, action) => {
      state.loginStatus = action.payload.loginStatus;
      state.agencyCode = action.payload.agencyCode;
      state.userName = action.payload.userName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.loginStatus = false;
      state.agencyCode = null;
      state.userName = null;
      state.token = null;
    }
  }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
