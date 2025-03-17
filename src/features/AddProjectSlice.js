import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addPojectAPI = createAsyncThunk('/addproject',async(value)=>{
    try {
        
        const token = localStorage.getItem('token');
        const url = 'https://backend-l1zu.onrender.com/project/post';
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
                description: value.description
            })
        })
        const res = await response.json();
        return res;
    } catch (error) {
        console.log('this is my Error: ',error)
    }
})

const addProjectSlice = createSlice({
    name:'addProject',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addPojectAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(addPojectAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(addPojectAPI.pending,(state,action)=>{  
            state.loading = true
        })
    }
})
export default addProjectSlice