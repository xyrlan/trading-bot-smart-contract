import { 
  Connection, 
  Keypair, 
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { 
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getMint,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

async function createTestToken() {
  console.log("🪙 Criando Test Token para o Pool...\n");

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
  
  if (balance < 0.5e9) {
    console.log("❌ Saldo insuficiente. Você precisa de pelo menos 0.5 SOL");
    console.log("💡 Execute: solana airdrop 1 " + ownerKeypair.publicKey.toBase58() + " --url devnet");
    return;
  }

  try {
    console.log("1️⃣  Criando novo token mint...");
    
    const decimals = 6; // Same as USDC
    const mintKeypair = Keypair.generate();
    
    const mint = await createMint(
      connection,
      ownerKeypair,
      ownerKeypair.publicKey, // mint authority
      ownerKeypair.publicKey, // freeze authority
      decimals,
      mintKeypair
    );
    
    console.log(`   ✅ Token Mint criado: ${mint.toBase58()}`);
    console.log(`   🔗 Explorer: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet\n`);
    
    console.log("2️⃣  Criando token account para você...");
    
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      ownerKeypair,
      mint,
      ownerKeypair.publicKey
    );
    
    console.log(`   ✅ Token Account: ${tokenAccount.address.toBase58()}\n`);
    
    console.log("3️⃣  Mintando tokens para você...");
    
    const amount = 2_000_000 * Math.pow(10, decimals); // 2 million tokens
    
    await mintTo(
      connection,
      ownerKeypair,
      mint,
      tokenAccount.address,
      ownerKeypair.publicKey,
      amount
    );
    
    console.log(`   ✅ Mintados ${(amount / Math.pow(10, decimals)).toLocaleString()} tokens\n`);
    
    console.log("🎉 Test Token criado com sucesso!\n");
    
    console.log("📋 Informações do Token:");
    console.log("═".repeat(60));
    console.log(`Token Mint:    ${mint.toBase58()}`);
    console.log(`Token Account: ${tokenAccount.address.toBase58()}`);
    console.log(`Decimals:      ${decimals}`);
    console.log(`Supply:        ${(amount / Math.pow(10, decimals)).toLocaleString()}`);
    console.log("═".repeat(60));
    
    console.log("\n💡 PRÓXIMO PASSO:");
    console.log("\n1. Atualize o arquivo: app/scripts/create_cpmm_pool.ts");
    console.log(`   Substitua a linha 21 por:`);
    console.log(`   const MINT_B = new PublicKey("${mint.toBase58()}");`);
    
    console.log("\n2. Execute o script de criação do pool:");
    console.log("   npx ts-node --project tsconfig.backend.json scripts/create_cpmm_pool.ts");
    
    console.log("\n3. Após criar o pool, atualize também o run_bot.ts com o mesmo MINT_B");

  } catch (error) {
    console.error("\n❌ Erro ao criar test token:", error);
    if (error instanceof Error) {
      console.error("Detalhes:", error.message);
    }
  }
}

createTestToken().catch(console.error);

