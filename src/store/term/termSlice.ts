import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import termService from "../../services/termService"
import { GetTermsItems, GetTermsResponse } from "../../models/responses/getTermsResponse";

const initialState: {term: GetTermsItems| null} = {
    term: null
}

export const getTerms = createAsyncThunk("terms/getAll",
    async()=>{
        const response = await termService.getList();
        return response.data;
    }
)

export const termSlice = createSlice({
    name: "term",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getTerms.fulfilled,(state,action) => {
            state.term = action.payload;
        })
    }
}) 

export const {} = termSlice.actions;
export default termSlice.reducer;