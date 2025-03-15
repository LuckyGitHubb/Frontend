
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleClientAPI = createAsyncThunk('',async(value)=>{
    const token = localStorage.getItem('token');
    const id = value.id
    // console.log('THIS IS MUY ID SO PLEASE DONT TOUCH IT ',id)
    const url = `http://localhost:5500/client/get?id=${id}`;
    const response = await fetch(url,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    const res = await response.json();
    return res;
})

const getSingleClientSlice = createSlice({
    name:'singleClient',
    initialState:{
        getSingleClient:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getSingleClientAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getSingleClientAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.getSingleClient=action.payload
        })
        builder.addCase(getSingleClientAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default getSingleClientSlice;