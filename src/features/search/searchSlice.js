import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isOpen:false,
    name:"",
}
export const searchSlice=createSlice({
    name:"search",
    initialState,
    reducers:{
        openSearch:(state)=>{
            state.isOpen=true;
        },
        closeSearch:(state)=>{
            state.isOpen=false;
        },
        setName:(state,{payload})=>{
            state.name=payload
        }
    }
})
export default searchSlice.reducer
export const {openSearch,setName,closeSearch}=searchSlice.actions