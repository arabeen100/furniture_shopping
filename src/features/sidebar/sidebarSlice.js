import { createSlice } from "@reduxjs/toolkit";
const initialState={
    expanded:false,
    profileClicked:false,
    wishlistClicked:false,
    userOrdersClicked:false,
    expandedMenu:false,
}
const sidebarSlice=createSlice({
    name:"sidebar",
    initialState,
    reducers:{
        setExpanded:(state)=>{
            state.expanded= !state.expanded;
        },
        setProfileClicked:(state,{payload})=>{
            state.profileClicked=payload
        },
        setWishlistClicked:(state,{payload})=>{
            state.wishlistClicked=payload
        },
        setUserOrdersClicked:(state,{payload})=>{
            state.userOrdersClicked=payload
        },
        setExpandedMenu:(state)=>{
            state.expandedMenu= !state.expandedMenu;
        },
    }
})
export default sidebarSlice.reducer;
export const {setExpanded,setProfileClicked,setUserOrdersClicked,setWishlistClicked,setExpandedMenu}=sidebarSlice.actions