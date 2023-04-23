// 在部署GovernorContract時,由於此合約太大,因此需要調整hardhat.config.js
// allowUnlimitedContractSize: true,  此行允許合約超過單檔大小

const { network } = require("hardhat");
const {
  developmentChains,
  QUORUM_PERCENTAGE,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  //get關鍵字來自hardhat.deployments
  //https://www.npmjs.com/package/hardhat-deploy
  //get來自 The deployments field, get的用意是,如果該合約已經部署過,fixture則可抓取該合約資訊
  const governanceToken = await get("AutopassGovernorToken");

  //在部署GovernorContract時的constructor需要以下這些參數,其中包含governanceToken和timeLock地址
  const args = [governanceToken.address, QUORUM_PERCENTAGE];

  log("--------------------");
  const governorContract = await deploy("AutoPassGovernor", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying");
    await verify(governorContract.address, args);
  }
};

module.exports.tags = ["all", "governor"];
