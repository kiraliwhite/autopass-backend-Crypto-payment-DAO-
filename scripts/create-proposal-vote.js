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
  const createProposal = await governorContract.createProposal(
    "this is first proposal"
  );
  await createProposal.wait(1);

  const createProposal2 = await governorContract.createProposal(
    "this is second proposal"
  );
  await createProposal2.wait(1);

  const voteProposal = await governorContract.vote(0, true);
  await voteProposal.wait(1);

  const voteProposal2 = await governorContract.vote(1, false);
  await voteProposal2.wait(1);

  const activeProposal = await governorContract.getActiveProposals();
  console.log(activeProposal.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
