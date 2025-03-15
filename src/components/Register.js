import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerAPI } from '../features/RegisterSlice';
import { TextField, Button, Container, Typography, Box, MenuItem } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate()
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [mobile,setMobile] = useState('');
  const [role,setRole] = useState('');
  const dispatch = useDispatch('')
  async function click_ToSubmitRegisterData(e){
    e.preventDefault();
    const response = await dispatch(registerAPI({name,email,password,mobile,role}));
    if (registerAPI.fulfilled.match(response)) {
      navigate('/login');
  } else {
      alert(response.payload?.message || "Registration failed. Please try again.");
  }
  }
  return (
    <div>
        <Container maxWidth="sm">
            <Box sx={{ 
                mt: 4, 
                p: 3, 
                boxShadow: 3, 
                borderRadius: 2, 
                bgcolor: "background.paper" 
            }}>
                <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
                    Register
                </Typography>

                <form onSubmit={click_ToSubmitRegisterData}>
                    <TextField 
                        fullWidth 
                        label="Name" 
                        variant="outlined" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth 
                        label="Email" 
                        variant="outlined" 
                        type="email"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                    />

                    <TextField 
                        fullWidth 
                        label="Mobile" 
                        variant="outlined" 
                        value={mobile} 
                        onChange={(e) => setMobile(e.target.value)}
                        margin="normal"
                    />
                    <Box mt={2}>
                      <TextField select fullWidth label="Status" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <MenuItem value="">Select Role</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Employee">Employee</MenuItem>
                      </TextField>
                    </Box>
                                  

                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                                  <Box mt={2} textAlign="center">
                                  <Typography variant="body2">
                                    Already have an account? {" "}
                                    <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
                                      Login here
                                    </Link>
                                  </Typography>
                                </Box>
                </form>
            </Box>
        </Container>
    </div>
  )
}

export default Register;