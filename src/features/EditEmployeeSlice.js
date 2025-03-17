import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const editEmployeeAPI = createAsyncThunk('',async(value)=>{
    try {
        const url ='https://backend-l1zu.onrender.com/employee/update';
    const token = localStorage.getItem('token');
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        },
        body:JSON.stringify({
            name:value.name,
            email:value.email,
            mobile:value.mobile,
            city:value.city,
            experience:value.experience,
            age:value.age,
            department:value.department,
            gender:value.gender,
            id:value.id
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        console.log('Error while updating employee: ',error)
    }
})

const editEmployeeSlice = createSlice({
    name:'editEmployee',
    initialState:{
        arr:[],
        loading:false,
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(editEmployeeAPI.fulfilled,(state,action)=>{
            state.arr = action.payload;
            state.loading = false;
        })
        builder.addCase(editEmployeeAPI.rejected,(state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })
        builder.addCase(editEmployeeAPI.pending,(state,action)=>{
            state.loading = true;
        })
    }
})

export default editEmployeeSlice