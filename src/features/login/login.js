import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:localStorage.getItem("userToken")||"",
    error:"",
}
const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setToken:(state,{payload})=>{
            state.token= payload;
        },
        setError:(state,{payload})=>{
            state.error= payload;
        },
        setItem:(state)=>{
            localStorage.setItem("userToken",state.token)
        },

        },
        
})
export default loginSlice.reducer;
export const {setError,setToken,setItem}=loginSlice.actions;