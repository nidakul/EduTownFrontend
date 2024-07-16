import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import lessonService from "../../services/lessonService"
import { GetLessonsBySchoolIdAndClassIdResponse } from "../../models/responses/getLessonsBySchoolIdAndClassIdResponse";

const initialState: {lesson: GetLessonsBySchoolIdAndClassIdResponse | null} = {
lesson:null
}

export const getLessonsBySchoolIdAndClassId = createAsyncThunk<GetLessonsBySchoolIdAndClassIdResponse, { schoolId: number, classId: number }>(
    'lessons/getLessonsBySchoolIdAndClassId',
    async (params) => {
        const { schoolId, classId } = params;
        const response = await lessonService.getLessonsBySchoolIdAndClassId(schoolId, classId);
        return response.data;
    }
);
 
export const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLessonsBySchoolIdAndClassId.fulfilled, (state, action) => {
            state.lesson = action.payload;
        })
    }
})

export const {} = lessonSlice.actions;
export default lessonSlice.reducer;