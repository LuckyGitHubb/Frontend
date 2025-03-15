
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleSaleAPI = createAsyncThunk('',async(id)=>{
    const token = localStorage.getItem('token');
    console.log('this is my id ',id);
    const url = `http://localhost:5500/sale/get?id=${id}`;
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

const getSingleSaleSlice = createSlice({
    name:'singleSale',
    initialState:{
        getSingleSale:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getSingleSaleAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getSingleSaleAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.getSingleSale=action.payload
        })
        builder.addCase(getSingleSaleAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default getSingleSaleSlice;