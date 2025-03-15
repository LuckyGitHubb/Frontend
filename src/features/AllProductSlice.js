import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AllProductAPI = createAsyncThunk('/allProduct',async(page)=>{
    const currPage = page?.currentPage
    let url;
    currPage? url= `http://localhost:5500/product/getAll?page=${currPage}&limit=${3}` 
    : url = `http://localhost:5500/product/getAll`
    try {
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

const allProductSlice = createSlice({
    name:'allProduct',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(AllProductAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(AllProductAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(AllProductAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
    }
})

export default allProductSlice;