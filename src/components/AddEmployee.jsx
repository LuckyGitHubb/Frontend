import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmployeeAPI } from '../features/AddEmployeeSlice'
import { allEmployeeAPI } from '../features/allEmployeeSlice';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, MenuItem, Button, Grid, Typography } from "@mui/material";

function AddEmployee(props) {
  const navigate = useNavigate()
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [city,setCity] = useState('');
    const [experience,setExperience] = useState('');
    const [age,setAge] = useState('');
    const [department,setDepartment] = useState('');
    const [gender,setGender] = useState('');
    const dispatch = useDispatch();

    function click_ToAddEmployee(e){
        e.preventDefault();
        dispatch(addEmployeeAPI({name,email,mobile,city,experience,age,department,gender}))
        dispatch(allEmployeeAPI());
        navigate('/employee')
    }
  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Employee
      </Typography>

      <form onSubmit={click_ToAddEmployee}>
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Grid>

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
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>
          </Grid>

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

export default AddEmployee