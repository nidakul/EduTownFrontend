import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import gradeTypeService from "../../services/gradeTypeService"
import { GetListGradeTypeList } from "../../models/responses/getListGradeTypeResponse";

const initialState: {gradeType: GetListGradeTypeList | null} = {
    gradeType: null
}

export const getGradeTypes = createAsyncThunk('gradeType/getAll',
    async() => {
        const response = await gradeTypeService.getList();
        return response.data;
    }
)

export const gradeTypeSlice = createSlice({
    name: "gradeType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGradeTypes.fulfilled, (state, action) => {
            state.gradeType = action.payload;
        })
    }
})

export const {} = gradeTypeSlice.actions;
export default gradeTypeSlice.reducer; 