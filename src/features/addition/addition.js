import { createSlice } from "@reduxjs/toolkit";
const initialState={
    openAddition:false,
    successMessage:false,
    
}
export const addition=createSlice({
    name:"addition",
    initialState,
    reducers:{
        setOpenAddition:(state,{payload})=>{
            state.openAddition=payload;
        },
           setSuccessMessage:(state,{payload})=>{
            state.successMessage=payload;
        },
    }
})
export default addition.reducer
export const {setSuccessMessage,setOpenAddition}=addition.actions