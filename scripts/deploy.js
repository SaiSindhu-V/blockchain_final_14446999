async function main() {
    const privateKey = "0x53b2ad0b77948f8c2a9257f5e009accc13d1309ac2985d7f08d7f95f58069dbf";
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545"); // Connect to local Ganache or Hardhat
    const wallet = new ethers.Wallet(privateKey, provider);
  
    console.log("Using account:", wallet.address);
  
    // Pass the message during contract deployment
    const Token = await ethers.getContractFactory("Token", wallet);
    const token = await Token.deploy("first deployment");  // Passing a custom message
  
    console.log("Token deployed to:", token.address);
  
    // Retrieve and print the message from the contract
    const message = await token.message();
    console.log("Message in contract:", message);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  