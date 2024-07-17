import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import studentService from '../../services/studentService';
import { UserInformationResponse } from '../../models/responses/userInformationResponse';

const initialState = {
    items: [] as UserInformationResponse[]} 


export const getAllStudents = createAsyncThunk('students/getAll', async() => {
    const response = await studentService.getListStudentDetail();
    return response.data.items; 
}) 

export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers:{ 

    },
    extraReducers: (builder) => { 
        builder.addCase(getAllStudents.fulfilled,(state, action) => {
            state.items = action.payload;
        })
    }
})

export const {} = studentSlice.actions;
export default studentSlice.reducer;