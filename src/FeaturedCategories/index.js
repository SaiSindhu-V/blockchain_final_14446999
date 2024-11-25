import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
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

const products = [
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
];

function FeaturedCategories() {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Featured Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Left Scroll Button */}
        <IconButton onClick={() => scroll(-300)}>
          <ArrowBackIosIcon />
        </IconButton>

        {/* Scrollable Products List */}
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            width: "100%",
            padding: "10px",
          }}
          ref={scrollRef}
        >
          {products.map((product, index) => (
            <Card key={index} sx={{ minWidth: 200, margin: "0 10px" }}>
              <CardMedia
                component="img"
                height="150"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" align="center">
                  {product.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Right Scroll Button */}
        <IconButton onClick={() => scroll(300)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default FeaturedCategories;
