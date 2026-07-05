const fs = require("fs");
const path = require("path");
const { TronWeb } = require("tronweb");
require("dotenv").config();

async function main() {
  const privateKey = process.env.TRON_PRIVATE_KEY;
  const fullHost = process.env.TRON_FULL_HOST || "https://api.shasta.trongrid.io";

  if (!privateKey) {
    console.log("TRON_PRIVATE_KEY is not set.");
    console.log("Deployment is disabled until wallet funding is available.");
    return;
  }

  const tronWeb = new TronWeb({
    fullHost,
    privateKey,
  });

  const deployer = tronWeb.defaultAddress.base58;
  const balance = await tronWeb.trx.getBalance(deployer);

  console.log("Q8JAN TRON deployment");
  console.log("Network:", fullHost);
  console.log("Deployer:", deployer);
  console.log("TRX Balance:", tronWeb.fromSun(balance));

  const abiPath = path.join(__dirname, "../build/Q8JAN.abi.json");
  const bytecodePath = path.join(__dirname, "../build/Q8JAN.bytecode.txt");

  if (!fs.existsSync(abiPath) || !fs.existsSync(bytecodePath)) {
    throw new Error("Missing build files. Run: npm run compile");
  }

  const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const bytecode = fs.readFileSync(bytecodePath, "utf8");

  if (!abi.length || !bytecode) {
    throw new Error("Invalid ABI or bytecode.");
  }

  console.log("Build files loaded successfully.");
  console.log("Ready for deployment when TRX is available.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});