import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
      { email, password }
    );
    return res.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;

        const decoded = JSON.parse(atob(action.payload.token.split('.')[1]));
        state.user = decoded;

        localStorage.setItem('token', action.payload.token);
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${action.payload.token}`;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
