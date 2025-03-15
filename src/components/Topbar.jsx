import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";

const Topbar = ({ toggleSidebar }) => {
  return (
    <AppBar 
      position="fixed" 
      sx={{ backgroundColor: "#f2f7ff", zIndex: 1200 }} // Lower zIndex than Sidebar
    >
      <Toolbar>
        {/* Menu Icon (For Sidebar Toggle) */}
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        {/* Dashboard Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        </Typography>

        {/* Profile / Logout Button */}
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
