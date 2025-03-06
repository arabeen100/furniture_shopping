import { createSlice } from "@reduxjs/toolkit";
const initialState={
    registered:false,
}
const registerSlice=createSlice({
    name:"register",
    initialState,
    reducers:{
        ifRegister:(state)=>{
            state.registered= true;
        },
        ifNotRegister:(state)=>{
            state.registered=false;
        }

    }
})
export default registerSlice.reducer;
export const {ifRegister,ifNotRegister}=registerSlice.actions