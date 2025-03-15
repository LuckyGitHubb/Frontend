import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addClientAPI } from '../features/AddClientSlice';
import { useNavigate } from 'react-router-dom'
import { Container, TextField, MenuItem, Button, Grid, Typography } from "@mui/material";

function AddClient() {
    const [clientName,setClientName] = useState('');
    const [clientEmail,setClientEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [status,setStatus] = useState('');
    const [date,setDate] = useState('');
    const [description,setDescription] = useState('');
    const [company,setCompany] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()

    function click_ToAddClient(e){
        e.preventDefault();
        dispatch(addClientAPI({clientName,clientEmail,phone,address,status,date,description,company}))
        navigate('/client')
        // dispatch(allClientAPI());
    }
  return (
    <div>
        <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Client
      </Typography>

      <form onSubmit={click_ToAddClient}>
        <Grid container spacing={2}>
          
          <Grid item xs={6}>
            <TextField fullWidth label="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Client Email" type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Mobile" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="City" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth type="date" label="Date" InputLabelProps={{ shrink: true }} value={date} onChange={(e) => setDate(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter details here" required />
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

export default AddClient