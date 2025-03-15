import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAPI = createAsyncThunk('/login',async(value)=>{
    try {
        const url = 'http://localhost:5500/login';
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:value.email,
            password:value.password,
            role:value.role
        })
    })
    const res = await response.json();
    localStorage.setItem('token',res.token)
    return res
    } catch (error) {
        console.log(error);
    }
})

const loginSlice = createSlice({
    name:'login',
    initialState:{
        loading:true,
        login:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(loginAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(loginAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.login=action.payload;
        })
        builder.addCase(loginAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default loginSlice;