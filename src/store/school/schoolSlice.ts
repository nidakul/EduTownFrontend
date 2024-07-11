import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import schoolService from "../../services/schoolService";
import { SchoolResponse } from "../../models/responses/schoolResponse";

const initialState: { school: SchoolResponse | null } = {
    school: null 
}

export const getSchoolById = createAsyncThunk('schools/getById',
    async(id: number) => {
        const response = await schoolService.getById(id);
        return response.data;
    })

    export const schoolSlice = createSlice({
        name: "school",
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(getSchoolById.fulfilled, (state, action) => {
                state.school = action.payload;
            })
        }
    })

export const {} = schoolSlice.actions;
export default schoolSlice.reducer; 
