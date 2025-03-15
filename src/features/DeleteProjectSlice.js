import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteProjectAPI = createAsyncThunk('/delete/project',async(id)=>{
    try {
        const url ='http://localhost:5500/project/delete';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating Project: ',error)
    }
})

const deleteProjectSlice = createSlice({
    name:'deleteProject',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(deleteProjectAPI.fulfilled,(state,action)=>{
            console.log('DELETE action: ',action);
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteProjectAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(deleteProjectAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default deleteProjectSlice