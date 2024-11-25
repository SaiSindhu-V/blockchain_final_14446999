import React, { useContext } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Used to navigate to the checkout page
import { CartContext } from "../CartContext";

function Cart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate(); // Used for navigation

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {cart.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    height="150"
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography variant="body2">${product.price}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Total price */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">
              Total: ${totalPrice.toFixed(2)}
            </Typography>
          </Box>

          {/* Checkout button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => navigate("/checkout")} // Navigate to checkout page
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
}

export default Cart;
