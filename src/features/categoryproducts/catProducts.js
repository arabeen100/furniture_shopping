import { createSlice } from "@reduxjs/toolkit";
const initialState={
    color:0,
    size:"",
    sort:"",
    limit:12,
    offset:0,
    minPriceP:0,
    maxPriceP:0,
    categoryId:10,
   /*  radioColor:"",
    radiosize:"", */
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
      /*   setRadioColor:(state,{payload})=>{
            state.radioColor=payload;
        },
        setRadioSize:(state,{payload})=>{
            state.radiosize=payload;
        }, */
     
    }
})
export default catProductsSlice.reducer;
export const {setColor,setLimit,setMaxPriceP,setMinPriceP,setOffset,setSize,setSort,setCategoryId}=catProductsSlice.actions