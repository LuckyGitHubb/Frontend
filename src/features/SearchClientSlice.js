import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchClientAPI = createAsyncThunk('',async(value)=>{
    try {
        const url = `https://backend-l1zu.onrender.com/client/search?search=${value}`;
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

const searchClientSlice = createSlice({
    name:'search',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(searchClientAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.arr=action.payload
        })
        builder.addCase(searchClientAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(searchClientAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default searchClientSlice;