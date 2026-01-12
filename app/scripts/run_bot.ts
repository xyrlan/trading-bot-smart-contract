import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { 
  Connection, 
  Keypair, 
  PublicKey,
} from "@solana/web3.js";
import { 
  TOKEN_PROGRAM_ID, 
  getAssociatedTokenAddress 
} from "@solana/spl-token";
import { 
  LiquidityPoolKeys, 
} from "@raydium-io/raydium-sdk";
import { Raydium } from "@raydium-io/raydium-sdk-v2";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";

// Carregar variáveis de ambiente
dotenv.config();

// --- CONFIGURAÇÕES ---
const NETWORK: 'mainnet' | 'devnet' = 'devnet';
// Seu Program ID
const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!); 

// Mints para Teste (WSOL / Seu Test Token)
const MINT_A = new PublicKey("So11111111111111111111111111111111111111112"); // WSOL
const MINT_B = new PublicKey("BnXom78n7K3PHxwK4FzWpgCguzSmEduv5ZqCVCUJzrKt"); // Your Test Token

// Carteira Alvo (O Cliente que deu o Approve no frontend)
const TARGET_USER_PUBKEY = new PublicKey(process.env.WALLET_PUBLIC_KEY!);

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

  // Carregar IDL
  const idlString = fs.readFileSync("./idl/trading_bot_smart_contract.json", "utf8");
  const idl = JSON.parse(idlString);

  // Inicializa o programa
  const program = new Program(idl as anchor.Idl, provider);

  console.log(`🤖 Bot Backend Iniciado`);
  console.log(`🔑 Backend Authority: ${wallet.publicKey.toBase58()}`);
  console.log(`🎯 Target User: ${TARGET_USER_PUBKEY.toBase58()}`);

  console.log("🔍 Buscando dados do Pool na Raydium...");
  const poolKeys = await fetchPoolKeys(connection, walletKeypair);
  
  if (!poolKeys) {
    console.error("❌ Pool não encontrado ou sem liquidez.");
    return;
  }
  console.log(`✅ Pool encontrado! AMM ID: ${poolKeys.id.toBase58()}`);

  // Derivar PDA
  const [botConfigPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), TARGET_USER_PUBKEY.toBuffer()],
    PROGRAM_ID 
  );

  const userTokenIn = await getAssociatedTokenAddress(MINT_A, TARGET_USER_PUBKEY);
  const userTokenOut = await getAssociatedTokenAddress(MINT_B, TARGET_USER_PUBKEY);

  const amountIn = new BN(10_000_000); 
  const minAmountOut = new BN(0); 

  console.log(`🔄 Executando Swap CPMM...`);
  console.log(`   In: ${amountIn.toString()}`);

  try {
    const tx = await program.methods
      .executeSwapCpmm(amountIn, minAmountOut)
      .accounts({
        botConfig: botConfigPDA,
        owner: TARGET_USER_PUBKEY,
        backendSigner: wallet.publicKey,
        
        userTokenIn: userTokenIn,
        userTokenOut: userTokenOut,
        
        tokenProgram: TOKEN_PROGRAM_ID,
        cpmmProgram: poolKeys.programId,
        cpmmPool: poolKeys.id,
        poolAuthority: poolKeys.authority,
        poolVaultA: poolKeys.baseVault,
        poolVaultB: poolKeys.quoteVault,
        lpMint: poolKeys.lpMint,
      })
      .signers([walletKeypair])
      .rpc();

    console.log(`🎉 Trade Executado com Sucesso!`);
    console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx}?cluster=${NETWORK}`);

  } catch (err: unknown) {
    console.error("❌ Erro ao executar trade:", err);
    if (err instanceof Error && 'logs' in err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        console.log("📜 Program Logs:", (err as any).logs);
    }
  }
}

// --- Helper para buscar chaves do Pool ---

async function fetchPoolKeys(
  connection: Connection,
  walletKeypair: Keypair
): Promise<LiquidityPoolKeys | null> {
    console.log("   --> Inicializando Raydium SDK V2 para Devnet...");
    
    // Your created pool ID
    const POOL_ID = "41ApS8BGaPVNJs6RciosYtGkzcCh9HnBoSBeBKiMFc1m";
    
    try {
        // Initialize Raydium SDK V2 for devnet
        const raydium = await Raydium.load({
            owner: walletKeypair,
            connection: connection,
            cluster: "devnet",
            disableFeatureCheck: true,
            disableLoadToken: false,
        });
        
        console.log("   ✓ Raydium SDK V2 inicializado");
        console.log(`   --> Buscando pool: ${POOL_ID}...`);

        // Fetch specific pool by ID
        const poolInfo = await raydium.api.fetchPoolById({ ids: POOL_ID });
        
        if (!poolInfo || poolInfo.length === 0) {
            console.log("   ❌ Pool não encontrado");
            console.log("   💡 O pool pode levar alguns minutos para ser indexado pela API");
            console.log("   💡 Ou você pode verificar diretamente no explorer");
            return null;
        }
        
        const targetPool = poolInfo[0];
        console.log(`   ✓ Pool encontrado: ${targetPool.id}`);
        console.log(`      Type: ${targetPool.type}`);
        console.log(`      Pair: ${targetPool.mintA?.symbol || 'Unknown'}/${targetPool.mintB?.symbol || 'Unknown'}`);
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pool = targetPool as any;
        
        // Convert pool info to LiquidityPoolKeys format with hardcoded CPMM addresses
        // These were discovered by inspecting the actual pool account
        const CPMM_POOL_AUTHORITY = new PublicKey("2AVJPqMU22nQuxVagMy9satMpLpnNNcBhvpjD9GS3opz");
        const CPMM_VAULT_A = new PublicKey("9cnqiiQdT5gQ3wtXEVZTCaQYzoRxdS9PYzWw7gKyPH1B");
        const CPMM_VAULT_B = new PublicKey("6vjACjPVtRu8hXDs3ERse3TkrNi7uNdbR5Er7dX9bdwh");
        
        const poolKeys: LiquidityPoolKeys = {
            id: new PublicKey(pool.id),
            baseMint: new PublicKey(pool.mintA.address),
            quoteMint: new PublicKey(pool.mintB.address),
            lpMint: new PublicKey(pool.lpMint.address),
            baseDecimals: pool.mintA.decimals,
            quoteDecimals: pool.mintB.decimals,
            lpDecimals: pool.lpMint.decimals,
            version: 4,
            programId: new PublicKey(pool.programId),
            authority: CPMM_POOL_AUTHORITY,
            openOrders: PublicKey.default,
            targetOrders: PublicKey.default,
            baseVault: CPMM_VAULT_A,
            quoteVault: CPMM_VAULT_B,
            marketVersion: 3,
            marketProgramId: PublicKey.default,
            marketId: PublicKey.default,
            marketAuthority: PublicKey.default,
            marketBaseVault: PublicKey.default,
            marketQuoteVault: PublicKey.default,
            marketBids: PublicKey.default,
            marketAsks: PublicKey.default,
            marketEventQueue: PublicKey.default,
            withdrawQueue: PublicKey.default,
            lpVault: PublicKey.default,
            lookupTableAccount: PublicKey.default,
        };
        
        console.log("   ✓ Pool keys construídas com sucesso");
        console.log(`   Pool Authority: ${CPMM_POOL_AUTHORITY.toBase58()}`);
        console.log(`   Vault A: ${CPMM_VAULT_A.toBase58()}`);
        console.log(`   Vault B: ${CPMM_VAULT_B.toBase58()}`);
        return poolKeys;
        
    } catch (error) {
        console.error("   ❌ Erro ao buscar pool:", error);
        if (error instanceof Error) {
            console.error("   Detalhes:", error.message);
        }
        return null;
    }
}

main();