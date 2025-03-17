import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchProductAPI = createAsyncThunk('',async(value)=>{
    try {
        const url = `https://backend-l1zu.onrender.com/product/search?search=${value}`;
        console.log('my value ',value,' or My value length is ',value.length);
        const token = localStorage.getItem('token');
        const response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
    }
})

const searchProductSlice = createSlice({
    name:'search',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(searchProductAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.arr=action.payload
        })
        builder.addCase(searchProductAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(searchProductAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default searchProductSlice;