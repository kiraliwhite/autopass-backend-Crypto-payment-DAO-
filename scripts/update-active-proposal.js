const { getNamedAccounts, ethers } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  const tokenContract = await ethers.getContract(
    "AutopassGovernorToken",
    deployer
  );

  const governorContract = await ethers.getContract(
    "AutoPassGovernor",
    deployer
  );

  const renewProposal = await governorContract.checkAndExecuteProposals();
  await renewProposal.wait(1);

  const activeProposal = await governorContract.getActiveProposals();
  console.log(activeProposal.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
