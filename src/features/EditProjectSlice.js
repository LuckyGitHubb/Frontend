import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editProjectAPI = createAsyncThunk('/edit/project',async(value)=>{
    try {
        const url ='http://localhost:5500/project/update';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            projectName: value.projectName,
            clientName: value.clientName,
            employee: value.employee,
            startDate: value.startDate,
            endDate: value.endDate,
            cost: value.cost,
            status: value.status,
            description: value.description,
            id:value.id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating Project: ',error)
    }
})

const editProjectSlice = createSlice({
    name:'editProject',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(editProjectAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(editProjectAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editProjectAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default editProjectSlice