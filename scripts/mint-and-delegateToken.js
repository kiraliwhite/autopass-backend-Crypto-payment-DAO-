const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const tokenContract = await ethers.getContract(
    "AutopassGovernorToken",
    deployer
  );
  const tx = await tokenContract.mintToken();
  await tx.wait(1);
  const transactionResponse = await tokenContract.delegate(deployer);
  await transactionResponse.wait(1);
  console.log(`Checkpoints: ${await tokenContract.numCheckpoints(deployer)}`);
  const tx1 = await tokenContract.getVotes(deployer);
  console.log(`vote power: ${tx1}`);
  const tx2 = await tokenContract.balanceOf(deployer);
  console.log(`this account ${deployer} has ${tx2} tokens`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
