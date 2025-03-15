import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const allEmployeeAPI = createAsyncThunk('/employee',async(value)=>{
    let url = value?.currentPage? `http://localhost:5500/employee/getAll?page=${value.currentPage}&limit=${3}` :
     `http://localhost:5500/employee/getAll`
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

const allEmployeeSlice = createSlice({
    name:'allEmployee',
    initialState:{
        loading:false,
        allEmployeeData:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(allEmployeeAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(allEmployeeAPI.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(allEmployeeAPI.fulfilled,(state,action)=>{
            state.loading = false;
            state.allEmployeeData = action.payload;
        })
    }
}) 
export default allEmployeeSlice;