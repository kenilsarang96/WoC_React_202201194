import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import fileSlice from "./fileSlice"

const store = configureStore({
    reducer :{
       auth : authSlice,
       file : fileSlice
    }
})

export default store;   