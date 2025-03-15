import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginAPI } from '../features/LoginSlice';
import { useNavigate, Link } from 'react-router-dom'
import { TextField, Button, Card, CardContent, Typography, Box, Grid, MenuItem } from "@mui/material";

function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("");
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function click_ToSubmitLoginData(e){
        e.preventDefault();
        try {
          let result = await dispatch(loginAPI({email,password,role}));
          if (loginAPI.fulfilled.match(result) && result.payload?.token) {
            navigate('/dashboard'); 
        } else {
            setMessage(result.payload?.message || "Invalid credentials");
            navigate('/'); 
        }
        } catch (error) {
          console.log('Error is ',error);
        }
    }
  return (
    <div>
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={10} sm={8} md={4}>
        <Card sx={{ padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={click_ToSubmitLoginData}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Box mt={2}>
                            <TextField select fullWidth label="Status" value={role} onChange={(e) => setRole(e.target.value)} required>
                              <MenuItem value="">Select Role</MenuItem>
                              <MenuItem value="Admin">Admin</MenuItem>
                              <MenuItem value="Employee">Employee</MenuItem>
                            </TextField>
                          </Box>
              </Box>
              <span style={{ color: "red", fontSize: "1.3rem", borderRadius: "5px" }}>
  {message}
</span>

              <Button fullWidth variant="contained" color="primary" type="submit">
                Submit
              </Button>

              <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Don't have an account? {" "}
                <Link to="/register" style={{ color: "#1976d2", textDecoration: "none" }}>
                  Register here
                </Link>
              </Typography>
            </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </div>
  )
}

export default Login;