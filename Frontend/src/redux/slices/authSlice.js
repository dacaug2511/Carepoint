import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ uname, password }) => {
    const response = await loginUser(uname, password);
    return response;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data;   // ✅ USER OBJECT
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.data));
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
