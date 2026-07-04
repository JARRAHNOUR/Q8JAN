import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import { defineConfig } from "hardhat/config";
import "dotenv/config";

export default defineConfig({
  plugins: [
    hardhatToolboxViemPlugin,
    hardhatVerify,
  ],

  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },

  networks: {
    bscTestnet: {
      type: "http",
      url: process.env.BNB_TESTNET_RPC_URL!,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 97,
    },

    bscMainnet: {
      type: "http",
      url: process.env.BNB_MAINNET_RPC_URL!,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 56,
    },
  },

  verify: {
    etherscan: {
      apiKey: process.env.BSCSCAN_API_KEY,
    },
  },
});