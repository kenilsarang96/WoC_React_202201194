import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice"
import fileSlice from "./fileSlice"
import themeSlice from "./themeSlice"

const store = configureStore({
    reducer :{
       auth : authSlice,
       file : fileSlice,
       theme : themeSlice
    }
})

export default store;   