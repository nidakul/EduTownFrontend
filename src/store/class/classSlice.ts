import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import schoolTypeService from "../../services/schoolTypeService"
import { GetListClassesBySchoolTypeId } from "../../models/responses/getListClassesBySchoolTypeId";

const initialState: {classes: GetListClassesBySchoolTypeId | null} = {
    classes: null
} 

export const getClassesBySchoolTypeId = createAsyncThunk('classes/getSchoolTypeId',
    async(id: number) => {
        const response = await schoolTypeService.getClassesBySchoolTypeIdResponse(id);
        return response.data;
    }
)

export const classSlice = createSlice({
    name: "classes",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getClassesBySchoolTypeId.fulfilled, (state, action) => {
            state.classes = action.payload;
        })
    }
}
)

export const {} = classSlice.actions;
export default classSlice.reducer;