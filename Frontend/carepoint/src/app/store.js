import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import roleReducer from "../redux/slices/roleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
  },
});
