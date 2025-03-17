import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editProductAPI = createAsyncThunk('/edit/product',async(value)=>{
    try {
        const url ='https://backend-l1zu.onrender.com/product/update';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            productName: value.productName,
            pricePerUnit: value.pricePerUnit,
            totalPrice: value.totalPrice,
            stockQuantity: value.stockQuantity,
            units: value.units,
            status: value.status,
            purchaseDate: value.purchaseDate,
            description: value.description,
            id:value.id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating Project: ',error)
    }
})

const editProductSlice = createSlice({
    name:'editProduct',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(editProductAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(editProductAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editProductAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default editProductSlice