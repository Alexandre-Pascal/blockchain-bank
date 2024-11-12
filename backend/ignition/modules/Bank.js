const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BankModule", (m) => {
  const bank = m.contract("Bank");

  console.log("Bank module initialized at the address:", bank.address);

  return { bank };
});
