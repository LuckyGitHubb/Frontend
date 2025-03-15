import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const registerAPI = createAsyncThunk('/register',async(value)=>{
    try {
        const url = 'http://localhost:5500/register';
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:value.name,
            email:value.email,
            password:value.password,
            mobile:value.mobile,
            role:value.role
        })
    });
    const res = await response.json();
    return res;
    } catch (error) {
        console.log(error)
    }
});
const registerSlice  = createSlice({
    name:'register',
    initialState:{
        register:[],
        loading:true,
        error:''
    },
    extrareducers:(builder)=>{
        builder.addCase(registerAPI.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
        builder.addCase(registerAPI.fulfilled,(state,action)=>{
            state.loading=false;
            state.register=action.payload;
        })
        builder.addCase(registerAPI.pending,(state,action)=>{
            state.loading=true;
        })
    }
})
export default registerSlice;