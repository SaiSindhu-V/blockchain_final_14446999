import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  CssBaseline,
} from "@mui/material";
import Home from "./Home"; // Assume Home is another component for the homepage
import ProductForm from "./AddProducts";
import { CartProvider } from "./CartContext"; // Import the CartProvider
import Cart from "./Cart";
import Checkout from "./Checkout";

// Import web3.js
import Web3 from "web3";
// Import ABI for the deployed contract
import TokenABI from "./artifacts/contracts/Token.sol/Token.json";

// Navbar Component
function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Decentralized E-Commerce Store
        </Typography>
        {/* Navbar Links */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/add-product">
          Add Product
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
}

// Main App Component
function App() {
  return (
    <CartProvider>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          {/* Navbar always stays at the top */}
          <Navbar />

          {/* Main Content */}
          <Box sx={{ padding: "20px", backgroundColor: "#caf0f8" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-product" element={<ProductForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </CartProvider>

    
  );
}

export default App;
