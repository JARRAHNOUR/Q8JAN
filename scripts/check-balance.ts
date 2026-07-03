import { createPublicClient, http, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bscTestnet } from "viem/chains";
import "dotenv/config";

const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

const client = createPublicClient({
  chain: bscTestnet,
  transport: http(process.env.BNB_TESTNET_RPC_URL),
});

async function main() {
  const balance = await client.getBalance({
    address: account.address,
  });

  console.log("Wallet:", account.address);
  console.log("Balance:", formatEther(balance), "tBNB");
}

main().catch(console.error);