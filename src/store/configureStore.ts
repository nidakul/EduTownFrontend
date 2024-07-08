import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import studentReducer from "./student/studentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  student: studentReducer 
});

export const store = configureStore({ reducer: rootReducer }); 