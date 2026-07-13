const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const COMPILER = path.join(ROOT, "compiler", "tron-solc-0.8.27.exe");
const CONTRACT_PATH = path.join(ROOT, "contracts", "Q8JAN.sol");
const BUILD_DIR = path.join(ROOT, "build");
const CONTRACT_NAME = "Q8JAN";

function main() {
  console.log("Compiling Q8JAN with official TRON solc 0.8.27...");

  if (!fs.existsSync(COMPILER)) {
    throw new Error("TRON compiler not found: " + COMPILER);
  }

  if (!fs.existsSync(CONTRACT_PATH)) {
    throw new Error("Contract not found: " + CONTRACT_PATH);
  }

  const args = [
    "--base-path",
    ROOT,
    "--include-path",
    path.join(ROOT, "node_modules"),
    "--optimize",
    "--optimize-runs",
    "200",
    "--combined-json",
    "abi,bin,bin-runtime,metadata",
    CONTRACT_PATH,
  ];

  const stdout = execFileSync(COMPILER, args, {
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
  });

  const output = JSON.parse(stdout);
  const contractKey = Object.keys(output.contracts).find(
    (key) => key.endsWith(`:${CONTRACT_NAME}`)
  );

  if (!contractKey) {
    throw new Error("Compiled Q8JAN contract was not found.");
  }

  const contract = output.contracts[contractKey];
  const abi =
    typeof contract.abi === "string"
      ? JSON.parse(contract.abi)
      : contract.abi;

  const artifact = {
    contractName: CONTRACT_NAME,
    sourceName: contractKey.split(":")[0],
    abi,
    evm: {
      bytecode: {
        object: contract.bin,
      },
      deployedBytecode: {
        object: contract["bin-runtime"],
      },
    },
    metadata: contract.metadata,
  };

  fs.mkdirSync(BUILD_DIR, { recursive: true });

  fs.writeFileSync(
    path.join(BUILD_DIR, "Q8JAN.abi.json"),
    JSON.stringify(abi, null, 2)
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, "Q8JAN.bytecode.txt"),
    contract.bin
  );

  fs.writeFileSync(
    path.join(BUILD_DIR, "Q8JAN.artifact.json"),
    JSON.stringify(artifact, null, 2)
  );

  console.log("Q8JAN compiled successfully.");
  console.log("Compiler: TRON solc 0.8.27");
  console.log("Optimizer: enabled");
  console.log("Runs: 200");
  console.log("Artifacts written to tron/build/");
}

main();
