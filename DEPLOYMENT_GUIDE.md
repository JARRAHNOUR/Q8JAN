# Q8JAN Deployment Guide

Version 1.0

---

# Overview

This document describes the official deployment procedure for the Q8JAN smart contract on the BNB Smart Chain Mainnet.

Following this guide helps ensure a consistent, secure, and verifiable deployment process.

---

# Prerequisites

Before deployment, ensure the following requirements are met:

* Node.js installed
* Hardhat environment configured
* Project dependencies installed
* MetaMask wallet configured
* Sufficient BNB available for gas fees
* BNB Smart Chain RPC endpoint configured
* BscScan API Key available
* GitHub repository synchronized

---

# Environment Configuration

Configure the `.env` file before deployment.

```env
PRIVATE_KEY=
BNB_MAINNET_RPC_URL=
BSCSCAN_API_KEY=
INITIAL_OWNER=
```

Never share or publish your private key.

---

# Step 1 — Install Dependencies

If required, install project dependencies.

```bash
npm install
```

---

# Step 2 — Compile the Smart Contract

Compile the project.

```bash
npx hardhat compile
```

Expected result:

```
Compiled successfully.
```

---

# Step 3 — Execute Test Suite

Run all available tests.

```bash
npx hardhat test
```

Expected result:

```
All tests passed.
```

Deployment should not proceed unless every test passes successfully.

---

# Step 4 — Deploy the Smart Contract

Deploy Q8JAN to BNB Smart Chain Mainnet.

```bash
npx hardhat run scripts/deploy-q8jan.ts --network bscMainnet
```

After deployment, securely record:

* Contract Address
* Transaction Hash
* Deployment Block Number
* Deployment Wallet

---

# Step 5 — Verify the Contract

Verify the source code on BscScan.

```bash
npx hardhat run scripts/verify.ts --network bscMainnet
```

Expected result:

```
Contract verified successfully.
```

---

# Step 6 — Validate Token Information

Verify that all on-chain information matches the official documentation.

Confirm:

* Token Name
* Token Symbol
* Decimals
* Total Supply
* Burn Function
* Owner Address

---

# Step 7 — Publish Official Information

After successful verification, update the following resources:

* Official Website
* GitHub Repository
* Whitepaper
* Tokenomics Documentation
* Roadmap Documentation

Publish the official smart contract address in all locations.

---

# Step 8 — Add Initial Liquidity

Create the initial liquidity pool.

Recommended trading pair:

```
Q8JAN / BNB
```

Verify that liquidity has been added successfully before public announcement.

---

# Step 9 — Final Security Review

Before launch, verify:

* Contract ownership
* Verified source code
* Token supply
* Contract address
* Deployment records
* Backup of deployment information

---

# Deployment Complete

When all steps have been completed successfully, the Q8JAN smart contract is considered officially deployed and ready for public use.

---

# Contact

Email

[q8janproject@gmail.com](mailto:q8janproject@gmail.com)

GitHub

https://github.com/JARRAHNOUR/Q8JAN

---

© 2026 Q8JAN

All Rights Reserved.
