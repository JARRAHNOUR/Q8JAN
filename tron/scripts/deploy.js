const fs = require("fs");
const path = require("path");
const { TronWeb } = require("tronweb");
require("dotenv").config();

const DEFAULT_NETWORK = "https://api.trongrid.io";
const BUILD_DIR = path.join(__dirname, "../build");
const ABI_PATH = path.join(BUILD_DIR, "Q8JAN.abi.json");
const BYTECODE_PATH = path.join(BUILD_DIR, "Q8JAN.bytecode.txt");
const DEPLOYMENT_PATH = path.join(BUILD_DIR, "deployment.json");

async function main() {
  const privateKey = process.env.TRON_PRIVATE_KEY;
  const fullHost = process.env.TRON_FULL_HOST || DEFAULT_NETWORK;
  const isDryRun =
    process.argv.includes("--check") ||
    process.argv.includes("--dry-run") ||
    process.env.DEPLOY_DRY_RUN === "true";

  console.log("Q8JAN TRON deployment");
  console.log("Network:", fullHost);
  console.log("Mode:", isDryRun ? "CHECK ONLY" : "LIVE DEPLOY");

  if (!fs.existsSync(ABI_PATH) || !fs.existsSync(BYTECODE_PATH)) {
    throw new Error("Missing build files. Run: npm run compile");
  }

  const abi = JSON.parse(fs.readFileSync(ABI_PATH, "utf8"));
  const bytecode = fs.readFileSync(BYTECODE_PATH, "utf8").trim();

  if (!Array.isArray(abi) || abi.length === 0 || !bytecode) {
    throw new Error("Invalid ABI or bytecode.");
  }

  console.log("Build files: OK");

  if (!privateKey) {
    console.log("TRON_PRIVATE_KEY is not set.");
    console.log("Add it to .env before live deployment.");
    return;
  }

  const tronWeb = new TronWeb({
    fullHost,
    privateKey,
  });

  const deployer = tronWeb.defaultAddress.base58;
  const balanceSun = await tronWeb.trx.getBalance(deployer);
  const balanceTrx = Number(tronWeb.fromSun(balanceSun));

  console.log("Deployer:", deployer);
  console.log("TRX Balance:", balanceTrx);

  if (balanceTrx <= 0) {
    console.log("Wallet has 0 TRX. Deployment cannot continue.");
    return;
  }

  if (isDryRun) {
    console.log("Deployment check passed. No contract was deployed.");
    return;
  }

  console.log("Deploying Q8JAN contract...");

  const contract = await tronWeb.contract().new({
    abi,
    bytecode,
    feeLimit: 1_000_000_000,
    callValue: 0,
    userFeePercentage: 100,
    originEnergyLimit: 10_000_000,
  });

  const deployment = {
    project: "Q8JAN",
    standard: "TRC-20",
    network: fullHost,
    deployer,
    contractAddress: contract.address,
    deployedAt: new Date().toISOString(),
  };

  fs.writeFileSync(DEPLOYMENT_PATH, JSON.stringify(deployment, null, 2));

  console.log("Q8JAN deployed successfully.");
  console.log("Contract Address:", contract.address);
  console.log("Deployment saved to tron/build/deployment.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});