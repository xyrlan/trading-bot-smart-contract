import { 
  Connection, 
  Keypair, 
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { 
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  NATIVE_MINT,
  getOrCreateAssociatedTokenAccount,
  createSyncNativeInstruction,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

// Mints para Teste (WSOL / USDC Devnet)
const MINT_A = NATIVE_MINT; // WSOL
const MINT_B = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"); // USDC-Devnet

async function setupTokenAccounts() {
  console.log("🔧 Configurando Token Accounts...\n");

  const connection = new Connection(
    process.env.RPC_URL || "https://api.devnet.solana.com",
    "confirmed"
  );
  
  const privKey = process.env.BACKEND_PRIVATE_KEY;
  if (!privKey) throw new Error("BACKEND_PRIVATE_KEY não encontrada no .env");

  const ownerKeypair = privKey.includes("[") 
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privKey)))
    : Keypair.fromSecretKey(bs58.decode(privKey));

  console.log(`👤 Owner: ${ownerKeypair.publicKey.toBase58()}`);
  
  // Verificar saldo
  const balance = await connection.getBalance(ownerKeypair.publicKey);
  console.log(`💰 SOL Balance: ${balance / 1e9} SOL\n`);
  
  if (balance < 2e9) {
    console.log("⚠️  Saldo baixo! Recomendado ter pelo menos 2 SOL");
    console.log("💡 Execute: solana airdrop 2 " + ownerKeypair.publicKey.toBase58() + " --url devnet\n");
  }

  try {
    // 1. Setup WSOL (Wrapped SOL)
    console.log("1️⃣  Configurando Wrapped SOL (WSOL)...");
    
    const wsolAmount = 1.5e9; // 1.5 SOL worth of WSOL for the pool
    const wsolATA = await getAssociatedTokenAddress(
      NATIVE_MINT,
      ownerKeypair.publicKey
    );
    
    console.log(`   ATA Address: ${wsolATA.toBase58()}`);
    
    // Check if account exists
    const wsolAccountInfo = await connection.getAccountInfo(wsolATA);
    
    if (!wsolAccountInfo) {
      console.log("   ➡️  Criando WSOL token account...");
      
      const transaction = new Transaction();
      
      // Create associated token account
      transaction.add(
        createAssociatedTokenAccountInstruction(
          ownerKeypair.publicKey,
          wsolATA,
          ownerKeypair.publicKey,
          NATIVE_MINT
        )
      );
      
      // Transfer SOL to the token account
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: ownerKeypair.publicKey,
          toPubkey: wsolATA,
          lamports: wsolAmount,
        })
      );
      
      // Sync native (wrap the SOL)
      transaction.add(
        createSyncNativeInstruction(wsolATA)
      );
      
      const signature = await connection.sendTransaction(transaction, [ownerKeypair]);
      await connection.confirmTransaction(signature);
      
      console.log(`   ✅ WSOL account criada e financiada com ${wsolAmount / 1e9} SOL`);
      console.log(`   🔗 TX: https://explorer.solana.com/tx/${signature}?cluster=devnet\n`);
    } else {
      console.log("   ✅ WSOL account já existe");
      
      // Check balance
      const tokenAccountBalance = await connection.getTokenAccountBalance(wsolATA);
      console.log(`   💰 Balance: ${tokenAccountBalance.value.uiAmount} WSOL\n`);
      
      if (parseFloat(tokenAccountBalance.value.amount) < wsolAmount) {
        console.log("   ➡️  Adicionando mais WSOL...");
        const transaction = new Transaction();
        
        // Transfer SOL to the token account
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: ownerKeypair.publicKey,
            toPubkey: wsolATA,
            lamports: wsolAmount - parseFloat(tokenAccountBalance.value.amount),
          })
        );
        
        // Sync native (wrap the SOL)
        transaction.add(
          createSyncNativeInstruction(wsolATA)
        );
        
        const signature = await connection.sendTransaction(transaction, [ownerKeypair]);
        await connection.confirmTransaction(signature);
        
        console.log(`   ✅ WSOL adicionado`);
        console.log(`   🔗 TX: https://explorer.solana.com/tx/${signature}?cluster=devnet\n`);
      }
    }

    // 2. Setup USDC (or create account)
    console.log("2️⃣  Configurando USDC Devnet...");
    
    const usdcATA = await getAssociatedTokenAddress(
      MINT_B,
      ownerKeypair.publicKey
    );
    
    console.log(`   ATA Address: ${usdcATA.toBase58()}`);
    
    const usdcAccountInfo = await connection.getAccountInfo(usdcATA);
    
    if (!usdcAccountInfo) {
      console.log("   ➡️  Criando USDC token account...");
      
      const account = await getOrCreateAssociatedTokenAccount(
        connection,
        ownerKeypair,
        MINT_B,
        ownerKeypair.publicKey
      );
      
      console.log(`   ✅ USDC account criada: ${account.address.toBase58()}`);
    } else {
      console.log("   ✅ USDC account já existe");
      
      // Check balance
      const tokenAccountBalance = await connection.getTokenAccountBalance(usdcATA);
      console.log(`   💰 Balance: ${tokenAccountBalance.value.uiAmount || 0} USDC`);
    }
    
    console.log("\n⚠️  IMPORTANTE: USDC Devnet");
    console.log("   Você precisa de tokens USDC devnet para criar o pool.");
    console.log("   Opções:");
    console.log("   1. Use um faucet de USDC devnet (se disponível)");
    console.log("   2. Crie seu próprio token de teste");
    console.log("   3. Use outro par de tokens que você já possua\n");
    
    console.log("✅ Token accounts configurados!");
    console.log("\n📋 Resumo:");
    console.log(`   WSOL ATA: ${wsolATA.toBase58()}`);
    console.log(`   USDC ATA: ${usdcATA.toBase58()}`);
    console.log("\n💡 Próximo passo:");
    console.log("   Se você tem USDC devnet, execute:");
    console.log("   npx ts-node --project tsconfig.backend.json scripts/create_cpmm_pool.ts");

  } catch (error) {
    console.error("\n❌ Erro ao configurar token accounts:", error);
    if (error instanceof Error) {
      console.error("Detalhes:", error.message);
    }
  }
}

setupTokenAccounts().catch(console.error);

