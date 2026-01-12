import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import dotenv from "dotenv";

dotenv.config();

const TARGET_USER = new PublicKey(process.env.WALLET_PUBLIC_KEY!);
const MINT_A = new PublicKey("So11111111111111111111111111111111111111112"); // WSOL
const MINT_B = new PublicKey("BnXom78n7K3PHxwK4FzWpgCguzSmEduv5ZqCVCUJzrKt"); // Test Token

async function checkBalances() {
  const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com");
  
  console.log("💰 Verificando Saldos...\n");
  console.log(`Wallet: ${TARGET_USER.toBase58()}\n`);

  // Check SOL balance
  const solBalance = await connection.getBalance(TARGET_USER);
  console.log(`SOL Balance: ${solBalance / 1e9} SOL`);

  // Check WSOL token account
  const wsolATA = await getAssociatedTokenAddress(MINT_A, TARGET_USER);
  console.log(`\nWSOL Token Account: ${wsolATA.toBase58()}`);
  
  try {
    const wsolBalance = await connection.getTokenAccountBalance(wsolATA);
    console.log(`  ✅ Exists`);
    console.log(`  Balance: ${wsolBalance.value.uiAmount} WSOL`);
    console.log(`  Raw: ${wsolBalance.value.amount} lamports`);
  } catch (e) {
    console.log(`  ❌ Account doesn't exist or has no balance`);
  }

  // Check Test Token account
  const testTokenATA = await getAssociatedTokenAddress(MINT_B, TARGET_USER);
  console.log(`\nTest Token Account: ${testTokenATA.toBase58()}`);
  
  try {
    const testBalance = await connection.getTokenAccountBalance(testTokenATA);
    console.log(`  ✅ Exists`);
    console.log(`  Balance: ${testBalance.value.uiAmount} tokens`);
    console.log(`  Raw: ${testBalance.value.amount}`);
  } catch (e) {
    console.log(`  ❌ Account doesn't exist or has no balance`);
  }

  console.log("\n💡 Recomendações:");
  
  if (solBalance < 1e9) {
    console.log("⚠️  SOL baixo - Execute: solana airdrop 1 --url devnet");
  }
  
  console.log("\n💡 Para testar o swap, você precisa:");
  console.log("  - WSOL token account com saldo");
  console.log("  - Test Token account criado (pode estar vazio para receber)");
}

checkBalances().catch(console.error);

