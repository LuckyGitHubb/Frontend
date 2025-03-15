import { Box, Grid, Typography  } from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton } from "@mui/material";
import { MdPeople } from "react-icons/md";
import { GoProjectRoadmap } from "react-icons/go";
import { MdOutlineProductionQuantityLimits, MdPointOfSale } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { Edit as EditIcon } from '@mui/icons-material'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allEmployeeAPI } from "../features/allEmployeeSlice";
import { allClientAPI } from "../features/AllClientSlice";
import { AllProjectAPI } from "../features/AllPojectSlice";
import { AllSaleAPI } from "../features/AllSaleSlice";
import { AllProductAPI } from "../features/AllProductSlice";
import { useNavigate } from "react-router-dom";




const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const totalEmployee = useSelector((state)=>state?.allEmployee?.allEmployeeData?.totalEmployee || 0)
  const employee = useSelector((state)=>state?.allEmployee?.allEmployeeData?.getAllEmployee || [])
  const totalProject = useSelector((state)=>state?.allProject?.arr?.totalProject || 0)
  const project = useSelector((state)=>state?.allProject?.arr?.getAllProject || [])
  const totalProduct = useSelector((state)=>state?.allProduct?.arr?.totalProduct || 0)
  const product = useSelector((state)=>state?.allProduct?.arr.Product || [])
  const totalSale = useSelector((state)=>state?.allSale?.arr?.totalSale || 0)
  const sale = useSelector((state)=>state?.allSale?.arr?.saleData || [])
  useEffect(()=>{
    dispatch(allEmployeeAPI())
    dispatch(AllProductAPI())
    dispatch(AllProjectAPI())
    dispatch(AllSaleAPI())
  },[dispatch])
  return (
    <div>
    <Box sx={{ padding: 2, marginBottom:'20px'}}>
      {/* Parent Grid (Container) */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Child Box 1 */}
        <Grid item xs={5} sm={3}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "150px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Typography><MdPeople size={40} /></Typography>
            <Typography>{totalEmployee}</Typography>
            <Typography>Employee</Typography>
          </Box>
        </Grid>

        {/* Child Box 2 */}
        <Grid item xs={5} sm={3}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "150px",
              display: "flex",
              flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Typography><GoProjectRoadmap size={40} /></Typography>
            <Typography>{totalProject}</Typography>
            <Typography>Project</Typography>
          </Box>
        </Grid>

        {/* Child Box 3 */}
        <Grid item xs={5} sm={3}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "150px",
              display: "flex",
              flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <Typography>
            <MdOutlineProductionQuantityLimits size={40} />
            </Typography>
            <Typography>{totalProduct}</Typography>
            <Typography>Product</Typography>
          </Box>
        </Grid>

        {/* Child Box 4 */}
        <Grid item xs={5} sm={3}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "150px",
              display: "flex",
              flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
          <Typography>
  <MdPointOfSale size={40} />
</Typography>
<Typography>{totalSale}</Typography>
<Typography>Sales</Typography>

          </Box>
        </Grid>
      </Grid>
    </Box>

    <Box sx={{ padding: 2 , marginBottom:'80px' }}>
      {/* Parent Grid (Container) */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Child Box 1 */}
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "185px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            
            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {[ "Name", "Mobile", "City", "Department", "Action"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {employee.length > 0 ?
            employee.slice(0,3).map((e, i) => (
              <TableRow key={e._id}>
                <TableCell align="center">{e.name}</TableCell>
                <TableCell align="center">{e.mobile}</TableCell>
                <TableCell align="center">{e.city}</TableCell>
                <TableCell align="center">{e.department}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton color='primary' onClick={() => { navigate(`/edit/employee/${e._id}`) }}>
                    <EditIcon size={20}/>
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
            :
            <TableRow>
              <TableCell colSpan={5} align="center">No Employees Found...</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>

          </Box>
        </Grid>

        {/* Child Box 2 */}
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "185px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {[ "Project", "Client", "Cost", "Status", "Action"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {project.length > 0 ?
            project.slice(0,3).map((e, i) => (
              <TableRow key={i}>
                              <TableCell align="center">{e.projectName}</TableCell>
                              <TableCell align="center">{e?.clientName?.clientName || '-'}</TableCell>
                              <TableCell align="center">{e.cost}</TableCell>
                              <TableCell align="center">{e.status}</TableCell>
                              <TableCell align="center">
                              <Tooltip title="Edit">
                    <IconButton color='primary' 
                      onClick={() => { navigate(`/edit/project/${e._id}`) }}>                      
                    <EditIcon size={20}/>
                    </IconButton>
                  </Tooltip>
                              </TableCell>
                          </TableRow>
            ))
            :
            <TableRow>
              <TableCell colSpan={5} align="center">No Projects Found...</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
    {/* ===================================================================================  */}
    <Box sx={{ padding: 2,  marginTop:'80px'}}>
      {/* Parent Grid (Container) */}
      <Grid container spacing={2} justifyContent="space-between" alignItems="center">
        {/* Child Box 1 */}
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "185px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {[ "Product", "Unit", "Total Price", "Status", "Action"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {product.length > 0 ?
            product.slice(0,3).map((e, i) => (
              <TableRow key={i}>
                              <TableCell align="center">{e.productName}</TableCell>
                                              <TableCell align="center">{e.pricePerUnit}</TableCell>
                                              <TableCell align="center">{e.totalPrice}</TableCell>
                                              <TableCell align="center">{e.status}</TableCell>
                              <TableCell align="center">
                              <Tooltip title="Edit">
                    <IconButton color='primary'
                      onClick={() => { navigate(`/edit/product/${e._id}`) }}>
                    <EditIcon size={20}/>
                    </IconButton>
                  </Tooltip>
                              </TableCell>
                          </TableRow>
            ))
            :
            <TableRow>
              <TableCell colSpan={5} align="center">No Product Found...</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
          </Box>
        </Grid>

        {/* Child Box 2 */}
        <Grid item xs={6}>
          <Box
            sx={{
              backgroundColor: "#fff",
              color: "black",
              height: "185px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
            }}
          >
            <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {[ "Client", "Product", "tax", "Price", "Action"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>

            {sale.length > 0 ?
            sale.slice(0,3).map((e, i) => (
              <TableRow key={i}>
                              <TableCell align="center">{e.clientName.clientName}</TableCell>
                              <TableCell align="center">{e.productName.productName}</TableCell>
                              <TableCell align="center">{e.tax}</TableCell>
                              <TableCell align="center">{e.price}</TableCell>
                              <TableCell align="center">
                              <Tooltip title="Edit">
                    <IconButton color='primary'
                      onClick={() => { navigate(`/edit/sale/${e._id}`) }}>
                    <EditIcon size={20}/>
                    </IconButton>
                  </Tooltip>
                              </TableCell> 
                          </TableRow>
            ))
            :
            <TableRow>
              <TableCell colSpan={5} align="center">No Sale Found...</TableCell>
            </TableRow>
          }
          </TableBody>
        </Table>
      </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </div>
  );
};

export default Dashboard;
