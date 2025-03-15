import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editProjectAPI } from '../features/EditProjectSlice'
import { getSingleProjectAPI } from '../features/GetSingleProjectSlice'
import { Container, TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import { allClientAPI } from '../features/AllClientSlice';
import { allEmployeeAPI } from '../features/allEmployeeSlice';

function EditProject(props) {
    const [projectName,setProjectName] = useState("")
     const [clientName,setClientName] = useState("")
     const [employee,setEmployee] = useState("")
     const [startDate,setStartDate] = useState("")
     const [endDate,setEndDate] = useState("")
     const [cost,setCost] = useState("")
     const [status,setStatus] = useState("")
     const [description,setDescription] = useState("")
     const dispatch = useDispatch()
     const navigate = useNavigate()
     console.log('this is my props: ',props);
     const { id } = useParams(); 
     const Employee = useSelector((state)=>state?.allEmployee?.allEmployeeData?.getAllEmployee || []);
             const client = useSelector((state)=>state?.allClient?.allClientData?.clientData || []);
             useEffect(()=>{
              dispatch(allEmployeeAPI());
              dispatch(allClientAPI());
          },[dispatch])
     
     let { loading ,getSingleProject ,error} = useSelector((state) => state.getSingleProject);
     console.log(id);
     useEffect(()=>{
      dispatch(getSingleProjectAPI(id)) 
     },[id])
      useEffect(() => {
       console.log('This is my single project: ', getSingleProject);
       if(getSingleProject.getSingleProject){
         let project = getSingleProject.getSingleProject
         setProjectName(project.projectName);
         setClientName(project.clientName._id);
         setCost(project.cost);
         setEmployee(project.employee._id);
         setStartDate(project.startDate);
         setEndDate(project.endDate);
         setStatus(project.status);
         setDescription(project.description);
       }
   }, [getSingleProject]);
   if(loading){
      return <div>Loading...</div>
   } 

     function click_ToEditProject(){
        dispatch(editProjectAPI({projectName,clientName,employee,startDate,endDate,cost,status,description,id}))
        navigate('/project');
     }
            
  return ( 
    <div>
       <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Edit Project
      </Typography>

      <form onSubmit={click_ToEditProject}>
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField fullWidth label="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
                       <TextField select fullWidth label="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} required>
                        <MenuItem value="" disabled>Select Client</MenuItem>
                        {client?.map((e, index) => (
                          <MenuItem key={index} value={e._id}>
                            {e.clientName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
          
                    <Grid item xs={6}>
                    <TextField select fullWidth label="Employee" value={employee} onChange={(e) => setEmployee(e.target.value)} required>
                        <MenuItem value="" disabled>Select Employee</MenuItem>
                        {Employee?.map((e, index) => (
                          <MenuItem key={index} value={e._id}>
                            {e.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="date" label="Start Date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth type="date" label="End Date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} required />
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter project details here" required />
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

export default EditProject
