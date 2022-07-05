import dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter"; // https://www.npmjs.com/package/hardhat-gas-reporter
import "@nomiclabs/hardhat-etherscan"; // https://www.npmjs.com/package/@nomiclabs/hardhat-etherscan
import "hardhat-dependency-compiler"; // https://www.npmjs.com/package/hardhat-dependency-compiler
import "solidity-coverage"; // https://www.npmjs.com/package/solidity-coverage
import "hardhat-storage-layout"; // https://www.npmjs.com/package/hardhat-storage-layout

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: process.env.COMPILE_VERSION || "0.8.4",
    settings: {
      optimizer: {
        enabled: process.env.OPTIMIZER == "true",
        runs: process.env.OPTIMIZER_RUNS || 200,
      },
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      }  
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS == "true"
  },
  defaultNetwork: process.env.DEFAULT_NETWORK || "hardhat",
  networks: {
    rinkeby: {
      url: process.env.ROPSTEN_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  dependencyCompiler: { // add your dependencies here
    paths: [
      "@openzeppelin/contracts/token/ERC721/ERC721.sol",
      "@openzeppelin/contracts/utils/Strings.sol"
    ],
  }
};

export default config;
