import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./AppSlice";
import authSlice from "./slices/authSlice";
import settingsSlice from "./slices/settingsSlice";


const persistConfig = {
  key: "UserLognCred",
  version: 1,
  storage
};
const reducer = combineReducers({ loginDetails: appReducer, auth: authSlice, setting: settingsSlice });
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  // reducer: { persistedReducer }
  reducer: {persistedReducer}, // Use the persisted reducer directly
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check
    })
});

