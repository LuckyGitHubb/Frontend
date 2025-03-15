import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editSaleAPI = createAsyncThunk('/edit/Sale',async(value)=>{
    try {
        const url ='http://localhost:5500/sale/update';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            productName: value.productName,
            clientName: value.clientName,
            price: value.price,
            quantity: value.quantity,
            totalAmount: value.totalAmount,
            tax: value.tax,
            grandTotal: value.grandTotal,
            id:value.id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating Sale: ',error)
    }
})

const editSaleSlice = createSlice({
    name:'editSale',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(editSaleAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(editSaleAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editSaleAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default editSaleSlice