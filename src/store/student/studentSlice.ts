import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import studentService from '../../services/studentService';
import { UserInformationResponse } from '../../models/responses/userInformationResponse';
import { StudentGradesResponse } from '../../models/responses/studentGradesResponse';

interface StudentGradesState {
    studentGrades: StudentGradesResponse | null;
    items: UserInformationResponse[];
}

const initialState: StudentGradesState = {
    items: [],
    studentGrades: null,
};

export const getAllStudents = createAsyncThunk('students/getAll', async() => {
    const response = await studentService.getListStudentDetail();
    return response.data.items; 
}) 

export const getStudentGrades = createAsyncThunk('students/getStudentGrades',
    async(id: string) => {
        const response = await studentService.getStudentGrades(id);
        return response.data;
    }
)



export const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers:{ 

    },
    extraReducers: (builder) => { 
        builder
        .addCase(getAllStudents.fulfilled,(state, action) => {
            state.items = action.payload;
        })
        .addCase(getStudentGrades.fulfilled, (state, action) => {
            state.studentGrades = action.payload;
        })
    }
})

export const {} = studentSlice.actions;
export default studentSlice.reducer;