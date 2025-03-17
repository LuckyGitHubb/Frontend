import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AllProjectAPI = createAsyncThunk('/allProject',async(page)=>{
    let url = page?.currentPage? `https://backend-l1zu.onrender.com/project/getAll?page=${page.currentPage}&limit=${3}` :
                `https://backend-l1zu.onrender.com/project/getAll`
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

const allProjectSlice = createSlice({
    name:'allProject',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(AllProjectAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(AllProjectAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(AllProjectAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
    }
})

export default allProjectSlice;