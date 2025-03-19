import { createSlice } from "@reduxjs/toolkit";
const initialState={
    buttonClicked:false,
}
const plusButtonSlice=createSlice({
    name:"plusButton",
    initialState,
    reducers:{
        setButtonClicked:(state)=>{
            state.buttonClicked= !state.buttonClicked;
        }
    }
})
export default plusButtonSlice.reducer;
export const {setButtonClicked}=plusButtonSlice.actions