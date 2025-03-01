import { apiSlice } from "@/features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/api/apiSlice"
export const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiReducer,

    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
});