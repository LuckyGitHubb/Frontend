import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteProductAPI = createAsyncThunk('/delete/product',async(id)=>{
    try {
        const url ='http://localhost:5500/product/delete';
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
        console.log('Error while deleting Product: ',error)
    }
})

const deleteProductSlice = createSlice({
    name:'deleteProduct',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(deleteProductAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteProductAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(deleteProductAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default deleteProductSlice