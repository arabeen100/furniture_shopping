import { createSlice } from "@reduxjs/toolkit";
const initialState={
    resetPass:"",
}
const verifyCodeSlice=createSlice({
    name:"verifyCode",
    initialState,
    reducers:{
        setResetPass:(state,{payload})=>{
            state.resetPass=payload ;
        },
    }
})
export default verifyCodeSlice.reducer;
export const {setResetPass }=verifyCodeSlice.actions