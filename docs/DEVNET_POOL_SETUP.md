# Devnet Pool Setup Guide

## Current Status

✅ **Fixed**: TypeScript compilation errors in `run_bot.ts`
✅ **Updated**: Now using Raydium SDK V2 for devnet support
✅ **Added**: Correct devnet program IDs from official documentation
⚠️ **Issue**: Need token accounts and test tokens to create pool

## Official Raydium Devnet Addresses

From the [official Raydium documentation](https://docs.raydium.io/):

**Programs:**

- CPMM (Constant Product): `DRaycpLY18LhpbydsBWbVJtxpNv9oXPgjRSfpF2bWpYb`
- Legacy AMM v4: `DRaya7Kj3aMWQSy19kSjvmuwq9docCHofyP9kanQGaav`

**Fee Accounts:**

- CPMM Create Pool Fee: `3oE58BKVt8KuYkGxx8zBojugnymWmBiyafWgMrnb6eYy`
- Legacy AMM v4 Create Pool Fee: `9y8ENuuZ3b19quffx9hQvRVygG5ky6snHfRvGpuSfeJy`

## Understanding the Problem

Raydium (and most DEXes) don't maintain liquidity pools on devnet. This is because:

- Devnet is for testing only
- Maintaining real pools costs resources
- Pools would need constant liquidity

## Solutions

### Option 1: Create Your Own CPMM Pool (Recommended for Testing)

We've created scripts to help you create a CPMM pool on devnet.

**Steps:**

1. **Get Devnet SOL:**

   ```bash
   solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet
   ```

2. **Setup token accounts:**

   ```bash
   cd app
   npx ts-node --project tsconfig.backend.json scripts/setup_token_accounts.ts
   ```

   This script will:

   - Create a WSOL (Wrapped SOL) token account
   - Fund it with SOL for the pool
   - Create a USDC devnet token account

3. **Get USDC Devnet tokens:**

   You have a few options:

   - Use a devnet USDC faucet (if available)
   - Create your own test token
   - Use a different token pair you already have

   **Alternative: Use your own test token:**

   ```bash
   # Create a new test token mint
   spl-token create-token --decimals 6 --url devnet

   # Create token account
   spl-token create-account <TOKEN_MINT> --url devnet

   # Mint tokens to yourself
   spl-token mint <TOKEN_MINT> 1000000 --url devnet

   # Update MINT_B in create_cpmm_pool.ts with your token mint
   ```

4. **Create the pool:**

   ```bash
   npx ts-node --project tsconfig.backend.json scripts/create_cpmm_pool.ts
   ```

5. **The script will:**
   - Initialize Raydium SDK V2 for devnet
   - Fetch token information
   - Create a CPMM pool with initial liquidity
   - Output the Pool ID for use in your bot

### Option 2: Use Mainnet (For Production Only)

⚠️ **Warning**: Only use mainnet when you're ready for production with real funds.

To switch to mainnet:

1. Update `NETWORK` in `run_bot.ts`:

   ```typescript
   const NETWORK: "mainnet" | "devnet" = "mainnet";
   ```

2. Update RPC URL in `.env`:

   ```
   RPC_URL=https://api.mainnet-beta.solana.com
   ```

3. Use mainnet token mints (real USDC, SOL, etc.)

### Option 3: Mock Pool for Unit Testing

For pure logic testing without blockchain interaction, you can create mock pool data:

```typescript
const mockPoolKeys: LiquidityPoolKeys = {
  id: new PublicKey("MockPoolId..."),
  // ... other fields
};
```

## Important Notes

### About CPMM vs AMM V4

Your smart contract (`programs/trading-bot/src/lib.rs`) is designed for **Raydium AMM V4** pools, which:

- Use the classic constant product formula (x \* y = k)
- Integrate with Serum/OpenBook DEX
- Have specific account structure (openOrders, targetOrders, etc.)

**CPMM pools** are newer and:

- Don't require Serum market accounts
- Simpler structure
- Only available via SDK V2

### Compatibility Issue

There may be compatibility issues between:

1. Your Rust smart contract (expects AMM V4 accounts)
2. CPMM pools on devnet (different structure)

**Solutions:**

1. **Update your smart contract** to support CPMM pools
2. **Use mainnet** where AMM V4 pools exist
3. **Create a mock/test pool** structure for devnet testing
4. **Modify the bot logic** to detect pool type and use appropriate CPI calls

## Next Steps

### For Development/Testing:

1. ✅ Fix TypeScript errors (DONE)
2. ✅ Install Raydium SDK V2 (DONE)
3. ⏳ **Create a devnet CPMM pool** (use `create_cpmm_pool.ts`)
4. ⏳ Test the bot with the created pool
5. ⏳ Handle any compatibility issues between your contract and CPMM

### For Production:

1. Test thoroughly on devnet
2. Audit your smart contract
3. Switch to mainnet
4. Use real AMM V4 pools with actual liquidity
5. Implement proper error handling and monitoring

## Troubleshooting

### "No pools found on devnet"

- Expected behavior - you need to create one

### "Insufficient balance"

- Get devnet SOL: `solana airdrop 2 --url devnet`

### "Pool creation failed"

- Check you have enough tokens in your wallet
- Verify token accounts exist
- Check RPC connection

### "Smart contract CPI failed"

- Your contract expects AMM V4, but CPMM has different structure
- You may need to update your contract or use mainnet

## Resources

- [Raydium SDK V2 Documentation](https://github.com/raydium-io/raydium-sdk-V2)
- [Raydium SDK V2 Demo](https://github.com/raydium-io/raydium-sdk-V2-demo)
- [Solana Devnet Faucet](https://faucet.solana.com/)

## Files Modified

- ✅ `app/scripts/run_bot.ts` - Fixed TypeScript errors, using SDK V2
- ✅ `app/package.json` - Added Raydium SDK V2
- ✅ `app/scripts/create_cpmm_pool.ts` - New script to create pools on devnet
