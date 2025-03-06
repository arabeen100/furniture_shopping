import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isOpen:false,
    searchInput:"",
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
        setSearch:(state,{payload})=>{
            state.searchInput=payload
        }
    }
})
export default searchSlice.reducer
export const {openSearch,setSearch,closeSearch}=searchSlice.actions