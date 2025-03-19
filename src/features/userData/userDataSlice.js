import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:"",
    username:"",
    email:"",
    phone:"",
}
const userDataSlice=createSlice({
    name:"userData",
    initialState,
    reducers:{
        setName:(state,{payload})=>{
            state.name=payload;
        },
        setUsername:(state,{payload})=>{
            state.username=payload;
        },
        setEmail:(state,{payload})=>{
            state.email=payload;
        },
        setPhone:(state,{payload})=>{
            state.phone=payload;
        }
    }
})
export default userDataSlice.reducer;
export const {setName,setUsername,setEmail,setPhone}=userDataSlice.actions