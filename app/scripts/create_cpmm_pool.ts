import { Raydium, TxVersion } from "@raydium-io/raydium-sdk-v2";
import { 
  Connection, 
  Keypair, 
  PublicKey,
} from "@solana/web3.js";
import { 
  NATIVE_MINT,
} from "@solana/spl-token";
import bs58 from "bs58";
import dotenv from "dotenv";
import { BN } from "@coral-xyz/anchor";

dotenv.config();

// Constantes para devnet CPMM (Fonte: Documentação Oficial Raydium)
const DEVNET_CPMM = new PublicKey("DRaycpLY18LhpbydsBWbVJtxpNv9oXPgjRSfpF2bWpYb");
const DEVNET_FEE_ACC = new PublicKey("3oE58BKVt8KuYkGxx8zBojugnymWmBiyafWgMrnb6eYy");

// Mints para Teste (WSOL / Seu Test Token)
const MINT_A = NATIVE_MINT; // WSOL
const MINT_B = new PublicKey("BnXom78n7K3PHxwK4FzWpgCguzSmEduv5ZqCVCUJzrKt"); // Your Test Token

async function createCpmmPool() {
  console.log("🏗️  Criando Pool CPMM na Devnet...\n");

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
  console.log(`💰 Balance: ${balance / 1e9} SOL\n`);
  
  if (balance < 0.5e9) {
    console.log("❌ Saldo insuficiente. Você precisa de pelo menos 0.5 SOL na devnet");
    console.log("💡 Use: solana airdrop 1 " + ownerKeypair.publicKey.toBase58() + " --url devnet");
    return;
  }

  console.log("🔧 Inicializando Raydium SDK V2...");
  const raydium = await Raydium.load({
    owner: ownerKeypair,
    connection: connection,
    cluster: "devnet",
    disableFeatureCheck: true,
  });
  console.log("✅ Raydium SDK V2 inicializado\n");

  console.log("🔍 Buscando informações dos tokens...");
  
  // Get token info
  const mintAInfo = await raydium.token.getTokenInfo(MINT_A.toBase58());
  const mintBInfo = await raydium.token.getTokenInfo(MINT_B.toBase58());
  
  console.log(`   Token A: ${mintAInfo.symbol} (${mintAInfo.address})`);
  console.log(`   Token B: ${mintBInfo.symbol} (${mintBInfo.address})\n`);

  // Get fee configs
  console.log("📋 Buscando configurações de fee...");
  const feeConfigs = await raydium.api.getCpmmConfigs();
  
  if (!feeConfigs || feeConfigs.length === 0) {
    console.log("❌ Nenhuma configuração de fee encontrada");
    return;
  }
  
  const feeConfig = feeConfigs[0];
  console.log(`   Fee Config: ${JSON.stringify(feeConfig, null, 2)}\n`);

  // Definir amounts (ajuste conforme necessário)
  // Use amounts menores para teste
  const mintAAmount = new BN(0.1 * 10 ** mintAInfo.decimals); // 0.1 SOL
  const mintBAmount = new BN(100 * 10 ** mintBInfo.decimals); // 100 tokens
  
  console.log(`💧 Liquidez inicial:`);
  console.log(`   ${mintAInfo.symbol}: ${(mintAAmount.toNumber() / 10 ** mintAInfo.decimals).toLocaleString()}`);
  console.log(`   ${mintBInfo.symbol}: ${(mintBAmount.toNumber() / 10 ** mintBInfo.decimals).toLocaleString()}\n`);

  try {
    console.log("🚀 Criando pool CPMM...");
    
    const { execute, extInfo } = await raydium.cpmm.createPool({
      programId: DEVNET_CPMM,
      poolFeeAccount: DEVNET_FEE_ACC,
      mintA: mintAInfo,
      mintB: mintBInfo,
      mintAAmount: mintAAmount,
      mintBAmount: mintBAmount,
      startTime: new BN(0), // Start immediately
      feeConfig: feeConfig,
      associatedOnly: false,
      ownerInfo: {
        useSOLBalance: true,
      },
      txVersion: TxVersion.V0, // Use V0 transaction version
    });

    console.log("📝 Informações do pool:");
    console.log(`   Pool ID: ${extInfo.address.poolId.toBase58()}`);
    console.log(`   LP Mint: ${extInfo.address.lpMint.toBase58()}\n`);

    console.log("✍️  Executando transação...");
    const { txId } = await execute({ sendAndConfirm: true });
    
    console.log("\n🎉 Pool criado com sucesso!");
    console.log(`🔗 Pool ID: ${extInfo.address.poolId.toBase58()}`);
    console.log(`🔗 Transaction: https://explorer.solana.com/tx/${txId}?cluster=devnet\n`);
    
    console.log("💡 Agora você pode usar este pool no seu bot!");
    console.log(`   Adicione no seu .env: POOL_ID=${extInfo.address.poolId.toBase58()}`);

  } catch (error) {
    console.error("\n❌ Erro ao criar pool:", error);
    if (error instanceof Error) {
      console.error("Detalhes:", error.message);
    }
  }
}

createCpmmPool().catch(console.error);

