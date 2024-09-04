import { createSlice } from "@reduxjs/toolkit";
import tokenService from "../../core/services/tokenService";

// const getInitialState = () => {
//   if (tokenService.hasToken()) return { isAuthenticated: true };
//   return { isAuthenticated: false };
// };

// Token kontrolü yaparak başlangıç durumunu ayarla
const getInitialState = () => {
  const token = tokenService.getToken();
  if (token) return { isAuthenticated: true };
  return { isAuthenticated: false };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    isAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});


export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
