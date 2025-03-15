import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip, IconButton, Box, Button, TextField, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material'
import { AllProjectAPI } from '../features/AllPojectSlice';
import { useNavigate } from 'react-router-dom'
import { deleteProjectAPI } from '../features/DeleteProjectSlice';
import { searchProjectAPI } from '../features/SearchProjectSlice';

function AllProject() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [projectName,setProjectName] = useState("")
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    //storing the project and the searched project -----------------------
    let project = useSelector((state)=>state.allProject.arr);
    let searchProject = useSelector((state)=>state.searchProject.arr)
    //----------------------------------------------------------------------

    //Showing project on the basis of the condition 
    //if user search then display the searched project
    //other wise display the all project -------------------------------------
    const showProject = useMemo(() => {
        if (searchProject && searchProject.searchedProject?.length > 0) {
          return searchProject.searchedProject;
        }
        return project?.getAllProject || [];
      }, [project, searchProject]);
    //------------------------------------------------------------------------
    console.log('this is my project data: ',project);
    //Dispatch the APIs 
    //Show All Project API---------------------------------------------------
    useEffect(()=>{
        dispatch(AllProjectAPI({currentPage}))
    },[dispatch,currentPage])

    //Delete a Project API----------------------------------------------------
    function click_ToDeleteProject(id){
        dispatch(deleteProjectAPI(id))
        dispatch(AllProjectAPI());
    }
    //Search a Project API -----------------------------------------------------
    function click_ToSearchProject(){
        dispatch(searchProjectAPI(projectName));
    }
    //Pagination Functions ---------------------------------------------------
    useEffect(()=>{
        if(project){
        setTotalPage(project.totalPage)
        }
    },[project])
    function getPrevPageNumber(){
        if(currentPage > 1){
        setCurrentPage(currentPage-1);
        }
    }
    function getNextPageNumber(){
        if(totalPage > currentPage){
        setCurrentPage(currentPage+1)
        }
    }
    //------------------------------------------------------------------------
    return (
        <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        All Projects
      </Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <TextField
            label="Search Project"
            variant="outlined"
            size="small"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            sx={{ mr: 2 }}
          />
          <Button onClick={click_ToSearchProject} variant="contained">
            Search
          </Button>
        </Box>
        <Button onClick={() => navigate("/add/project")} variant="contained" color="secondary">
          Add Project
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {["S.no", "Project Name", "Client Name", "Employee", "Cost", "Status", "Action"].map(
                (head) => (
                  <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {showProject.length > 0 ? (
              showProject.map((e, i) => (
                <TableRow key={e._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{e?.projectName || '-'}</TableCell>
                  <TableCell>{e?.clientName?.clientName || '-'}</TableCell>
                  <TableCell>{e?.employee?.name || '-'}</TableCell>
                  <TableCell>{e?.cost || '-'}</TableCell>
                  <TableCell>{e?.status || '-'}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => navigate(`/edit/project/${e._id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => click_ToDeleteProject(e._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Button onClick={getPrevPageNumber} disabled={currentPage === 1} variant="contained" sx={{ mr: 2 }}>
          Prev
        </Button>
        <Typography>
          Page {currentPage} of {totalPage}
        </Typography>
        <Button onClick={getNextPageNumber} disabled={currentPage === totalPage} variant="contained" sx={{ ml: 2 }}>
          Next
        </Button>
      </Box>
    </Box>
    )
}

export default AllProject
