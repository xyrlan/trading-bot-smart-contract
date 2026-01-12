import { Connection, PublicKey } from "@solana/web3.js";
import { Liquidity } from "@raydium-io/raydium-sdk";
import dotenv from "dotenv";

dotenv.config();

const POOL_ID = new PublicKey("41ApS8BGaPVNJs6RciosYtGkzcCh9HnBoSBeBKiMFc1m");
const CPMM_PROGRAM = new PublicKey("DRaycpLY18LhpbydsBWbVJtxpNv9oXPgjRSfpF2bWpYb");

async function fetchCpmmPoolAccounts() {
  const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com");
  
  console.log("🔍 Buscando contas do Pool CPMM...\n");
  console.log(`Pool ID: ${POOL_ID.toBase58()}`);
  console.log(`Program: ${CPMM_PROGRAM.toBase58()}\n`);

  try {
    // Get pool account data
    const accountInfo = await connection.getAccountInfo(POOL_ID);
    
    if (!accountInfo) {
      console.log("❌ Pool account não encontrado");
      return;
    }

    console.log(`✅ Pool account encontrado (${accountInfo.data.length} bytes)\n`);

    // Try to decode as CPMM pool (we'll need to check the layout)
    // For now, let's just show the raw data structure
    console.log("📋 Account Info:");
    console.log(`   Owner: ${accountInfo.owner.toBase58()}`);
    console.log(`   Lamports: ${accountInfo.lamports}`);
    console.log(`   Data length: ${accountInfo.data.length} bytes`);
    console.log(`   Executable: ${accountInfo.executable}`);
    console.log(`   Rent Epoch: ${accountInfo.rentEpoch}\n`);

    // Try to derive the pool authority (usually a PDA)
    const [poolAuthority, bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("vault_and_lp_mint_auth_seed"),
        POOL_ID.toBuffer(),
      ],
      CPMM_PROGRAM
    );

    console.log("🔑 Derived Pool Authority (PDA):");
    console.log(`   Address: ${poolAuthority.toBase58()}`);
    console.log(`   Bump: ${bump}\n`);

    // The pool data should contain the vault addresses
    // Let's parse the first few PublicKeys from the data
    console.log("📦 Parsing pool data structure...");
    
    const data = accountInfo.data;
    
    // Skip discriminator (8 bytes) and try to read PublicKeys
    // This is a rough estimate - actual layout may vary
    const offset = 8;
    
    console.log("\n🔍 Possible PublicKeys in pool data:");
    for (let i = 0; i < 10; i++) {
      const start = offset + (i * 32);
      if (start + 32 <= data.length) {
        try {
          const pubkey = new PublicKey(data.slice(start, start + 32));
          console.log(`   [${i}] ${pubkey.toBase58()}`);
        } catch (e) {
          // Invalid pubkey
        }
      }
    }

    // Known addresses from the API
    console.log("\n📋 Known addresses from API:");
    console.log(`   LP Mint: 3W3WLnLoNM9wd6RHSKwxirxZR4HBXkc1yZ7z5sU25VNo`);
    console.log(`   Mint A (dwSOL): So11111111111111111111111111111111111111112`);
    console.log(`   Mint B (Test): BnXom78n7K3PHxwK4FzWpgCguzSmEduv5ZqCVCUJzrKt`);
    
    console.log("\n💡 Para encontrar os vaults, podemos derivar os ATAs:");
    console.log("   Vault A = getAssociatedTokenAddress(mintA, poolAuthority)");
    console.log("   Vault B = getAssociatedTokenAddress(mintB, poolAuthority)");

  } catch (error) {
    console.error("❌ Erro:", error);
  }
}

fetchCpmmPoolAccounts().catch(console.error);

