import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addEmployeeAPI = createAsyncThunk('/employee',async(value)=>{
    try {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:5500/employee';
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
            gender:value.gender
        })
    })
    const res = await response.json();
    return res;
    } catch (error) {
        alert(error);
        console.log('The Error is ',error);
    }
}); 

const addEmployeeSlice = createSlice({
    name:'addEmployee',
    initialState:{
        loading:false,
        addEmployee:[],
        error:''
    },
    extraReducers:(builder)=>{
        builder.addCase(addEmployeeAPI.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(addEmployeeAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.addEmployee=action.payload;
        })
        builder.addCase(addEmployeeAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})
export default addEmployeeSlice;