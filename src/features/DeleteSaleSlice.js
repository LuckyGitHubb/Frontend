import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteSaleAPI = createAsyncThunk('/delete/Sale',async(id)=>{
    try {
        const url ='http://localhost:5500/sale/delete';
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
        console.log('Error while updating Sale: ',error)
    }
})

const deleteSaleSlice = createSlice({
    name:'deleteSale',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(deleteSaleAPI.fulfilled,(state,action)=>{
            console.log('DELETE action: ',action);
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(deleteSaleAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(deleteSaleAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default deleteSaleSlice;