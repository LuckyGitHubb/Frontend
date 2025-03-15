import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AllProductAPI } from '../features/AllProductSlice';
import { allClientAPI } from '../features/AllClientSlice';
import { calculateGrandAmount, calculateTotalAmount } from '../utility/globalFunction';
import { addSaleAPI } from '../features/AddSaleSlice';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, MenuItem, Button, Grid, Typography } from "@mui/material";

function AddSale() {
    const [productName,setProductName] = useState('');
        const [clientName,setClientName] = useState('');
        const [price,setPrice] = useState('');
        const [quantity,setQuantity] = useState(0);
        // const [discountInPerc,setDiscountInPerc] = useState('');
        // const [discountInRupee,setDiscountInRupee] = useState('');
        const [totalAmount,setTotalAmount] = useState('');
        const [tax,setTax] = useState('');
        const [grandTotal,setGrandTotal] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate()
        const product = useSelector((state)=>state?.allProduct?.arr?.Product || []);
        const client = useSelector((state)=>state?.allClient?.allClientData?.clientData || []);
        console.log('This is my client: ',client);
        useEffect(()=>{
            dispatch(AllProductAPI());
            dispatch(allClientAPI());
        },[dispatch])
        useEffect(()=>{
            if(productName!=='' || productName!==undefined){
            const filteredProduct = product.filter((e)=>e._id===productName)
            if(filteredProduct && filteredProduct.length > 0){
                setPrice(filteredProduct[0].totalPrice)
                }
            }
        },[productName])
        useEffect(()=>{
            const amount = calculateTotalAmount(price,quantity)
            setTotalAmount(amount)
        },[quantity,price])
        useEffect(()=>{
            const amount = calculateGrandAmount(tax,totalAmount)
            setGrandTotal(amount)
        },[tax])
        function click_ToAddSale(){
            dispatch(addSaleAPI({clientName,productName,price,quantity,totalAmount,tax,grandTotal}))
            
                navigate('/sale');
            
        } 
  return (
      <div>
        <Container maxWidth="sm" style={{ marginTop: "20px", padding: "20px", background: "#fff", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add Sale
      </Typography>

      <form onSubmit={click_ToAddSale}>
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextField select fullWidth label="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)}>
              <MenuItem value="" disabled>Select Product</MenuItem>
              {product?.map((e, index) => (
                <MenuItem key={index} value={e._id}>
                  {e.productName}
                </MenuItem>
              ))}
            </TextField>
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
            <TextField fullWidth label="Price" type="number" value={price} disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Total Amount" type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Tax (%)" type="number" value={tax} onChange={(e) => setTax(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Grand Total" type="number" value={grandTotal} disabled />
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

export default AddSale
