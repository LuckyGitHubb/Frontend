    
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleProductAPI = createAsyncThunk('',async(value)=>{
    const token = localStorage.getItem('token');
    const id = value
    // console.log('THIS IS MUY ID SO PLEASE DONT TOUCH IT ',id)
    const url = `http://localhost:5500/product/get?id=${id}`;
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

const getSingleProductSlice = createSlice({
    name:'singleProduct',
    initialState:{
        getSingleProduct:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getSingleProductAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getSingleProductAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.getSingleProduct=action.payload
        })
        builder.addCase(getSingleProductAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default getSingleProductSlice;