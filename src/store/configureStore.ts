import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import studentReducer from "./student/studentSlice";
import schoolReducer from "./school/schoolSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  student: studentReducer,
  school: schoolReducer
});

export const store = configureStore({ reducer: rootReducer }); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;