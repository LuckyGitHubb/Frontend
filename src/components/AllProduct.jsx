import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Tooltip, IconButton, Box, Button, TextField, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { AllProductAPI } from '../features/AllProductSlice';
import { searchProductAPI } from '../features/SearchProductSlice';
import { deleteProductAPI } from '../features/DeleteProductSlice';

function AllProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [productName,setProductName] = useState("")
     const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(1);
    // //storing the client and the searched client -----------------------
     let product = useSelector((state)=>state.allProduct.arr); 
     let searchProduct = useSelector((state)=>state.searchProduct.arr)
     console.log(searchProduct)
    // //----------------------------------------------------------------------

    // //Showing client on the basis of the condition 
    // //if user search then display the searched client
    // //other wise display the all client -------------------------------------
    const showProduct = useMemo(() => {
        if (searchProduct.searchedProduct && searchProduct?.searchedProduct?.length > 0) {
          return searchProduct.searchedProduct;
        }
        return product?.Product || [];
      }, [product, searchProduct]);
    // //------------------------------------------------------------------------
    // console.log('this is my client data: ',client);
    // //Dispatch the APIs 
    // //Show All Project API---------------------------------------------------
    useEffect(()=>{
        dispatch(AllProductAPI({currentPage}))
    },[dispatch,currentPage])

    // //Delete a Project API----------------------------------------------------
    function click_ToDeleteProduct(id){
        dispatch(deleteProductAPI(id))
        dispatch(AllProductAPI({currentPage}));
    }
    // //Search a Project API -----------------------------------------------------
    function click_ToSearchProduct(){
        dispatch(searchProductAPI(productName));
    }
    // //Pagination Functions ---------------------------------------------------
    useEffect(()=>{
        if(product){
        setTotalPage(product.totalPage)
        }
    },[product])
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
        All Products
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center">
          <TextField
            label="Search Product"
            variant="outlined"
            size="small"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            sx={{ mr: 2 }}
          />
          <Button onClick={click_ToSearchProduct} variant="contained">
            Search
          </Button>
        </Box>
        <Button onClick={() => navigate("/add/product")} variant="contained" color="secondary">
          Add Product
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {["S.no", "Product Name", "Price Per Unit", "Total Price", "Stock Quantity", "Units", "Action"].map(
                (head) => (
                  <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>
                    {head}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {showProduct.length > 0 ? (
              showProduct.map((e, i) => (
                <TableRow key={e._id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{e.productName}</TableCell>
                  <TableCell>{e.pricePerUnit}</TableCell>
                  <TableCell>{e.totalPrice}</TableCell>
                  <TableCell>{e.status}</TableCell>
                  <TableCell>{e.units}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => navigate(`/edit/product/${e._id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => click_ToDeleteProduct(e._id)}>
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

export default AllProduct
