import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addClientAPI = createAsyncThunk('client',async(value)=>{
    try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5500/client/post';
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
            company:value.company
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        alert(error);
        console.log('The Error is ',error);
    }
}); 

const addClientSlice = createSlice({
    name:'addClient',
    initialState:{
        loading:false,
        addClient:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addClientAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(addClientAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.addClient=action.payload;
        })
        builder.addCase(addClientAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default addClientSlice;