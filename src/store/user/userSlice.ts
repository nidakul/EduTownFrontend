import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { UserInformationResponse } from "../../models/responses/studentInformationResponse";

const initialState: {user: UserInformationResponse | null} = {
  user: null,
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
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetailById.fulfilled,(state,action) => {
      state.user = action.payload;
    })
  }
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions; 
