import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { GetBranchesBySchoolIdAndClassIdResponse } from "../../models/responses/getBranchesBySchoolIdAndClassIdResponse"
import branchService from "../../services/branchService";

const initialState: {branch: GetBranchesBySchoolIdAndClassIdResponse | null} = {
    branch: null
}
    export const getBranchesBySchoolIdAndClassId = createAsyncThunk<GetBranchesBySchoolIdAndClassIdResponse, { schoolId: number, classId: number }>(
        'branches/getBranchesBySchoolIdAndClassId',
        async (params) => {
            const { schoolId, classId } = params;
            const response = await branchService.getBranchesBySchoolIdAndClassId(schoolId, classId);
            return response.data;
        }
    );

    export const branchSlice = createSlice({
        name: "branch",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getBranchesBySchoolIdAndClassId.fulfilled,(state, action) => {
                state.branch = action.payload;
            })
        }
    })

    export const {} = branchSlice.actions;
    export default branchSlice.reducer;