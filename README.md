# Antugrow - Reputation Based DeFi Lending Protocol for Farmers

## Overview
A DeFi protocol for secure lending to unbanked farmers, collateralized by their farms as Real World Assets. 

The platform digitizes farm records into Verifiable Credentials ("Badges") for credit scoring and lending decisions.

Through Antugrow, farmers are supported to uphold best practices for maximum yields while Investors get access to a trusted path for deployment of investment.

## Features
The solution features the Antugrow Farmer's mobile app for secure management of farm data (SSI), and an investment module for channeling crypto liquidity and conversion of the same to fiat (M-PESA). General features include:

- **Verifiable Credentials**: Farmers can receive credentials that validate their activities and achievements based on the W3C VC open standard.
- **Privado ID Integration**: Utilizes Privado ID SDK to store and verify credentials while maintaining data privacy through Zero Knowledge Proofs.
- **User-Friendly Interface**: Simple interface for farmers to manage their credentials.
- **OnchainKit by BASE**: Toolkit to manage the investment module and Smart Contracts deployment via BASE.
- **Web3JS**: JS functionality used for Paymaster integration with OnchainKit.

## Quick Start


### Prerequisites
- **Node.js**: Version 20 or higher
- **yarn** or **npm**: Node Package Manager

To get started, follow the following steps:

1. **Backend**
```bash
cd backend
```

```bash
npm i
```

**Set up Env Variables**: Create a .env file in the root directory and add the following
```plaintext
MONGODB_URI=yourdburi
JWT_SECRET=yourwtsecret
```

**Run**: Start development build locally
```bash
npm run start:dev
```

2. Client

```bash
cd client
```

**Install Dependencies**
```bash
npm i
```

**Set up Env Variables**: Create a .env file in the root directory and add the following
```plaintext
API_URL=http://localhost:4093/api
```

**Run**
```bash
npm run dev
```

**Access the running application**: Your access the application at http://localhost:5193 on your browser

3. Investor UI

**Access the directory**

```bash
cd investor-ui
```

**Install Dependencies**
```bash
npm i
```

**Set up Env Variables**: Create a .env file in the root directory and add the following
```plaintext
API_URL=http://localhost:4093/api
PAYMASTER_ENDPOINT=yourpaymasterendpoint
ONCHAINKIT_API_KEY=your-onchainkit-api-key
```

**Run**
```bash
npm run dev
```

**Access the running application**: Your access the application at http://localhost:5194 on your browser

