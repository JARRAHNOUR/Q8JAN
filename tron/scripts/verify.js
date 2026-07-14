const fs = require("fs");
const path = require("path");

const DEPLOYMENT_PATH = path.join(
  __dirname,
  "../build/deployment.json"
);

function main() {
  if (!fs.existsSync(DEPLOYMENT_PATH)) {
    throw new Error(
      "Deployment file not found. Run deployment first."
    );
  }

  const deployment = JSON.parse(
    fs.readFileSync(DEPLOYMENT_PATH, "utf8")
  );

  const contractAddressHex =
    deployment.contractAddressHex ||
    deployment.contractAddress;

  const contractAddressBase58 =
    deployment.contractAddressBase58 || "Not available";

  console.log("Q8JAN TRON verification");
  console.log("Project:", deployment.project);
  console.log("Standard:", deployment.standard);
  console.log("Network:", deployment.network);
  console.log("Deployer:", deployment.deployer);
  console.log("Contract Address Hex:", contractAddressHex);
  console.log(
    "Contract Address Base58:",
    contractAddressBase58
  );
  console.log("Deployed At:", deployment.deployedAt);

  console.log("");
  console.log("Verification status:");
  console.log(
    "Use the Base58 address on TronScan and in public links."
  );
}

try {
  main();
} catch (error) {
  console.error("Verification failed:", error.message);
  process.exitCode = 1;
}
