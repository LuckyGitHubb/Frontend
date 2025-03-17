import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addSaleAPI = createAsyncThunk('/addSale',async(value)=>{
    try {
        
        const token = localStorage.getItem('token');
        const url = 'https://backend-l1zu.onrender.com/sale/post';
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
                grandTotal: value.grandTotal
            })
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('this is my Error: ',error)
    }
})

const addSaleSlice = createSlice({
    name:'addSale',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addSaleAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(addSaleAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(addSaleAPI.pending,(state,action)=>{  
            state.loading = true
        })
    }
})
export default addSaleSlice