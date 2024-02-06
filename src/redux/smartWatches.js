import { createSlice } from "@reduxjs/toolkit";
const initialState={
    smarts:[]
}
const smartwatcheSlice=createSlice({
    name:"Smartwatchslice",
    initialState,
    reducers:{
        getWatches:(state,action) => {
            state.smarts=action.payload
        }
    }
});
export const { getWatches}=smartwatcheSlice.actions;
export default smartwatcheSlice.reducer;