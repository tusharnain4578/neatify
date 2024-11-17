import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action for logging in
    login: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Action for setting only user
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    // Action for logging out
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout, setUser } = authSlice.actions;
