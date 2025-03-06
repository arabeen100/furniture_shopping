import { createSlice } from "@reduxjs/toolkit";
const initialState={
    expanded:false,
}
const sidebarSlice=createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        setExpanded:(state)=>{
            state.expanded= !state.expanded;
        }
    }
})
export default sidebarSlice.reducer;
export const {setExpanded}=sidebarSlice.actions