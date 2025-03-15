import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Topbar (Fixed at the top) */}
      <Topbar />

      {/* Sidebar & Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1, paddingTop: "64px" }}>  
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, marginLeft: "250px" }}> 
          <Outlet /> 
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
