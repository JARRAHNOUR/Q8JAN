const fs = require("fs");
const path = require("path");

const DEPLOYMENT_PATH = path.join(__dirname, "../build/deployment.json");

function main() {
  console.log("Q8JAN TRON verification");

  if (!fs.existsSync(DEPLOYMENT_PATH)) {
    console.log("No deployment file found yet.");
    console.log("Deploy the contract first, then run: npm run verify");
    return;
  }

  const deployment = JSON.parse(fs.readFileSync(DEPLOYMENT_PATH, "utf8"));

  console.log("Project:", deployment.project);
  console.log("Standard:", deployment.standard);
  console.log("Network:", deployment.network);
  console.log("Deployer:", deployment.deployer);
  console.log("Contract Address:", deployment.contractAddress);
  console.log("Deployed At:", deployment.deployedAt);

  console.log("");
  console.log("Next step:");
  console.log("Use the contract address above to verify/publish the contract on TRON explorer after deployment.");
}

main();