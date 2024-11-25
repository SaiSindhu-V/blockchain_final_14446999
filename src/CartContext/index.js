import React, { createContext, useState } from "react";

// Create Cart Context
export const CartContext = createContext();

// Cart Provider component to wrap around the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to add product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
