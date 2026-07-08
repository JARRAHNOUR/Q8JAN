# Q8JAN Deployment Guide

Version 1.0

---

# Overview

This document describes the official deployment procedure for the Q8JAN smart contract on the TRON Mainnet.

Following this guide helps ensure a secure, transparent, and verifiable deployment process.

---

# Prerequisites

Before deployment, ensure the following requirements are met:

- Node.js installed
- TronWeb installed
- Project dependencies installed
- TronLink wallet configured
- Sufficient TRX available for deployment fees
- TRON Mainnet RPC configured
- GitHub repository synchronized

---

# Environment Configuration

Configure the `.env` file before deployment.

```env
TRON_PRIVATE_KEY=
TRON_FULL_HOST=https://api.trongrid.io
```

Never share or publish your private key.

---

# Step 1 — Install Dependencies

Install project dependencies.

```bash
npm install
```

---

# Step 2 — Compile the Smart Contract

Compile the project.

```bash
npm run compile
```

Expected result:

```text
Build files generated successfully.
```

---

# Step 3 — Verify Build

Confirm that the following files exist inside the `build` directory:

- Q8JAN.abi.json
- Q8JAN.bytecode.txt
- Q8JAN.artifact.json

Deployment should not proceed unless all build files are successfully generated.

---

# Step 4 — Verify Deployment Wallet

Confirm that the deployment wallet:

- Is the intended deployment wallet.
- Contains sufficient TRX.
- Is connected to TRON Mainnet.

You may verify readiness using:

```bash
npm run deploy:check
```

---

# Step 5 — Deploy the Smart Contract

Deploy Q8JAN to TRON Mainnet.

```bash
npm run deploy
```

After deployment, securely record:

- Contract Address
- Transaction Hash
- Deployment Wallet

---

# Step 6 — Verify the Contract

Verify the deployed contract on TronScan.

Confirm that:

- Source code matches the deployed bytecode.
- Contract information is publicly visible.
- Token information is correct.

---

# Step 7 — Validate Token Information

Verify the following:

- Token Name
- Token Symbol
- Decimals
- Total Supply
- Burn Function
- Transaction Tax (0%)

---

# Step 8 — Publish Official Information

Update:

- Official Website
- GitHub Repository
- Whitepaper
- Documentation

Publish the official smart contract address across all official resources.

---

# Step 9 — Add Initial Liquidity

Create the initial liquidity pool.

Recommended trading pair:

```text
Q8JAN / TRX
```

Verify that liquidity is active before announcing the public launch.

---

# Step 10 — Final Security Review

Before launch, verify:

- Contract Address
- TronScan Verification
- Token Supply
- Liquidity Pool
- Deployment Records
- Website Information
- GitHub Repository

---

# Deployment Complete

When all steps have been completed successfully, the Q8JAN smart contract is considered officially deployed and ready for public use.

---

# Official Contact

**Email**

q8janproject@gmail.com

**GitHub**

https://github.com/JARRAHNOUR/Q8JAN

---

© 2026 Q8JAN

Released under the MIT License.