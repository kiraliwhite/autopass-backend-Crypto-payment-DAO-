const { ethers } = require("hardhat");

const networkConfig = {
  5: {
    name: "goerli",
    vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D", //chainLink官方部署的合約地址
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "8402",
    callbackGasLimit: "500000", //500,000
    interval: "30", //每30秒檢查一次
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e", // goerli 測試網上的eth/usd 餵價智能合約地址
    mintFee: ethers.utils.parseEther("0.01"),
  },
  31337: {
    name: "hardhat",
    entranceFee: ethers.utils.parseEther("0.01"),
    gasLane:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    callbackGasLimit: "500000", //500,000
    interval: "30",
    mintFee: ethers.utils.parseEther("0.01"),
  },
  100: {
    name: "gnosis",
    entranceFee: ethers.utils.parseEther("0.001"),
    ethUsdPriceFeed: "0xa767f745331D267c7751297D982b050c93985627",
  },
};

const developmentChains = ["hardhat", "localhost"];

const DECIMALS = "8";
//定義小數點後8位
const INITIAL_ANSWER = "130000000000";
//定義以太幣對美元為1300元,然後小數點八位所以再加上8個0
const MIN_DELAY = 3600; // 1 hr,投票通過後，您有 1 小時的時間可以頒布
const QUORUM_PERCENTAGE = 4; // Proposal需要4%的投票同意,才會通過
const VOTING_PERIOD = 5; // blocks
const VOTING_DELAY = 1; // 1 Block - How many blocks till a proposal vote becomes active
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
const NEW_STORE_VALUE = 77;
const FUNC = "store"; // 要呼叫的function
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box!";
const proposalsFile = "proposals.json"; //此路徑指向proposals.json,用於存放proposalId

const frontEndContractsFile2 =
  "../nextjs-nft-marketplace-thegraph/constants/networkMapping.json";
const frontEndAbiLocation2 = "../nextjs-nft-marketplace-thegraph/constants/";

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_ANSWER,
  frontEndContractsFile2,
  frontEndAbiLocation2,
  MIN_DELAY,
  QUORUM_PERCENTAGE,
  VOTING_PERIOD,
  VOTING_DELAY,
  ADDRESS_ZERO,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  proposalsFile,
};
