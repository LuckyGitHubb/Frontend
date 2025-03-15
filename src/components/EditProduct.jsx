import React, {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProductAPI } from '../features/GetSingleProductSlice'
import { editProductAPI } from '../features/EditProductSlice'
import { Container, TextField, MenuItem, Button, Grid, Typography } from "@mui/material";

function EditProduct(props) {
    const [productName,setProductName] = useState('');
        const [pricePerUnit,setPricePerUnit] = useState('');
        const [totalPrice,setTotalPrice] = useState('');
        const [stockQuantity,setStockQuantity] = useState('');
        const [units,setUnits] = useState('');
        const [status,setStatus] = useState('');
        const [purchaseDate,setPurchaseDate] = useState('');
        const [description,setDescription] = useState('');
     const dispatch = useDispatch()
     const navigate = useNavigate()
     console.log('this is my props: ',props);
     const { id } = useParams(); 
     
     console.log(id);
     let { loading ,getSingleProduct ,error} = useSelector((state) => state.getSingleProduct);
     useEffect(()=>{
      dispatch(getSingleProductAPI(id)) 
     },[id])
      useEffect(() => {
       if(getSingleProduct.Product){
         let product = getSingleProduct.Product
         setProductName(product.productName);
         setPricePerUnit(product.pricePerUnit);
         setTotalPrice(product.totalPrice);
         setStockQuantity(product.stockQuantity);
         setUnits(product.units);
         setStatus(product.status);
         setPurchaseDate(product.purchaseDate);
         setDescription(product.description);
       }
   }, [getSingleProduct]);
   if(loading){
      return <div>Loading...</div>
   } 

     function click_ToEditProduct(){
        dispatch(editProductAPI({productName,pricePerUnit,totalPrice,stockQuantity,units,status,purchaseDate,description,id}))
        navigate('/product');
     }
  return ( 
    <div>
       <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>

      <form onSubmit={click_ToEditProduct}>
        <Grid container spacing={2}>
          
          <Grid item xs={6}>
            <TextField fullWidth label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Price Per Unit" type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} required />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Total Price" type="number" value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Stock Quantity" type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
          </Grid>

          <Grid item xs={6}>
            <TextField select fullWidth label="Units" value={units} onChange={(e) => setUnits(e.target.value)} required>
              <MenuItem value="">Select Units</MenuItem>
              <MenuItem value="Feet">Feet</MenuItem>
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Meter">Meter</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth type="date" label="Purchase Date" InputLabelProps={{ shrink: true }} value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
          </Grid>

          <Grid item xs={12}>
            <TextField select fullWidth label="Status" value={status} onChange={(e) => setStatus(e.target.value)} required>
              <MenuItem value="">Select Status</MenuItem>
              <MenuItem value="Available">Available</MenuItem>
              <MenuItem value="Out Of Stock">Out Of Stock</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product details" required />
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

export default EditProduct
