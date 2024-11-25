import React, { useState } from "react";
import { ethers } from "ethers";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  InputAdornment,
} from "@mui/material";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [image, setImage] = useState("");
  const [logs, setLogs] = useState([]); // State to store logs
  const abi= [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_message",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "payer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "PaymentLogged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "oldMessage",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "newMessage",
                "type": "string"
            }
        ],
        "name": "MessageUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "AdminMessage",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "productPrice",
                "type": "uint256"
            }
        ],
        "name": "ProductBought",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "productPrice",
                "type": "uint256"
            }
        ],
        "name": "ProductAdded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "fetchLogs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "action",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "productPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Token.Log[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "logs",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "action",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "productName",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "productPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Token.Log[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "productPrice",
                "type": "uint256"
            }
        ],
        "name": "logProductPurchase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "productName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "productPrice",
                "type": "uint256"
            }
        ],
        "name": "logProductAddition",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
  ];
  const tokenAddress = "0xd3b9eD19D0E8FC369f278157ACde12194cC9Fa6A";

  const handleSubmit = (e)  => {
    e.preventDefault();

    // Create new product object
    const newProduct = {
      title,
      category,
      price: parseFloat(price),
      oldPrice: parseFloat(oldPrice),
      rating: parseFloat(rating),
      reviews: parseInt(reviews),
      image,
    };

    // Get existing products from local storage
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Add new product to the existing products
    const updatedProducts = [...existingProducts, newProduct];

    // Save the updated product list to local storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Clear form
    setTitle("");
    setCategory("");
    setPrice("");
    setOldPrice("");
    setRating("");
    setReviews("");
    setImage("");

    alert("Product added successfully!");

    //interacting with contract
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner();
//abi



// Initialize the contract with ABI, address, and signer
const tokenContract = new ethers.Contract(tokenAddress, abi, signer);

// Call balanceOf to get the token balance for an account (e.g., the connected user's address)
//const balance = await tokenContract.balanceOf(signer.getAddress());
//console.log("Token balance:", balance.toString());

//printing functions
console.log("Contract ABI methods: ", tokenContract.functions);  // Check if setMessage appears




// Interact with the smart contract to log product addition
const tx = tokenContract.logProductAddition(
  signer.getAddress(), // User address
  newProduct.title, // Product name
  ethers.utils.parseUnits(newProduct.price.toString(), 18) // Product price in wei
);

console.log("Product addition log transaction initiated:", tx.hash);

//end of token interaction

  };

  const fetchLogs = async () => {
    const tokenAddress = "0x3339C892CB34ba1C4Ce71fC64344Cf89A10498E0";
    // this is where I am adding code
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

      // Fetch logs from the contract
      const logs = await tokenContract.fetchLogs();
      console.log("Logs fetched from smart contract:", logs);

      // Update state to display logs
      setLogs(logs);
    } catch (error) {
      console.error("Error fetching logs from the smart contract:", error);
    }
    // adding code ends here
  };

  

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: "center" }}>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                type="number"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Old Price (optional)"
                type="number"
                variant="outlined"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Rating"
                type="number"
                variant="outlined"
                inputProps={{ min: 0, max: 5, step: 0.1 }}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Reviews"
                type="number"
                variant="outlined"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL (optional)"
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, padding: "10px" }}
              >
                Add Product
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2, padding: "10px" }}
                onClick={fetchLogs}
              >
                Fetch Logs
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5">Logs:</Typography>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <Box key={index} sx={{ marginTop: 2 }}>
                <Typography>
                  User: {log.user}, Action: {log.action}, Product Name:{" "}
                  {log.productName}, Product Price:{" "}
                  {ethers.utils.formatUnits(log.productPrice, 18)}, Timestamp:{" "}
                  {new Date(log.timestamp * 1000).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No logs available.</Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProduct;
