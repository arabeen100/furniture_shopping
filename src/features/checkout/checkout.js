import { createSlice } from "@reduxjs/toolkit";
const initialState={
    sum:0,
    total:0,
    coupon:"",
    error:"",
    openEdit:false,
    editStatus:false,
    selectedAddressId:null,
    finalTotal:0,
    location:[
    {
      id:1,
      name:"Cairo,Egypt",
      latitude:"30.02",
      longitude:"31.13"
    },
    {
      id:2,
      name:"Riyadh,Saudi Arabia",
      latitude:"24.4",
      longitude:"46.7166"  
    },
    {
      id:3,
      name:"Abu Dhabi,United Arab Emirates",
      latitude:"24.4538",
      longitude:"54.3773"  
    }]
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
        setFinalTotal:(state,{payload})=>{
          state.finalTotal= payload;
      },
        setSelectedAddressId:(state,{payload})=>{
          state.selectedAddressId= payload;
      },
      setOpenEdit:(state,{payload})=>{
        state.openEdit= payload;
      },
      setEditStatus:(state,{payload})=>{
        state.editStatus= payload;
      },

    },
        
})
export default checkoutSlice.reducer;
export const {setEditStatus,setOpenEdit,setFinalTotal,setSelectedAddressId,setTotal,setError,setCoupon,setSum,resetSum}=checkoutSlice.actions;