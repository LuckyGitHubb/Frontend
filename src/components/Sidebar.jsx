import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon, ExitToApp, People, Dashboard, Person, ShoppingCart, Inventory, Work } from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  function clearStorage(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <Box 
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        // bgcolor: "background.paper",
        position: "fixed", 
        top: 0, 
        left: 0, 
        zIndex: 1300,
        backgroundColor: "#fff"
      }}
    >
      <ProSidebar collapsed={collapsed} style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
        <SidebarHeader>
          <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
            {!collapsed && <Typography variant="h6">Dashboard</Typography>}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuIcon color="white" />
            </IconButton>
          </Box>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<Dashboard />}><Link to="/dashboard">Dashboard</Link></MenuItem>
            <MenuItem icon={<People />}><Link to="/employee">Employee</Link></MenuItem>
            <MenuItem icon={<Work />}><Link to="/project">Project</Link></MenuItem>
            <MenuItem icon={<Person />}><Link to="/client">Client</Link></MenuItem>
            <MenuItem icon={<Inventory />}><Link to="/product">Product</Link></MenuItem>
            <MenuItem icon={<ShoppingCart />}><Link to="/sale">Sale</Link></MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem onClick={clearStorage} icon={<ExitToApp />}>Logout</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
