import { apiSlice } from "@/features/api/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "../features/sidebar/sidebarSlice"
import searchReducer from "../features/search/searchSlice"
import loginReducer from "../features/login/login"
import responseStatusReducer from "../features/responseStatus/responseStatusSlice"
import signupReducer from "../features/signup/signupSlice"
import verifyCodeReducer from "../features/verifycode/verifyCodeSlice"
import forgotPassReducer from "../features/forgotpassword/forgotPassword"
import plusButtonReducer from "../features/plusButton/plusButton"
import userDataReducer from "../features/userData/userDataSlice"
export const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        search: searchReducer,
        sidebar:sidebarReducer,
        signup:signupReducer,
        login:loginReducer,
        responseStatus:responseStatusReducer,
        forgotPass:forgotPassReducer,
        userData:userDataReducer,
        verifyCode:verifyCodeReducer,
        plusButton:plusButtonReducer,



    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
});