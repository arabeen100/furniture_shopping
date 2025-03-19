import { createSlice } from "@reduxjs/toolkit";
const initialState={
    signupStatus:false,
    forgotPassStatus:false,
}
const responseStatusSlice=createSlice({
    name:"responseStatus",
    initialState,
    reducers:{
        setSignupStatus:(state,{payload})=>{
            state.signupStatus=payload;
        },
        setForgotPassStatus:(state,{payload})=>{
            state.forgotPassStatus=payload;
        },
    }
})
export default responseStatusSlice.reducer ;
export const {setSignupStatus,setForgotPassStatus}=responseStatusSlice.actions