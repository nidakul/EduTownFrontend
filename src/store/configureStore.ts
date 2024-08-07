import { combineReducers } from "redux";
import { authReducer } from "./auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/userSlice";
import studentReducer from "./student/studentSlice";
import schoolReducer from "./school/schoolSlice";
import classReducer from "./class/classSlice";
import lessonReducer from "./lesson/lessonSlice";
import termReducer from "./term/termSlice";
import gradeTypeReducer from "./gradeType/gradeTypeSlice";
import branchReducer from "./branch/branchSlice";
import postReducer from "./post/postSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  student: studentReducer,
  school: schoolReducer,
  classes: classReducer,
  lesson: lessonReducer,
  term: termReducer,
  gradeType: gradeTypeReducer,
  branch: branchReducer,
  post: postReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({ reducer: rootReducer }); 