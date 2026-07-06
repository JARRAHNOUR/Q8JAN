# Q8JAN TRON

## Overview

Q8JAN is a fixed-supply TRC-20 digital asset built for deployment on the TRON blockchain.

The project is designed with a simple launch philosophy:

> A transparent, fixed-supply token with no minting, no transaction tax, and burn support.

---

## Network

| Item | Value |
|------|-------|
| Blockchain | TRON |
| Token Standard | TRC-20 |
| Launch Strategy | TRON-only |
| Initial Trading Pair | Q8JAN / TRX |

---

## Token Information

| Property | Value |
|----------|-------|
| Name | Q8JAN |
| Symbol | Q8JAN |
| Decimals | 18 |
| Total Supply | 100,000,000,000 Q8JAN |
| Minting | Disabled Forever |
| Burn | Enabled |
| Transaction Tax | 0% |

---

## Token Allocation

| Allocation | Percentage |
|------------|-----------:|
| Founder & Treasury | 50% |
| Liquidity | 30% |
| Marketing | 10% |
| Reserve | 10% |

---

## Project Structure

```text
tron/
├── build/
├── config/
├── contracts/
│   └── Q8JAN.sol
├── docs/
│   ├── WHITEPAPER.md
│   └── TOKENOMICS.md
├── node_modules/
├── scripts/
│   ├── compile.js
│   ├── deploy.js
│   └── verify.js
├── website/
├── .env
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

---

## Smart Contract Features

- Fixed supply
- No minting function
- Burnable token
- No transaction tax
- Open-source smart contract
- ERC20-compatible implementation for TRON deployment

---

## Requirements

- Node.js 20+
- npm
- TRON wallet
- TRX for deployment fees

---

## Installation

Install dependencies:

```bash
npm install
```

Compile the smart contract:

```bash
npm run compile
```

---

## Environment

Create a `.env` file using `.env.example`.

Example:

```env
TRON_PRIVATE_KEY=
TRON_FULL_HOST=https://api.trongrid.io
```

---

## Deployment

Deploy to the configured TRON network:

```bash
npm run deploy
```

---

## Verification

After deployment:

```bash
npm run verify
```

---

## Current Status

| Component | Status |
|-----------|--------|
| Smart Contract | ✅ Complete |
| Build System | ✅ Complete |
| Deployment Script | ✅ Ready |
| Verification Script | ✅ Ready |
| Documentation | ✅ In Progress |
| Website | ✅ In Progress |
| Mainnet Deployment | ⏳ Waiting for TRX |
| Liquidity | ⏳ Pending |
| Public Trading | ⏳ Pending |

---

## Repository

https://github.com/JARRAHNOUR/Q8JAN

---

## License

MIT License

---

© 2026 Q8JAN Project. All rights reserved.