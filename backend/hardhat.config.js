require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      url: process.env.RPC_URL,
    },
  },
};
