import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
} from "@mui/material";

import ResponsiveAppBar from "../TopNavBar";
import Navbar from "../DepartmentMenu";
import FeaturedCategories from "../FeaturedCategories";
import ProductGrid from "../PopularProducts";
import { CartContext } from "../CartContext";
import mainImage from "../assets/Blue Ecommerce Online Shopping LinkedIn Banner.png";

function Home() {
  return (
    <>
      <Divider variant="fullWidth" />
      <Box
        display="flex"
        justifyContent="center"
        padding="1rem"
        border="2px solid balck"
        sx={{ radius: "4px", height: "75vh" }}
        style={{ radius: "4px" }}
      >
        <img src={mainImage} style={{ maxWidth: "100%", maxHeight: "100%" }} />
      </Box>
      <FeaturedCategories />
      <ProductGrid />
    </>
  );
}

export default Home;
