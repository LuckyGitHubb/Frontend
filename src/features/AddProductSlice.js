import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProductAPI = createAsyncThunk('/addproduct',async(value)=>{
    try {
        
        const token = localStorage.getItem('token');
        const url = 'https://backend-l1zu.onrender.com/product/post';
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
                description: value.description
            })
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('this is my Error: ',error)
    }
})

const addProductSlice = createSlice({
    name:'addProject',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addProductAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(addProductAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(addProductAPI.pending,(state,action)=>{  
            state.loading = true
        })
    }
})
export default addProductSlice