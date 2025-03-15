import React, { useState, useEffect, useMemo, useRef } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Tooltip, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { allEmployeeAPI } from "../features/allEmployeeSlice";
import { deleteEmployeeAPI } from "../features/DeleteEmployeeSlice";
import { searchEmployeeAPI } from "../features/SearchEmployeeSlice";
import { useNavigate } from "react-router-dom";

const ResponsiveTable = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [employeeName, setEmployeeName] = useState("");
  const refElement = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const { allEmployeeData, error, loading } = useSelector((state) => state.allEmployee);
  const searchEmployee = useSelector((state) => state.searchEmployee.arr.searchForEmployee);
  
  const memoizedEmployee = useMemo(() => {
    return searchEmployee ? searchEmployee : allEmployeeData?.getAllEmployee || [];
  }, [searchEmployee, allEmployeeData.getAllEmployee]);

  useEffect(() => {
    dispatch(allEmployeeAPI({ currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    setTotalPage(allEmployeeData.totalPage);
  }, [allEmployeeData]);

  const getPrevPageNumber = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getNextPageNumber = () => {
    if (totalPage > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div> 
    <Box>
      <Box display="flex" justifyContent="space-between" padding={2}>
        <Box display="flex" alignItems="center">
          <TextField label="Search Employee" variant="outlined" size="small" onChange={(e) => setEmployeeName(e.target.value)} value={employeeName} sx={{ mr: 2 }} />
          <Button onClick={() => dispatch(searchEmployeeAPI(employeeName))} variant="contained">Search</Button>
        </Box>
        <Button onClick={() => navigate('/add/employee')} variant="contained" color="secondary">Add Employee</Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#6200ea" }}>
              {["S.no", "Name",  "Mobile", "City", "Experience", "Age", "Department", "Gender", "Action"].map((head) => (
                <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {memoizedEmployee.map((e, i) => (
              <TableRow key={e._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.mobile}</TableCell>
                <TableCell>{e.city}</TableCell>
                <TableCell>{e.experience}</TableCell>
                <TableCell>{e.age}</TableCell>
                <TableCell>{e.department}</TableCell> 
                <TableCell>{e.gender}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton color='primary' onClick={() => { navigate(`/edit/employee/${e._id}`) }}><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color='error' onClick={() => dispatch(deleteEmployeeAPI({ id: e._id }))}><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button onClick={getPrevPageNumber} disabled={currentPage === 1} variant="contained" sx={{ mr: 2 }}>Prev</Button>
        <span>Page {currentPage} of {totalPage}</span>
        <Button onClick={getNextPageNumber} disabled={currentPage === totalPage} variant="contained" sx={{ ml: 2 }}>Next</Button>
      </Box>
    </Box>
    </div>
  );
};

export default ResponsiveTable;
