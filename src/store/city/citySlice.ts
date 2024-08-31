import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetListCityResponse } from "../../models/responses/getListCityResponse";
import cityService from "../../services/cityService";

interface CityState{
    items: GetListCityResponse[];
}

const initialState:CityState = {
    items: []
}

export const getAllCities = createAsyncThunk("city/getAll", async() => {
    const response = await cityService.getListCities();
    return response.data.items; 
})

export const citySlice = createSlice({
    name: 'city', 
    initialState, 
    reducers:{},
    extraReducers:(builder)=> 
        builder
    .addCase(getAllCities.fulfilled, (state, action) => {
        state.items = action.payload;
    }) 
})

export const {} = citySlice.actions;
export default citySlice.reducer;