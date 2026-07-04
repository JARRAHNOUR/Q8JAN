import { verifyContract } from "@nomicfoundation/hardhat-verify/verify";
import hre from "hardhat";
import "dotenv/config";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const initialOwner = process.env.INITIAL_OWNER;

  if (!contractAddress) {
    throw new Error("Missing CONTRACT_ADDRESS in .env");
  }

  if (!initialOwner) {
    throw new Error("Missing INITIAL_OWNER in .env");
  }

  await verifyContract(
    {
      address: contractAddress,
      constructorArgs: [initialOwner],
    },
    hre
  );

  console.log("Q8JAN contract verified successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});