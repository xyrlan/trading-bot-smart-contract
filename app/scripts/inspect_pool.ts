import { Raydium } from "@raydium-io/raydium-sdk-v2";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const POOL_ID = "41ApS8BGaPVNJs6RciosYtGkzcCh9HnBoSBeBKiMFc1m";

async function inspectPool() {
  const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com");
  
  const privKey = process.env.BACKEND_PRIVATE_KEY!;
  const walletKeypair = privKey.includes("[") 
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privKey)))
    : Keypair.fromSecretKey(bs58.decode(privKey));

  console.log("🔍 Inspecionando Pool CPMM...\n");
  console.log(`Pool ID: ${POOL_ID}\n`);

  const raydium = await Raydium.load({
    owner: walletKeypair,
    connection: connection,
    cluster: "devnet",
    disableFeatureCheck: true,
  });

  const poolInfo = await raydium.api.fetchPoolById({ ids: POOL_ID });
  
  if (!poolInfo || poolInfo.length === 0) {
    console.log("❌ Pool não encontrado");
    return;
  }

  const pool = poolInfo[0];
  
  console.log("📋 Estrutura Completa do Pool:");
  console.log(JSON.stringify(pool, null, 2));
}

inspectPool().catch(console.error);

