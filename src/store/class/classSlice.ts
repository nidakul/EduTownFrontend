import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import schoolTypeService from "../../services/schoolTypeService"
import { GetListClassesBySchoolTypeId } from "../../models/responses/getListClassesBySchoolTypeId";
import { ClassInformationResponse } from "../../models/responses/classInformationResponse";
import classService from "../../services/classService";

interface ClassState{
classes: GetListClassesBySchoolTypeId | null;
items: ClassInformationResponse[];
}

const initialState: ClassState = {
    classes: null,
    items: []
} 

export const getClassesBySchoolTypeId = createAsyncThunk('classes/getSchoolTypeId',
    async(id: number) => {
        const response = await schoolTypeService.getClassesBySchoolTypeIdResponse(id);
        return response.data;
    }
)

export const getAllClasses = createAsyncThunk('classes/getAll', async() => {
    const response = await classService.getList();
    return response.data.items;
})

export const classSlice = createSlice({
    name: "classes",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(getClassesBySchoolTypeId.fulfilled, (state, action) => {
            state.classes = action.payload;
        })
        .addCase(getAllClasses.fulfilled, (state, action) => {
            state.items = action.payload;
        })
    }
}
)

export const {} = classSlice.actions;
export default classSlice.reducer;