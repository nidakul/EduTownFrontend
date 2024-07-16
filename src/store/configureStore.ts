import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import studentReducer from "./student/studentSlice";
import schoolReducer from "./school/schoolSlice";
import classReducer from "./class/classSlice";
import lessonReducer from "./lesson/lessonSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  student: studentReducer,
  school: schoolReducer,
  classes: classReducer,
  lesson: lessonReducer
});

export const store = configureStore({ reducer: rootReducer }); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;