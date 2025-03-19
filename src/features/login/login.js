import { createSlice } from "@reduxjs/toolkit";
const initialState={
    token:localStorage.getItem("userToken")||"",
}
const loginSlice=createSlice({
    name:"login",
    initialState,
    reducers:{
        setToken:(state,{payload})=>{
            state.token= payload;
        },
        setItem:(state)=>{
            localStorage.setItem("userToken",state.token)
        }

        },
})
export default loginSlice.reducer;
export const {setToken,setItem}=loginSlice.actions;