import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { 
  Connection, 
  Keypair, 
  PublicKey,
} from "@solana/web3.js";
import { Raydium, TxVersion } from "@raydium-io/raydium-sdk-v2";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// --- CONFIGURAÇÕES ---
const NETWORK: 'mainnet' | 'devnet' = 'devnet';
const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
const TARGET_USER_PUBKEY = new PublicKey(process.env.WALLET_PUBLIC_KEY!);

// Pool e tokens
const POOL_ID = "41ApS8BGaPVNJs6RciosYtGkzcCh9HnBoSBeBKiMFc1m";
const MINT_A = new PublicKey("So11111111111111111111111111111111111111112"); // WSOL
const MINT_B = new PublicKey("BnXom78n7K3PHxwK4FzWpgCguzSmEduv5ZqCVCUJzrKt"); // Test Token

async function main() {
  const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com");
  
  const privKey = process.env.BACKEND_PRIVATE_KEY;
  if (!privKey) throw new Error("BACKEND_PRIVATE_KEY não encontrada no .env");

  const walletKeypair = privKey.includes("[") 
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privKey)))
    : Keypair.fromSecretKey(bs58.decode(privKey));
    
  const wallet = new anchor.Wallet(walletKeypair);
  const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
  anchor.setProvider(provider);

  // Carregar IDL e inicializar programa
  const idlString = fs.readFileSync("./idl/trading_bot_smart_contract.json", "utf8");
  const idl = JSON.parse(idlString);
  const program = new Program(idl as anchor.Idl, provider);

  console.log(`🤖 Bot Backend Iniciado (Hybrid Mode)`);
  console.log(`🔑 Backend Authority: ${wallet.publicKey.toBase58()}`);
  console.log(`🎯 Target User: ${TARGET_USER_PUBKEY.toBase58()}\n`);

  // Derivar PDA
  const [botConfigPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), TARGET_USER_PUBKEY.toBuffer()],
    PROGRAM_ID 
  );

  const amountIn = new BN(100_000); // 0.0001 SOL (quantidade bem pequena para teste)
  const minAmountOut = new BN(0);

  console.log(`💰 Trade Amount: ${amountIn.toString()} lamports (${amountIn.toNumber() / 1e9} SOL)\n`);

  try {
    // ========================================
    // STEP 1: Authorize with Smart Contract
    // ========================================
    console.log("📋 Step 1: Autorizando swap no smart contract...");
    
    const authTx = await program.methods
      .authorizeSwap(amountIn, minAmountOut)
      .accounts({
        botConfig: botConfigPDA,
        owner: TARGET_USER_PUBKEY,
        backendSigner: wallet.publicKey,
      })
      .signers([walletKeypair])
      .rpc();

    console.log(`✅ Swap autorizado!`);
    console.log(`🔗 Auth TX: https://explorer.solana.com/tx/${authTx}?cluster=${NETWORK}\n`);

    // ========================================
    // STEP 2: Execute Swap using Raydium SDK
    // ========================================
    console.log("💱 Step 2: Executando swap via Raydium SDK...");
    
    // Initialize Raydium SDK
    const raydium = await Raydium.load({
      owner: walletKeypair,
      connection: connection,
      cluster: "devnet",
      disableFeatureCheck: true,
    });

    // Fetch pool info
    const poolInfo = await raydium.api.fetchPoolById({ ids: POOL_ID });
    
    if (!poolInfo || poolInfo.length === 0) {
      throw new Error("Pool não encontrado");
    }

    const pool = poolInfo[0];
    console.log(`   Pool: ${pool.mintA?.symbol}/${pool.mintB?.symbol}`);
    console.log(`   Pool ID: ${pool.id}`);
    console.log(`   TVL: $${pool.tvl}`);
    console.log(`   Price: ${pool.price}`);
    console.log(`   Type: ${pool.type}\n`);

    // Prepare swap parameters
    console.log(`   Preparing swap...`);
    console.log(`   Input: ${amountIn.toNumber() / 1e9} ${pool.mintA.symbol}`);
    console.log(`   Base In: true (swapping A for B)\n`);
    
    // Calculate estimated output based on pool price
    const inputInBaseUnits = amountIn.toNumber() / Math.pow(10, pool.mintA.decimals);
    const estimatedOutputInQuoteUnits = inputInBaseUnits * pool.price;
    const estimatedOutputRaw = Math.floor(estimatedOutputInQuoteUnits * Math.pow(10, pool.mintB.decimals));
    
    console.log(`   Estimated output: ${estimatedOutputInQuoteUnits} ${pool.mintB.symbol || 'tokens'}`);
    
    const swapResult = {
      inputAmount: amountIn,
      outputAmount: new BN(estimatedOutputRaw),
    };
    
    try {
      const { execute } = await raydium.cpmm.swap({
        poolInfo: pool as any, // eslint-disable-line @typescript-eslint/no-explicit-any
        inputAmount: amountIn,
        swapResult: swapResult,
        baseIn: true, // Swap mintA (WSOL) for mintB (Test Token)
        slippage: 0.1, // 10% slippage (higher for small amounts)
        txVersion: TxVersion.V0,
      });

      console.log(`   ✓ Swap transaction built`);
      console.log(`   Executing swap...\n`);

      const { txId } = await execute({ sendAndConfirm: true });
      
      console.log(`\n🎉 Swap Executado com Sucesso!`);
      console.log(`🔗 Swap TX: https://explorer.solana.com/tx/${txId}?cluster=${NETWORK}`);
      
      console.log(`\n📊 Resumo:`);
      console.log(`   ✅ Autorização: ${authTx.slice(0, 8)}...`);
      console.log(`   ✅ Swap: ${txId.slice(0, 8)}...`);
      console.log(`   ✅ Pool: ${POOL_ID.slice(0, 8)}...`);
      
    } catch (swapError) {
      console.error("\n❌ Erro no swap Raydium:", swapError);
      if (swapError instanceof Error) {
        console.error("   Message:", swapError.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((swapError as any).logs) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log("   Logs:", (swapError as any).logs);
      }
      throw swapError;
    }

  } catch (err: unknown) {
    console.error("\n❌ Erro:", err);
    if (err instanceof Error && 'logs' in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("📜 Program Logs:", (err as any).logs);
    }
  }
}

main();

