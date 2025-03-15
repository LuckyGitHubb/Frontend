
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSingleEmployeeAPI = createAsyncThunk('',async(value)=>{
    const token = localStorage.getItem('token');
    const id = value.id
    // console.log('THIS IS MUY ID SO PLEASE DONT TOUCH IT ',id)
    const url = `http://localhost:5500/employee/get?id=${id}`;
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

const getSingleEmployeeSlice = createSlice({
    name:'singleEmployee',
    initialState:{
        getSingleEmployee:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(getSingleEmployeeAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getSingleEmployeeAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.getSingleEmployee=action.payload
        })
        builder.addCase(getSingleEmployeeAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message
        })
    }
})
export default getSingleEmployeeSlice;