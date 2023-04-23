require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
const GNOSISSCAN_API_KEY = process.env.GNOSISSCAN_API_KEY;
const BLOCKSCOUT_API_KEY = process.env.BLOCKSCOUT_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockGasLimit: 12000000,
      /* forking: {
        url: MAINNET_RPC_URL,
      }, */
    },
    localhost: {
      chainId: 31337,
      url: "http://localhost:8545",
    },
    local: {
      url: "http://localhost:8545",
    },
    goerli: {
      chainId: 5,
      blockConfirmations: 6,
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    gnosis: {
      chainId: 100,
      blockConfirmations: 6,
      url: "https://rpc.gnosischain.com",
      accounts: [PRIVATE_KEY],
    },
    chiado: {
      chainId: 10200,
      url: "https://rpc.chiadochain.net",
      gasPrice: 1000000000,
      accounts: [PRIVATE_KEY],
    },
    "thunder-testnet": {
      url: "https://testnet-rpc.thundercore.com",
      chainId: 18,
      gas: 90000000,
      gasPrice: 1e11, //原為1e9
      accounts: [PRIVATE_KEY],
    },
    "thunder-mainnet": {
      url: "https://mainnet-rpc.thundercore.com",
      chainId: 108,
      gas: 90000000,
      gasPrice: 1e9,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    customChains: [
      {
        network: "chiado",
        chainId: 10200,
        urls: {
          //Blockscout
          apiURL: "https://blockscout.com/gnosis/chiado/api",
          browserURL: "https://blockscout.com/gnosis/chiado",
        },
      },
      {
        network: "gnosis",
        chainId: 100,
        urls: {
          // 3) Select to what explorer verify the contracts
          // Gnosisscan
          apiURL: "https://api.gnosisscan.io/api",
          browserURL: "https://gnosisscan.io/",
          // Blockscout
          //apiURL: "https://blockscout.com/xdai/mainnet/api",
          //browserURL: "https://blockscout.com/xdai/mainnet",
        },
      },
      {
        network: "thunder-testnet",
        chainId: 18,
        urls: {
          apiURL: "https://explorer-testnet.thundercore.com/api",
          browserURL: "https://explorer-testnet.thundercore.com",
        },
      },
    ],
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
      chiado: BLOCKSCOUT_API_KEY,
      gnosis: GNOSISSCAN_API_KEY,
      "thunder-testnet": "unused",
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    //gasPriceApi:
    //  "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  //solidity: "0.8.17",
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: { enabled: true, runs: 2 ** 32 - 1 },
        },
      },
      { version: "0.8.7" },
      { version: "0.6.6" },
      { version: "0.4.19" },
      { version: "0.6.12" },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
    player2: {
      default: 2,
    },
  },
  mocha: {
    timeout: 500000, //500 seconds
  },
  typechain: {
    outDir: "./typechain",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
};
