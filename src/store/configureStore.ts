import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export const store = configureStore({ reducer: rootReducer });