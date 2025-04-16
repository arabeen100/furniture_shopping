import { createSlice } from "@reduxjs/toolkit";
const initialState={
    name:"",
}
const userDataSlice=createSlice({
    name:"userData",
    initialState,
    reducers:{
        setName:(state,{payload})=>{
            state.name=payload;
        },
     
    }
})
export default userDataSlice.reducer;
export const {setName}=userDataSlice.actions