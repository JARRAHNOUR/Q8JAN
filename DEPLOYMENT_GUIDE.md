# Q8JAN Deployment Guide

## Overview

This guide describes the official deployment procedure for the Q8JAN smart contract on BNB Smart Chain Mainnet.

---

# Requirements

Before deployment, ensure the following:

- Node.js installed
- Hardhat installed
- MetaMask wallet
- BNB available for gas fees
- BscScan API Key
- Git repository synchronized

---

# Environment Variables

Configure your `.env` file:

```env
PRIVATE_KEY=
BNB_MAINNET_RPC_URL=
BSCSCAN_API_KEY=
INITIAL_OWNER=
```

---

# Compile Contract

```bash
npx hardhat compile
```

Expected result:

```
Compiled successfully.
```

---

# Run Tests

```bash
npx hardhat test
```

Expected result:

```
All tests passed.
```

---

# Deploy

```bash
npx hardhat run scripts/deploy-q8jan.ts --network bscMainnet
```

After deployment save:

- Contract Address
- Deployment Block
- Transaction Hash

---

# Verify Contract

```bash
npx hardhat run scripts/verify.ts --network bscMainnet
```

Expected result:

```
Contract verified successfully.
```

---

# Post Deployment

Verify:

- Token Name
- Symbol
- Decimals
- Total Supply
- Burn Function

---

# Publish

Update:

- Official Website
- GitHub
- Whitepaper
- Litepaper

with the official contract address.

---

# Liquidity

Create liquidity on PancakeSwap.

Recommended initial pair:

```
Q8JAN / BNB
```

---

# Security

Before announcing:

- Verify ownership
- Verify contract source code
- Double check token supply
- Backup deployment information

---

# Completed

When every step above is completed, Q8JAN is officially deployed.

© 2026 Q8JAN Project