import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AuthStaus : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) => {
            state.AuthStaus = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.AuthStaus = false;
            state.userData = null;
        }
    }
})

export const {login,logout
} = authSlice.actions;

export default authSlice.reducer;