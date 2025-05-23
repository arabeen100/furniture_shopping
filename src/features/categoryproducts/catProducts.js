import { createSlice } from "@reduxjs/toolkit";
const initialState={
    color:0,
    size:"",
    selectedSizeId:0,
    selectedColorId:0,
    sort:null,
    limit:20,
    offset:0,
    minPriceP:null,
    maxPriceP:null,
    minPrice:null,
    maxPrice:null,
    min:null,
    max:null,
    categoryId:null,
    productId:null,
    catMenuClicked1:false,
    catMenuClicked2:false,
    catMenuClicked3:false,
    catMenuClicked4:false,
    count:1,
    selectedColor:{},
    selectedSize:{},
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
        setProductId:(state,{payload})=>{
            state.productId=payload;
        },
        setCount:(state,{payload})=>{
            state.count=payload;
        },
        setSelectedColor:(state,{payload})=>{
            state.selectedColor=payload;
        },
        setSelectedSize:(state,{payload})=>{
            state.selectedSize=payload;
        },
        setCatMenuClicked1:(state,{payload})=>{
            state.catMenuClicked1=payload;
        },
        setCatMenuClicked2:(state,{payload})=>{
            state.catMenuClicked2=payload;
        },
        setCatMenuClicked3:(state,{payload})=>{
            state.catMenuClicked3=payload;
        },
        setCatMenuClicked4:(state,{payload})=>{
            state.catMenuClicked4=payload;
        },
        setSelectedSizeId:(state,{payload})=>{
            state.selectedSizeId=payload;
        },
        setSelectedColorId:(state,{payload})=>{
            state.selectedColorId=payload;
        },
        setMinPrice:(state,{payload})=>{
            state.minPrice=payload;
        }, 
        setMaxPrice:(state,{payload})=>{
            state.maxPrice=payload;
        },
          setMax:(state,{payload})=>{
            state.max=payload;
        },
          setMin:(state,{payload})=>{
            state.min=payload;
        },
    }
})
export default catProductsSlice.reducer;
export const {setMin,setMax,setMinPrice,setMaxPrice,setSelectedColorId,setSelectedSizeId,setCatMenuClicked1,setCatMenuClicked2,setCatMenuClicked3,setCatMenuClicked4,setSelectedColor,setSelectedSize,setCount,setProductId,setColor,setLimit,setMaxPriceP,setMinPriceP,setOffset,setSize,setSort,setCategoryId}=catProductsSlice.actions