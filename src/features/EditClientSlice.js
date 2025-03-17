import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editClientAPI = createAsyncThunk('/client',async(value)=>{
    try {
        const url ='https://backend-l1zu.onrender.com/client/update';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            clientName:value.clientName,
            clientEmail:value.clientEmail,
            phone:value.phone,
            address:value.address,
            status:value.status,
            date:value.date,
            description:value.description,
            company:value.company,
            id:value.id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating Client: ',error)
    }
})

const editClientSlice = createSlice({
    name:'editClient',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(editClientAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(editClientAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editClientAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default editClientSlice