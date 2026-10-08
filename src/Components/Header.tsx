import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import { styled } from "@mui/material/styles";
// import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";


// 🔎 Styled Search Bar
// const SearchBar = styled("div")(() => ({
//   display: "flex",
//   alignItems: "center",
//   borderRadius: 50,
//   backgroundColor: "#fff",
//   padding: "5px 15px",
//   boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
//   minWidth: 300,
// }));

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* 🍔 Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, cursor: "pointer" }}>
          <RestaurantMenuIcon sx={{ color: "green" }} />
          <Typography variant="h6" noWrap sx={{ fontWeight: "bold", color: "green" }}>
            FoodieHub
          </Typography>
        </Box>

        {/* 📂 Navigation Menu */}
        {/* <Box sx={{ display: "flex", gap: 4 }}>
          <Typography variant="body1" sx={{ cursor: "pointer", "&:hover": { color: "green" } }}>
            Home
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", "&:hover": { color: "green" } }}>
            Recipes
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", "&:hover": { color: "green" } }}>
            Restaurants
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", "&:hover": { color: "green" } }}>
            Contact
          </Typography>
        </Box> */}

        {/* 🔎 Search Bar */}
        {/* <SearchBar>
          <input
            type="text"
            placeholder="Search dishes, cuisines..."
            style={{
              border: "none",
              outline: "none",
              flex: 1,
              fontSize: 14,
              padding: "5px",
            }}
          />
          <IconButton
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            <SearchIcon />
          </IconButton>
        </SearchBar> */}

        {/* 👤 User Profile */}
        <Box>
          <IconButton>
            <AccountCircleIcon sx={{ color: "green" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
