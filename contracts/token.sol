// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name = "My";
    string public symbol = "MHT";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) public balanceOf;

    string public message; // Variable to store the message

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event PaymentLogged(address indexed payer, uint256 amount, string message);
    event MessageUpdated(string oldMessage, string newMessage); // Event to track message updates
    event AdminMessage(string message); // Event for admin messages
    event ProductBought(address indexed user, string productName, uint256 productPrice);
    event ProductAdded(address indexed user, string productName, uint256 productPrice);

    struct Log {
        address user;
        string action; // "bought" or "added"
        string productName;
        uint256 productPrice;
        uint256 timestamp;
    }

    Log[] public logs; // Array to store logs

    // Constructor to accept a message
    constructor(string memory _message) {
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
        message = _message; // Store the initial message
    }

    // Function to log product purchase
    function logProductPurchase(
        address user,
        string memory productName,
        uint256 productPrice
    ) public {
        logs.push(
            Log({
                user: user,
                action: "bought",
                productName: productName,
                productPrice: productPrice,
                timestamp: block.timestamp
            })
        );
        emit ProductBought(user, productName, productPrice); // Emit event for product purchase
    }

    // Function to log product addition
    function logProductAddition(
        address user,
        string memory productName,
        uint256 productPrice
    ) public {
        logs.push(
            Log({
                user: user,
                action: "added",
                productName: productName,
                productPrice: productPrice,
                timestamp: block.timestamp
            })
        );
        emit ProductAdded(user, productName, productPrice); // Emit event for product addition
    }

    // Fetch logs function
    function fetchLogs() public view returns (Log[] memory) {
        return logs; // Returns all logs stored in the contract
    }
}
