/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x53b2ad0b77948f8c2a9257f5e009accc13d1309ac2985d7f08d7f95f58069dbf", // Private key 2
        "0xa12a0f4f99786cf98555b261cf9808df2c3fa837ebd8075b24616e752bbeb606"  // Private key 1
      ],
    },
  },
};
