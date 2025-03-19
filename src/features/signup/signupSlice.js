import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:"",
    userName:"",
    phone:"",
    email:"",
    password:"",
    err:{},
}
const signupSlice=createSlice({
    name:"signup",
    initialState,
    reducers:{
        setName:(state,{payload})=>{
            state.name=payload;
        },
        setUserName:(state,{payload})=>{
            state.userName=payload;
        },
        setPhone:(state,{payload})=>{
            state.phone=payload;
        },
        setEmail:(state,{payload})=>{
            state.email=payload;
        },
        setPassword:(state,{payload})=>{
            state.password=payload;
        },
        setErr:(state,{payload})=>{
            state.err=payload;
        },
        clearErr:(state)=>{
            state.err={};
        },
        
        
     
    }
})
export default signupSlice.reducer
export const{setName,setUserName,setPhone,setEmail,setErr,clearErr,setPassword}=signupSlice.actions