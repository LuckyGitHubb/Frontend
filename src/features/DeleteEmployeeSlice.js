import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteEmployeeAPI = createAsyncThunk('/employee',async(value)=>{
    try {
        console.log('the id is: ',value.id);
        const token = localStorage.getItem('token');
        let url = 'http://localhost:5500/employee/delete';
        let response = await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id:value.id})
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('Error occur: ',error);
    }
}) 

const deleteEmployeeSlice = createSlice({
    name:'deleteEmployee',
    initialState:{
        loading:false,
        deleteEmployeeData:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(deleteEmployeeAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(deleteEmployeeAPI.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteEmployeeAPI.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteEmployeeData = action.payload;
        })
    }
}) 
export default deleteEmployeeSlice;