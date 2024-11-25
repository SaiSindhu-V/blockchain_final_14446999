import React from "react";
import { MenuList, MenuItem, Button, Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView"; // Icon for "All Departments"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Dropdown icons

function Navbar() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", padding: "10px 20px" }}
    >
      {/* "All Departments" Button */}
      <Button
        variant="contained"
        color="success"
        startIcon={<GridViewIcon />}
        style={{ marginRight: "20px", borderRadius: "15px" }}
      >
        All Departments
      </Button>

      {/* Main Navigation MenuList */}
      <MenuList style={{ display: "flex", flexGrow: 1 }}>
        {/* Home */}
        <MenuItem>
          <Typography variant="body1">Home</Typography>
        </MenuItem>

        {/* Shop */}
        <MenuItem>
          <Typography variant="body1">Shop</Typography>
          <ArrowDropDownIcon />
        </MenuItem>

        {/* Mega Menu */}
        <MenuItem>
          <Typography variant="body1">Mega Menu</Typography>
          <ArrowDropDownIcon />
        </MenuItem>

        {/* Pages */}
        <MenuItem>
          <Typography variant="body1">Pages</Typography>
          <ArrowDropDownIcon />
        </MenuItem>

        {/* Account */}
        <MenuItem>
          <Typography variant="body1">Account</Typography>
          <ArrowDropDownIcon />
        </MenuItem>

        {/* Docs */}
        <MenuItem>
          <Typography variant="body1">Docs</Typography>
        </MenuItem>
      </MenuList>
    </div>
  );
}

export default Navbar;
