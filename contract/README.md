# sBTC-Streamr Smart Contract 📜

## Overview

Clarity smart contract for multi-token streaming on Stacks blockchain.

---

## 📁 Structure

```
contract/
├── contracts/
│   └── stream.clar          # Main streaming contract
├── tests/
│   └── stream.test.ts       # Contract tests
├── deployments/
│   ├── default.simnet-plan.yaml    # Local devnet deployment
│   └── default.testnet-plan.yaml   # Testnet deployment
├── settings/
│   └── Testnet.toml         # Testnet configuration
├── Clarinet.toml            # Clarinet project config
├── package.json             # Node dependencies for testing
└── tsconfig.json            # TypeScript config
```

---

## 🚀 Quick Start

### Install Dependencies
```bash
cd contract
npm install
```

### Run Tests
```bash
npm test
```

### Deploy to Testnet
```bash
# Get testnet STX first from faucet
clarinet deployment apply -p deployments/default.testnet-plan.yaml
```

---

## 📊 Contract Functions

### Public Functions

#### `stream-to`
Create a new STX stream.

```clarity
(stream-to 
  (recipient principal)
  (initial-balance uint)
  (timeframe (tuple (start-block uint) (stop-block uint)))
  (payment-per-block uint)
)
```

#### `withdraw`
Withdraw accumulated tokens from a stream.

```clarity
(withdraw (stream-id uint))
```

#### `refuel`
Add more STX to an existing stream.

```clarity
(refuel (stream-id uint) (amount uint))
```

#### `refund`
Withdraw excess tokens after stream completion.

```clarity
(refund (stream-id uint))
```

#### `update-details`
Update stream parameters with cryptographic signature.

```clarity
(update-details
  (stream-id uint)
  (payment-per-block uint)
  (timeframe (tuple (start-block uint) (stop-block uint)))
  (signer principal)
  (signature (buff 65))
)
```

### Read-Only Functions

#### `balance-of`
Check available balance for a party in a stream.

```clarity
(balance-of (stream-id uint) (who principal))
```

#### `calculate-block-delta`
Calculate blocks elapsed in a stream.

```clarity
(calculate-block-delta (timeframe (tuple (start-block uint) (stop-block uint))))
```

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

**Tests cover:**
- Stream creation
- Refueling streams
- Withdrawing tokens
- Refunding excess
- Signature verification
- Authorization checks
- Error handling

---

## 🌐 Deployment

### Testnet Deployment

**Deployer Address:**
```
ST1PGECE9RYR303FHZ24BJVYY3MG63FC3NHBSR6X4
```

**Steps:**
1. Get testnet STX from faucet
2. Run deployment command
3. Verify on explorer

See `../TESTNET_DEPLOYMENT.md` for detailed instructions.

---

## 📝 Contract Details

- **Language:** Clarity 2
- **Epoch:** 2.4
- **Features:**
  - STX streaming
  - Time-based payments
  - Cryptographic updates
  - Refund mechanism
  - Signature verification

---

## 🔐 Security

- **Access Control:** Sender/recipient authorization
- **Signature Verification:** secp256k1 signatures
- **Error Handling:** Comprehensive error codes
- **Formal Verification:** Clarity's built-in safety

---

## 🎯 Future Enhancements

- [ ] Add `stream-token-to` for SIP-010 tokens
- [ ] Support sBTC streaming
- [ ] Custom token streaming
- [ ] Stream cancellation
- [ ] Pausable streams

---

**Built with ❤️ for Stacks Ascent Trailblazer Program**
