import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteClientAPI = createAsyncThunk('/client',async(id)=>{
    try {
        debugger;
        console.log('the id is: ',id);
        const token = localStorage.getItem('token');
        let url = 'https://backend-l1zu.onrender.com/client/delete';
        let response = await fetch(url,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({id})
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('Error occur: ',error);
    }
}) 

const deleteClientSlice = createSlice({
    name:'deleteClient',
    initialState:{
        loading:false,
        deleteClientData:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(deleteClientAPI.pending,(state,action)=>{
            state.loading = true;
        })
        builder.addCase(deleteClientAPI.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
        builder.addCase(deleteClientAPI.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteClientData = action.payload;
        })
    }
}) 
export default deleteClientSlice;