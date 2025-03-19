import { createSlice } from "@reduxjs/toolkit";
const initialState={
    userEmail:"",
}
const forgotPassSlice=createSlice({
    name:"forgotPass",
    initialState,
    reducers:{
        setUserEmail:(state,{payload})=>{
            state.userEmail= payload;
        }
    }
})
export default forgotPassSlice.reducer;
export const {setUserEmail}=forgotPassSlice.actions