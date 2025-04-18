
import { createSlice } from "@reduxjs/toolkit";

export const AppSlice = createSlice({
    name:"UserLoginCredDetails",
    initialState:{
        userID:"",
        authCode:"",
        loginStatus:false,
    },
    reducers:{
        setUserID:(state,action)=>{
            state.userID=action.payload;
        },
        setAuthCode : (state,action)=>{
            state.authCode=action.payload;
        },
        setLoginStatus : (state,action)=>{
            state.loginStatus=action.payload;
        },
       
    }
})
export const {setAuthCode,setLoginStatus,setUserID} = AppSlice.actions;

export default AppSlice.reducer;
