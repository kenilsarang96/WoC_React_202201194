import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AuthStatus : false,
    userId : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) => {
            state.AuthStatus = true;
            state.userId = action.payload;
        },
        logout: (state) => {
            state.AuthStatus = false;
            state.userId = null;
        }
    }
})

export const {login,logout
} = authSlice.actions;

export default authSlice.reducer;