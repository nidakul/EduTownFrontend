import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";
import { StudentInformationResponse } from "../../models/responses/studentInformationResponse";

interface UserDetailState {
  user: StudentInformationResponse | null;
  loading: boolean;
}

const initialState: UserDetailState = {
  user: null,
  loading: false, 
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
    builder
      .addCase(getUserDetailById.pending, (state) => {
        state.loading = true; // İşlem başladığında loading true olur
      })
      .addCase(getUserDetailById.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false; // İşlem başarıyla tamamlandığında loading false olur 
      })
      .addCase(getUserDetailById.rejected, (state) => {
        state.loading = false; // İşlem başarısız olduğunda loading false olur
      });
  }
});


export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions; 
