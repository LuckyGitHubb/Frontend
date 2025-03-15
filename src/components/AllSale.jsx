import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip, IconButton, Box, Button, TextField, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material'
import { AllProjectAPI } from '../features/AllPojectSlice';
import { useNavigate } from 'react-router-dom'
import { deleteProjectAPI } from '../features/DeleteProjectSlice';
import { searchProjectAPI } from '../features/SearchProjectSlice';
import { AllSaleAPI } from '../features/AllSaleSlice';
import { searchSaleAPI } from '../features/SearchSaleSlice';
import { deleteSaleAPI } from '../features/DeleteSaleSlice';

function AllSale() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [price,setprice] = useState("")
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    let sale = useSelector((state)=>state.allSale.arr);
    let searchSale = useSelector((state)=>state.searchSale.arr)
    console.log('this is my search state: ',searchSale);
    const showSaleData = useMemo(() => {
        if (searchSale && searchSale.searchedProject?.length > 0) {
          return searchSale.searchedProject;
        }
        return sale?.saleData || [];
      }, [sale, searchSale]);
    //------------------------------------------------------------------------
    useEffect(()=>{
        dispatch(AllSaleAPI({currentPage}))
    },[dispatch,currentPage])

    // ----------------------------------------------------
    function click_ToDeleteSale(id){
        dispatch(deleteSaleAPI(id))
        dispatch(AllSaleAPI({currentPage}));
    }
    //-----------------------------------------------------
    function click_ToSearchSale(){
        dispatch(searchSaleAPI(price));
    }
    //---------------------------------------------------
    useEffect(()=>{
        if(sale){
        setTotalPage(sale.totalPage)
        }
    },[sale])
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
    return (
        <Box sx={{ padding: 2 }}>
            {/* Search & Add Sale Section */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center">
                    <label>Price: </label>
                    <TextField
                        onChange={(e) => setprice(e.target.value)}
                        sx={{ marginLeft: 2 }}
                        type="text"
                        variant="outlined"
                        size="small"
                    />
                    <Button onClick={click_ToSearchSale} 
                        sx={{ marginLeft: 2 }}
                        variant="contained"
                        size="small">
                        Search
                    </Button>
                </Box>

                <Button onClick={() => navigate('/add/sale')}
                    variant="contained"
                    size="small">
                    Add Sale
                </Button>
            </Box>

            {/* Sale Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#6200ea" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>S.no</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Client Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product Name</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Tax</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Amount</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showSaleData.length > 0 ? (
                            showSaleData.map((e, i) => (
                                <TableRow key={i}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{e.clientName.clientName}</TableCell>
                                    <TableCell>{e.productName.productName}</TableCell>
                                    <TableCell>{e.price}</TableCell>
                                    <TableCell>{e.tax}</TableCell>
                                    <TableCell>{e.grandTotal}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => navigate(`/edit/sale/${e._id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" onClick={() => click_ToDeleteSale(e._id)}>
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

export default AllSale
