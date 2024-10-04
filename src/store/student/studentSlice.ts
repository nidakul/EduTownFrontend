import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import studentService from '../../services/studentService';
import { StudentGradesResponse } from '../../models/responses/studentGradesResponse';
import { StudentInformationResponse } from '../../models/responses/studentInformationResponse';
import { StudentRequest } from '../../models/requests/studentRequest';
import { GetStudentsBySchoolIdClassIdBranchIdResponse } from '../../models/responses/getStudentsBySchoolIdClassIdBranchIdResponse';

interface StudentGradesState {
    items: StudentInformationResponse[];
    studentGrades: StudentGradesResponse | null;
    updateStudent: StudentRequest[];
    students: GetStudentsBySchoolIdClassIdBranchIdResponse | null;
}

const initialState: StudentGradesState = {
    items: [],
    studentGrades: null,
    updateStudent: [],
    students: null
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

export const updateStudent = createAsyncThunk(
    'students/updateStudent',
    async(studentData: StudentRequest) => {
        const response = await studentService.updateStudent(studentData);
        return response.data;
    }
);

export const getStudentsBySchoolIdClassIdBranchId = createAsyncThunk<GetStudentsBySchoolIdClassIdBranchIdResponse, {schoolId: number, classId: number, branchId: number}>("getListStudentsBySchoolIdClassIdBranchId", async(params) => {
    const { schoolId, classId , branchId} = params;
    const response = await studentService.getStudentsBySchoolIdClassIdBranchId(schoolId, classId, branchId);
    return response.data;
})

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
        .addCase(updateStudent.fulfilled, (state, action) => {
            const index = state.updateStudent.findIndex(student => student.userId === action.payload.studentData.studentId); 
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })
        .addCase(getStudentsBySchoolIdClassIdBranchId.fulfilled,(state,action) => {
            state.students = action.payload;
        })
    }
})

export const {} = studentSlice.actions;
export default studentSlice.reducer;