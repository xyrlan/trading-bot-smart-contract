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
  Liquidity, 
  LiquidityPoolKeys, 
  MAINNET_PROGRAM_ID, 
  DEVNET_PROGRAM_ID 
} from "@raydium-io/raydium-sdk";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";

// Carregar variáveis de ambiente
dotenv.config();

// --- CONFIGURAÇÕES ---
const NETWORK: 'mainnet' | 'devnet' = 'devnet';
// Seu Program ID
const PROGRAM_ID = new PublicKey("AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ"); 

// Mints para Teste (WSOL / USDC Devnet)
const MINT_A = new PublicKey("So11111111111111111111111111111111111111112"); // WSOL
const MINT_B = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"); // USDC-Devnet

// Carteira Alvo (O Cliente que deu o Approve no frontend)
const TARGET_USER_PUBKEY = new PublicKey("3KkQUZvJnWXTmZiTx8LvF3ucLkcgcNNA5F7z9afz4m3U");

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
  const poolKeys = await fetchPoolKeys(connection, MINT_A, MINT_B);
  
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

  console.log(`🔄 Executando Swap...`);
  console.log(`   In: ${amountIn.toString()}`);

  try {
    const tx = await program.methods
      .executeSwap(amountIn, minAmountOut)
      .accounts({
        botConfig: botConfigPDA,
        owner: TARGET_USER_PUBKEY,
        backendSigner: wallet.publicKey,
        
        userTokenIn: userTokenIn,
        userTokenOut: userTokenOut,
        
        tokenProgram: TOKEN_PROGRAM_ID,
        raydiumAmmProgram: poolKeys.programId,
        raydiumAmm: poolKeys.id,
        raydiumAmmAuthority: poolKeys.authority,
        raydiumAmmOpenOrders: poolKeys.openOrders,
        raydiumAmmTargetOrders: poolKeys.targetOrders,
        raydiumPoolCoinTokenAccount: poolKeys.baseVault,
        raydiumPoolPcTokenAccount: poolKeys.quoteVault,
        
        serumProgram: poolKeys.marketProgramId,
        serumMarket: poolKeys.marketId,
        serumBids: poolKeys.marketBids,
        serumAsks: poolKeys.marketAsks,
        serumEventQueue: poolKeys.marketEventQueue,
        serumCoinVaultAccount: poolKeys.marketBaseVault,
        serumPcVaultAccount: poolKeys.marketQuoteVault,
        serumVaultSigner: poolKeys.marketAuthority,
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
  mintA: PublicKey, 
  mintB: PublicKey
): Promise<LiquidityPoolKeys | null> {
    const raydiumProgramV4 = NETWORK === 'mainnet' 
        ? MAINNET_PROGRAM_ID.AmmV4 
        : DEVNET_PROGRAM_ID.AmmV4;

    // TRUQUE DE MESTRE (Bypass TS Strictness):
    // O SDK exige a chave '5', mas não temos ela fácil na Devnet ou dá erro de tipo.
    // Usamos 'as any' para forçar o envio apenas da chave 4, que é a que importa.
    // Se o SDK reclamar em tempo de execução, passamos null ou undefined.
    const fetchConfig = {
        4: raydiumProgramV4,
        // Se precisar satisfazer o runtime, podemos repetir o V4 aqui, 
        // mas geralmente o 'as any' resolve a validação de compilação.
    };

    console.log("   --> Consultando API da Raydium...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pools = await Liquidity.fetchAllPoolKeys(connection, fetchConfig as any);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const targetPool = pools.find((pool: any) => 
        (pool.baseMint.toString() === mintA.toString() && pool.quoteMint.toString() === mintB.toString()) ||
        (pool.baseMint.toString() === mintB.toString() && pool.quoteMint.toString() === mintA.toString())
    );

    return targetPool || null;
}

main();