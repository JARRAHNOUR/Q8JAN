import { network } from "hardhat";

const { viem } = await network.connect();

const [deployer] = await viem.getWalletClients();

console.log("Deploying Q8JAN with account:", deployer.account.address);

const token = await viem.deployContract("Q8JAN", [
  deployer.account.address,
]);

console.log("Q8JAN deployed to:", token.address);