import { createSlice } from "@reduxjs/toolkit";
const initialState={
    likedItems:{},
}
const likedItemsSlice=createSlice({
    name:"LikedItems",
    initialState,
    reducers:{
        setLikedItems:(state,{payload})=>{
            state.likedItems= payload;
        }
    }
})
export default likedItemsSlice.reducer;
export const {setLikedItems}=likedItemsSlice.actions