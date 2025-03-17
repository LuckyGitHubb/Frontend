import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AllSaleAPI = createAsyncThunk('/allSale',async(value)=>{
    const currPage = value?.currentPage
    try {
        let url= `https://backend-l1zu.onrender.com/sale/getAll?page=${currPage}&limit=${3}`
        const token = localStorage.getItem('token');
        let response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        let res = await response.json();
        return res;
    } catch (error) {
        console.log(error)
    }
})

const allSaleSlice = createSlice({
    name:'allSale',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(AllSaleAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(AllSaleAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(AllSaleAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
    }
})

export default allSaleSlice;