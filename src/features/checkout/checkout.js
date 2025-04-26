import { createSlice } from "@reduxjs/toolkit";
const initialState={
    sum:0,
    total:0,
    coupon:"",
    error:"",
}
const checkoutSlice=createSlice({
    name:"checkout",
    initialState,
    reducers:{
        setSum:(state,{payload})=>{
            state.sum=state.sum+ payload;
        },
        resetSum:(state)=>{
          state.sum=0
        },
        setCoupon:(state,{payload})=>{
            state.coupon= payload;
        },
        setError:(state,{payload})=>{
            state.error= payload;
        },
        setTotal:(state,{payload})=>{
            state.total= payload;
        },

        },
        
})
export default checkoutSlice.reducer;
export const {setTotal,setError,setCoupon,setSum,resetSum}=checkoutSlice.actions;