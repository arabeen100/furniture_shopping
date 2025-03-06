import { apiSlice } from "@/features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "../features/api/apiSlice"
import sidebarReducer from "../features/sidebar/sidebarSlice"
import registerReducer from "../features/register/registerSlice"
import searchReducer from "../features/search/searchSlice"
export const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiReducer,
        search: searchReducer,
        sidebar:sidebarReducer,
        register:registerReducer,



    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
});