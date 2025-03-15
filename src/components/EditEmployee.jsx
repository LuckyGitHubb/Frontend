import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleEmployeeAPI } from '../features/GetSingleEmployee';
import { editEmployeeAPI } from '../features/EditEmployeeSlice';
import { allEmployeeAPI } from '../features/allEmployeeSlice';
import { useNavigate, useParams } from 'react-router-dom'
import { Container, TextField, Button, MenuItem, Typography, CircularProgress, Alert, Grid } from '@mui/material';

function EditEmployee(props) {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [city,setCity] = useState('');
    const [experience,setExperience] = useState('');
    const [age,setAge] = useState('');
    const [department,setDepartment] = useState('');
    const [gender,setGender] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate()
    
    const {loading , getSingleEmployee , error} = useSelector(state=>state.getSingleEmployee)
    // console.log('This is my state Data: ',stateData)
    
    useEffect(()=>{
        dispatch(getSingleEmployeeAPI({id})) 
    },[props.employeeId,dispatch])

    
    useEffect(()=>{
        if(getSingleEmployee.length != 0 && getSingleEmployee.Employee){
            console.log('This is my dsabncjasnclkadsncaldc caskdbncwdkjncnknnbxck',getSingleEmployee)
            setName(getSingleEmployee.Employee.name)
            setEmail(getSingleEmployee.Employee.email || '-')
            setMobile(getSingleEmployee.Employee.mobile || '-')
            setCity(getSingleEmployee.Employee.city || '-')
            setExperience(getSingleEmployee.Employee.experience || '-')
            setAge(getSingleEmployee.Employee.age || '-')
            setDepartment(getSingleEmployee.Employee.department || '-')
            setGender(getSingleEmployee.Employee.gender || '-')
        }
    },[getSingleEmployee])
  

    function click_ToEditEmployee(e){
      e.preventDefault();
      dispatch(editEmployeeAPI({name, email, mobile, city, experience, age, department, gender, id}));
      navigate('/employee');
    }



    // useEffect

  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Employee
      </Typography>

      {loading && <CircularProgress style={{ display: "block", margin: "auto" }} />}
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={click_ToEditEmployee}>
        <Grid container spacing={2}>
          {/* Row 1 */}
          <Grid item xs={6}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Grid>

          {/* Row 2 */}
          <Grid item xs={6}>
            <TextField fullWidth label="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
          </Grid>

          {/* Row 3 */}
          <Grid item xs={6}>
            <TextField fullWidth label="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </Grid>

          {/* Row 4 */}
          <Grid item xs={6}>
            <TextField select fullWidth label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField select fullWidth label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
    </div>
  )
}

export default EditEmployee