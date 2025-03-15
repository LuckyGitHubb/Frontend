import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip, IconButton, Box, Button, TextField, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { allClientAPI } from '../features/AllClientSlice';
import { searchClientAPI } from '../features/SearchClientSlice';
import { deleteClientAPI } from '../features/DeleteClientSlice';

function AllClient() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [clientName,setClientName] = useState("")
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    //storing the client and the searched client -----------------------
    let client = useSelector((state)=>state.allClient.allClientData); 
    let searchProject = useSelector((state)=>state.searchClient.arr)
    console.log(searchProject)
    //----------------------------------------------------------------------

    //Showing client on the basis of the condition 
    //if user search then display the searched client
    //other wise display the all client -------------------------------------
    const showClient = useMemo(() => {
        if (searchProject.clientData && searchProject?.clientData?.length > 0) {
          return searchProject.clientData;
        }
        return client?.clientData || [];
      }, [client, searchProject]);
    //------------------------------------------------------------------------
    console.log('this is my client data: ',client);
    //Dispatch the APIs 
    //Show All Project API---------------------------------------------------
    useEffect(()=>{
        dispatch(allClientAPI({currentPage}))
    },[dispatch,currentPage])

    //Delete a Project API----------------------------------------------------
    function click_ToDeleteClient(id){
        dispatch(deleteClientAPI(id))
        dispatch(allClientAPI({currentPage}));
    }
    //Search a Project API -----------------------------------------------------
    function click_ToSearchClient(){
        dispatch(searchClientAPI(clientName));
    }
    //Pagination Functions ---------------------------------------------------
    useEffect(()=>{
        if(client){
        setTotalPage(client.totalPage)
        }
    },[client])
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
        <Box sx={{ padding: 2 }}>
            {/* Search & Add Client Section */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                    <label>Client Name: </label>
                    <TextField
                        onChange={(e) => setClientName(e.target.value)}
                        sx={{ marginLeft: 2 }}
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <Button onClick={click_ToSearchClient}
                        sx={{ marginLeft: 2 }}
                        variant="contained"
                        size="small">
                        Search
                    </Button>
                </Box>

                <Button onClick={() => navigate('/add/client')}
                    variant="contained"
                    size="small">
                    Add Client
                </Button>
            </Box>

            {/* Client Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#6200ea' }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.no</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client Email</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Phone</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Company</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showClient.length > 0 ? (
                            showClient.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{e.clientName}</TableCell>
                                    <TableCell>{e.clientEmail}</TableCell>
                                    <TableCell>{e.phone}</TableCell>
                                    <TableCell>{e.status}</TableCell>
                                    <TableCell>{e.company}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => navigate(`/edit/client/${e._id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => click_ToDeleteClient(e._id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>
                                    <Box sx={{ width: 1, textAlign: 'center' }}>No Data Found</Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={2}>
                <Button onClick={getPrevPageNumber} disabled={currentPage === 1} sx={{ marginRight: 2 }} variant="outlined">
                    Prev
                </Button>
                <Box sx={{ padding: '8px 16px', fontWeight: 'bold' }}>{currentPage} of {totalPage}</Box>
                <Button onClick={getNextPageNumber} disabled={currentPage >= totalPage} sx={{ marginLeft: 2 }} variant="outlined">
                    Next
                </Button>
            </Box>
        </Box>
    )
}

export default AllClient
