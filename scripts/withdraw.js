const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const autopass = await ethers.getContract("Autopass", deployer);
  const tx = await autopass.getContractBalance();
  console.log(`AutoPass Contract Balance: ${ethers.utils.formatUnits(tx, "ether")} ETH`);
  console.log("withdrawing");

  const transactionResponse = await autopass.withdrawProceeds();
  await transactionResponse.wait(1);

  console.log("done!");
  const tx1 = await autopass.getContractBalance();
  console.log(`AutoPass Contract Balance: ${ethers.utils.formatUnits(tx1, "ether")} ETH`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
