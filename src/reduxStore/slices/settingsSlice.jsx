import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "light",
    selectedagencyData: {
      agencyCode:"",
      userName:""
    },
    self: true
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setSelectedAgencyData: (state, action) => {
      state.selectedagencyData = action.payload;
    },
    setSelf: (state, action) => {
      state.self = action.payload;
    }
  }
});

export const { toggleTheme, setSelectedAgencyData, setSelf } =
  settingsSlice.actions;
export default settingsSlice.reducer;
