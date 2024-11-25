import React, { useEffect, useContext, useState } from "react";
import { ethers } from "ethers";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import Web3 from "web3"; // Import Web3.js
import { CartContext } from "../CartContext";
//import TokenABI from "../artifacts/contracts/Token.sol/Token.json";

const tokenAddress = "0x3339C892CB34ba1C4Ce71fC64344Cf89A10498E0";

function Checkout() {
  const { cart } = useContext(CartContext);
  const [userAddress, setUserAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [transactionHash, setTransactionHash] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState("");

  // Calculate total price in USD
  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  //defining abi

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



  // MetaMask connection and transaction
  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask to proceed.");
        setIsProcessing(false);
        return;
      }

      // Create a new instance of Web3 using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request MetaMask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = "0x3eE538b5CB3F5F311172882f4Ace45828602dbB6";
   

       
      setUserAddress(userAddress);
      
      // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
      const ethPrice = (totalPrice / 9000000).toFixed(18); // Convert USD to Ether
      
      // Define the transaction parameters
      const transactionParameters = {
        to: "0x444bA35cF0E3773190e94A1B16973a1553a88B64", // Replace with your Ethereum address
        from: userAddress, // MetaMask account
        value: web3.utils.toWei(ethPrice, "ether"), // Convert Ether to Wei
        gas: "20000", // Basic transaction gas limit
      };

      // Send the transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });


      // setting sender and receiver for transfer
      // Define contract address and token amount for the transfer

const recipientAddress = "0x444bA35cF0E3773190e94A1B16973a1553a88B64"; // Replace with the address you want to transfer to
const transferAmount = 100; 
      
       //interacting with contract
      const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const signer = provider.getSigner();

// Initialize the contract with ABI, address, and signer
const tokenContract = new ethers.Contract(tokenAddress, abi, signer);

// Call balanceOf to get the token balance for an account (e.g., the connected user's address)
//const balance = await tokenContract.balanceOf(signer.getAddress());
//console.log("Token balance:", balance.toString());

//printing functions
console.log("Contract ABI methods: ", tokenContract.functions);  // Check if setMessage appears


    
    console.log("Transfer initiated, waiting for confirmation...");

//const tx = await tokenContract.setMessage("Payment completed successfully");
//await tx.wait();  // Wait for the transaction to be mined

      //end of interacting smart contract

      // adding this code: Log each product purchase in the smart contract
    for (const product of cart) {
      const tx = await tokenContract.logProductPurchase(
      userAddress, // Buyer's address
      product.title, // Product name
      ethers.utils.parseUnits(product.price.toString(), 18) // Product price in wei
    ); }


      console.log("Transaction sent: ", transactionHash);
    alert(`Transaction successful! Hash: ${transactionHash}`);
      
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Your deployed contract address
  // const recipientAddress = "0x90F79bf6EB2c4f870365E785982E1f101E93b906"; // The account receiving the tokens

  // const contractPayment = async () => {
  //   try {
  //     setIsProcessing(true);

  //     // Check if MetaMask is installed
  //     if (typeof window.ethereum === "undefined") {
  //       alert("MetaMask is not installed. Please install MetaMask to proceed.");
  //       setIsProcessing(false);
  //       return;
  //     }

  //     // Create a new instance of Web3 using the MetaMask provider
  //     const web3 = new Web3(window.ethereum);

  //     // Request MetaMask to connect
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const accounts = await web3.eth.getAccounts();
  //     const userAddress = accounts[0]; // Get the user's MetaMask account
  //     setUserAddress(userAddress);

  //     // Load the deployed Token contract using its ABI and contract address
  //     const tokenContract = new web3.eth.Contract(
  //       TokenABI.abi,
  //       contractAddress
  //     );

  //     // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
  //     const ethPrice = (totalPrice / 9000000).toFixed(18); // Convert USD to Ether

  //     // Convert the token amount or Ether to Wei (if you're dealing with Ether)
  //     const value = web3.utils.toWei(ethPrice, "ether");

  //     // Call the `transfer` method from the Token contract to transfer tokens to the recipient
  //     const transactionHash = await tokenContract.methods
  //       .TokenABI.transfer(recipientAddress, value) // recipientAddress is the destination
  //       .send({
  //         from: userAddress, // MetaMask account of the sender
  //         gas: "200000", // Adjust the gas limit as needed
  //       });

  //     console.log("Transaction sent: ", transactionHash);
  //     alert(`Transaction successful! Hash: ${transactionHash}`);
  //   } catch (error) {
  //     console.error("Error during payment:", error);
  //     alert("Transaction failed. Please try again.");
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        {cart.map((product, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                height="150"
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6">{product.title}</Typography>
                <Typography variant="body2">
                  Price: ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total price */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Total: ${totalPrice.toFixed(2)}</Typography>
      </Box>

      {/* Proceed with Payment Button */}
      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Proceed with Payment"}
      </Button>

      {/* Show connected wallet address */}
      {userAddress && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Connected Wallet: {userAddress}
        </Typography>
      )}
    </Box>
  );
}

export default Checkout;
