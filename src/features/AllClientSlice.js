import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allClientAPI = createAsyncThunk('/client',async(value)=>{
    let currPage = value?.currentPage
    let url;
    currPage? url= `https://backend-l1zu.onrender.com/client/getAll?page=${currPage}&limit=${3}` 
    : url = `https://backend-l1zu.onrender.com/client/getAll`
    try {
        const token = localStorage.getItem('token');
        let response = await fetch(url,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`); 
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('Error occur: ',error);
    }
}) 

const allClientSlice = createSlice({
    name:'allClient',
    initialState:{
        loading:false,
        allClientData:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(allClientAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(allClientAPI.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(allClientAPI.fulfilled,(state,action)=>{
            state.loading = false;
            state.allClientData = action.payload;
        })
    }
}) 
export default allClientSlice;