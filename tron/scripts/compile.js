const fs = require("fs");
const path = require("path");
const solc = require("solc");

const contractPath = path.join(__dirname, "../contracts/Q8JAN.sol");
const source = fs.readFileSync(contractPath, "utf8");

function findImports(importPath) {
  try {
    const fullPath = path.join(__dirname, "../node_modules", importPath);
    return { contents: fs.readFileSync(fullPath, "utf8") };
  } catch (error) {
    return { error: "File not found: " + importPath };
  }
}

const input = {
  language: "Solidity",
  sources: {
    "Q8JAN.sol": {
      content: source
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode", "evm.deployedBytecode"]
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  for (const error of output.errors) {
    console.log(error.formattedMessage);
  }

  const hasError = output.errors.some((error) => error.severity === "error");
  if (hasError) {
    process.exit(1);
  }
}

const contract = output.contracts["Q8JAN.sol"]["Q8JAN"];

const buildDir = path.join(__dirname, "../build");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir);
}

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