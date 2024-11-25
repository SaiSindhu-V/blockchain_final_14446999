import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Rating,
} from "@mui/material";
import { CartContext } from "../CartContext";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Leather from "../assets/Ecommerce-images/leatherwallet.png";
import LeatherBelt from "../assets/Ecommerce-images/LeatherBelt.png";
import BloothSpeaker from "../assets/Ecommerce-images/BluetoothSpeaker.png";
import SmartPhoneStand from "../assets/Ecommerce-images/SmartPhoneStand.png";
import WirelessEarBuds from "../assets/Ecommerce-images/WirelessEarbuds.png";
import WirelessMouse from "../assets/Ecommerce-images/WirelessMouse.png";
import MensRunningShoes from "../assets/Ecommerce-images/RunningShoes.png";
import Laptop from "../assets/Ecommerce-images/laptopBackpack.png";
import FitnessTracker from "../assets/Ecommerce-images/FitnessTracker.png";
import Ceramic from "../assets/Ecommerce-images/CoffeeMug.png";
import NeckPillow from "../assets/Ecommerce-images/NeckPillow.png";
import Headphones from "../assets/Ecommerce-images/Headphones.png";
import LEDBulb from "../assets/Ecommerce-images/LEDBulb.png";

// Hardcoded products list
const hardcodedProducts = [
  {
    title: "Leather Wallet",
    category: "Accessories",
    price: 35,
    oldPrice: 40,
    rating: 4.8,
    reviews: 150,
    image: Leather,
  },
  {
    title: "Bluetooth Speaker",
    category: "Electronics",
    price: 50,
    oldPrice: 60,
    rating: 4.5,
    reviews: 320,
    image: BloothSpeaker,
  },
  {
    title: "Smartphone Stand",
    category: "Accessories",
    price: 15,
    oldPrice: 20,
    rating: 4.2,
    reviews: 200,
    image: SmartPhoneStand,
  },
  {
    title: "Wireless Earbuds",
    category: "Electronics",
    price: 100,
    oldPrice: 120,
    rating: 4.7,
    reviews: 500,
    image: WirelessEarBuds,
  },
  {
    title: "Men's Running Shoes",
    category: "Footwear",
    price: 80,
    oldPrice: 100,
    rating: 4.6,
    reviews: 300,
    image: MensRunningShoes,
  },
  {
    title: "Laptop Backpack",
    category: "Accessories",
    price: 60,
    oldPrice: 70,
    rating: 4.3,
    reviews: 180,
    image: Laptop,
  },
  {
    title: "Fitness Tracker",
    category: "Electronics",
    price: 120,
    oldPrice: 150,
    rating: 4.5,
    reviews: 400,
    image: FitnessTracker,
  },
  {
    title: "Ceramic Coffee Mug",
    category: "Home & Kitchen",
    price: 10,
    oldPrice: 15,
    rating: 4.2,
    reviews: 50,
    image: Ceramic,
  },
  {
    title: "Wireless Mouse",
    category: "Electronics",
    price: 25,
    oldPrice: 30,
    rating: 4.1,
    reviews: 100,
    image: WirelessMouse,
  },
  {
    title: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: 180,
    oldPrice: 200,
    rating: 4.9,
    reviews: 600,
    image: Headphones,
    tag: "Best Seller",
  },
  {
    title: "Smart LED Light Bulb",
    category: "Home & Kitchen",
    price: 30,
    oldPrice: 40,
    rating: 4.6,
    reviews: 120,
    image: LEDBulb,
  },
  {
    title: "Travel Neck Pillow",
    category: "Travel Accessories",
    price: 20,
    oldPrice: 25,
    rating: 4.4,
    reviews: 80,
    image: NeckPillow,
  },
  // Add more hardcoded products as needed...
];

function ProductGrid() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  // Merge products from local storage and hardcoded products
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const allProducts = [...hardcodedProducts, ...storedProducts];
    setProducts(allProducts);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  height="150"
                  sx={{ objectFit: "contain" }}
                />
                <CardContent>
                  {product.tag && (
                    <Chip
                      label={product.tag}
                      color={product.tag === "Sale" ? "error" : "secondary"}
                      size="small"
                      sx={{ marginBottom: "10px" }}
                    />
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                    />
                    <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                      {product.rating} ({product.reviews})
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", marginRight: "10px" }}
                    >
                      ${product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ${product.oldPrice}
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ margin: "10px", textTransform: "none" }}
                onClick={() => addToCart(product)}
              >
                + Add
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductGrid;
