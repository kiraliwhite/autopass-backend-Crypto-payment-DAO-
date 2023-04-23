const { getNamedAccounts, ethers, waffle } = require("hardhat");

const main = async () => {
  const provider = waffle.provider;
  const deployer = (await getNamedAccounts()).deployer;
  const thirdPartyAccount = (await getNamedAccounts()).player;
  const autopassContract = await ethers.getContract("Autopass", deployer);

  console.log("Spend money for car refueling");

  let thirdPartyFee = ethers.utils.parseEther("0.01");

  const transactionResponse = await autopassContract.spendMoney(thirdPartyFee, thirdPartyAccount, {
    value: ethers.utils.parseEther("0.01"),
  });

  await transactionResponse.wait(1);

  console.log(
    `Account: ${deployer}, thirdPartyFee: ${ethers.utils.formatUnits(
      thirdPartyFee,
      "ether"
    )} ETH , thirdPartyAccount: ${thirdPartyAccount} `
  );

  const autopassBalance = await provider.getBalance(autopassContract.address);
  console.log(
    `Autopass Contract Balance: ${ethers.utils.formatUnits(autopassBalance, "ether")} ETH`
  );

  //(address spender, address thirdPartyAddress
  const tx = await autopassContract.retrieve(deployer, thirdPartyAccount);
  console.log(
    `Account ${deployer} total spend ${ethers.utils.formatUnits(
      tx,
      "ether"
    )} ETH on this store ${thirdPartyAccount}`
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
