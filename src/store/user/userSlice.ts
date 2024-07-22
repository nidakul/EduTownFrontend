import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { StudentInformationResponse } from "../../models/responses/studentInformationResponse";

interface UserDetailState {
  items: StudentInformationResponse | null;
}

const initialState: UserDetailState  = {
  items: null,
};

export const getUserDetailById = createAsyncThunk('users/getDetailById',
  async(id: string) => {
    const response = await userService.getUserDetailById(id);
    return response.data
  }
) 

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetailById.fulfilled,(state,action) => {
      state.items = action.payload;
    })
  }
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions; 
