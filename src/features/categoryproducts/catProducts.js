import { createSlice } from "@reduxjs/toolkit";
const initialState={
    color:"",
    size:"",
    sort:"",
    limit:12,
    offset:0,
    minPriceP:"",
    maxPriceP:"",
    categoryId:10,
}
const catProductsSlice=createSlice({
    name:"catProducts",
    initialState,
    reducers:{
        setColor:(state,{payload})=>{
            state.color=payload;
        },
        setSize:(state,{payload})=>{
            state.size=payload;
        },
        setSort:(state,{payload})=>{
            state.sort=payload;
        },
        setLimit:(state,{payload})=>{
            state.limit=payload;
        },
        setOffset:(state,{payload})=>{
            state.offset=payload;
        },
        setMinPriceP:(state,{payload})=>{
            state.minPriceP=payload;
        },
        setMaxPriceP:(state,{payload})=>{
            state.maxPriceP=payload;
        },
        setCategoryId:(state,{payload})=>{
            state.categoryId=payload;
        },
     
    }
})
export default catProductsSlice.reducer;
export const {setColor,setLimit,setMaxPriceP,setMinPriceP,setOffset,setSize,setSort,setCategoryId}=catProductsSlice.actions