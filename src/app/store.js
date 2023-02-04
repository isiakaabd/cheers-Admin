import { configureStore } from "@reduxjs/toolkit";
import { api } from "redux/api/api";
import authReducer from "redux/auth/auth.reducers";
import adminReducer from "redux/auth/auth.reducers";
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
