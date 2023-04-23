const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("--------------------");
  const governanceToken = await deploy("AutopassGovernorToken", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //const governanceToken = await ethers.getContract("AutopassGovernorToken");

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying");
    await verify(governanceToken.address, []);
  }
};

module.exports.tags = ["all", "governor", "token"];

//deployer 目前獲得所有的投票權
//提案時,禁止deployer提案
