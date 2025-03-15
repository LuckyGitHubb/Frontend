import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchProjectAPI = createAsyncThunk('',async(value)=>{
    try {
        const url = `http://localhost:5500/project/search?search=${value}`;
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

const searchProjectSlice = createSlice({
    name:'search',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(searchProjectAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.arr=action.payload
        })
        builder.addCase(searchProjectAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(searchProjectAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default searchProjectSlice;