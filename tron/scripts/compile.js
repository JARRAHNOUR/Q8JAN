const fs = require("fs");
const path = require("path");
const solc = require("solc");

const CONTRACT_NAME = "Q8JAN";
const contractPath = path.join(__dirname, "../contracts/Q8JAN.sol");
const buildDir = path.join(__dirname, "../build");

function findImports(importPath) {
  const nodeModulesPath = path.join(__dirname, "../node_modules", importPath);

  if (fs.existsSync(nodeModulesPath)) {
    return {
      contents: fs.readFileSync(nodeModulesPath, "utf8"),
    };
  }

  return {
    error: `Import not found: ${importPath}`,
  };
}

function main() {
  console.log("Compiling Q8JAN...");

  if (!fs.existsSync(contractPath)) {
    throw new Error("Contract file not found: contracts/Q8JAN.sol");
  }

  const source = fs.readFileSync(contractPath, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      "Q8JAN.sol": {
        content: source,
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode", "evm.deployedBytecode", "metadata"],
        },
      },
    },
  };

  const output = JSON.parse(
    solc.compile(JSON.stringify(input), { import: findImports })
  );

  if (output.errors) {
    for (const error of output.errors) {
      console.log(error.formattedMessage);
    }

    const hasError = output.errors.some((error) => error.severity === "error");

    if (hasError) {
      process.exit(1);
    }
  }

  const contract = output.contracts?.["Q8JAN.sol"]?.[CONTRACT_NAME];

  if (!contract) {
    throw new Error("Compiled contract Q8JAN not found.");
  }

  fs.mkdirSync(buildDir, { recursive: true });

  fs.writeFileSync(
    path.join(buildDir, "Q8JAN.abi.json"),
    JSON.stringify(contract.abi, null, 2)
  );

  fs.writeFileSync(
    path.join(buildDir, "Q8JAN.bytecode.txt"),
    contract.evm.bytecode.object
  );

  fs.writeFileSync(
    path.join(buildDir, "Q8JAN.artifact.json"),
    JSON.stringify(contract, null, 2)
  );

  console.log("Q8JAN compiled successfully.");
  console.log("Artifacts written to tron/build/");
}

main();