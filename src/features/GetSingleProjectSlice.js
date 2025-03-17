
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleProjectAPI = createAsyncThunk('',async(id)=>{
    const token = localStorage.getItem('token');
    console.log('this is my id ',id);
    // const id = value.id
    // console.log('THIS IS MUY ID SO PLEASE DONT TOUCH IT ',id)
    const url = `https://backend-l1zu.onrender.com/project/get?id=${id}`;
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

const getSingleProjectSlice = createSlice({
    name:'singleProject',
    initialState:{
        getSingleProject:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getSingleProjectAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getSingleProjectAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.getSingleProject=action.payload
        })
        builder.addCase(getSingleProjectAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default getSingleProjectSlice;