import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { 
  Connection, 
  Keypair, 
  PublicKey,
} from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID!);
const TARGET_USER_PUBKEY = new PublicKey(process.env.WALLET_PUBLIC_KEY!);

async function initializeBot() {
  console.log("🔧 Inicializando Bot Configuration...\n");

  const connection = new Connection(process.env.RPC_URL || "https://api.devnet.solana.com");
  
  const privKey = process.env.BACKEND_PRIVATE_KEY;
  if (!privKey) throw new Error("BACKEND_PRIVATE_KEY não encontrada no .env");

  const walletKeypair = privKey.includes("[") 
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privKey)))
    : Keypair.fromSecretKey(bs58.decode(privKey));
    
  const wallet = new anchor.Wallet(walletKeypair);
  const provider = new anchor.AnchorProvider(connection, wallet, { commitment: "confirmed" });
  anchor.setProvider(provider);

  // Load IDL
  const idlString = fs.readFileSync("./idl/trading_bot_smart_contract.json", "utf8");
  const idl = JSON.parse(idlString);

  const program = new Program(idl as anchor.Idl, provider);

  console.log(`👤 Owner: ${TARGET_USER_PUBKEY.toBase58()}`);
  console.log(`🔑 Backend Authority: ${wallet.publicKey.toBase58()}`);
  console.log(`📋 Program ID: ${PROGRAM_ID.toBase58()}\n`);

  // Derive bot_config PDA
  const [botConfigPDA, bump] = PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), TARGET_USER_PUBKEY.toBuffer()],
    PROGRAM_ID
  );

  console.log(`🔍 Bot Config PDA: ${botConfigPDA.toBase58()}`);
  console.log(`   Bump: ${bump}\n`);

  // Check if already initialized
  try {
    const accountInfo = await connection.getAccountInfo(botConfigPDA);
    if (accountInfo) {
      console.log("⚠️  Bot já está inicializado!");
      console.log("   Account exists at:", botConfigPDA.toBase58());
      console.log("   Data length:", accountInfo.data.length);
      console.log("\n✅ Nenhuma ação necessária - bot já configurado!");
      console.log("\n💡 Para ver os detalhes da configuração, use:");
      console.log(`   solana account ${botConfigPDA.toBase58()} --url devnet`);
      return;
    }
  } catch {
    // Account doesn't exist, proceed with initialization
    console.log("ℹ️  Bot config não existe ainda - iniciando...\n");
  }

  // Configuration parameters
  const backendAuthority = wallet.publicKey;
  const maxTradeAmount = new BN(100_000_000); // 0.1 SOL max per trade
  const maxSlippageBps = 500; // 5% max slippage

  console.log("⚙️  Parâmetros de Configuração:");
  console.log(`   Backend Authority: ${backendAuthority.toBase58()}`);
  console.log(`   Max Trade Amount: ${maxTradeAmount.toString()} lamports (${maxTradeAmount.toNumber() / 1e9} SOL)`);
  console.log(`   Max Slippage: ${maxSlippageBps} bps (${maxSlippageBps / 100}%)\n`);

  try {
    console.log("🚀 Chamando initialize_bot...");
    
    const tx = await program.methods
      .initializeBot(
        backendAuthority,
        maxTradeAmount,
        maxSlippageBps
      )
      .accounts({
        botConfig: botConfigPDA,
        owner: TARGET_USER_PUBKEY,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([walletKeypair])
      .rpc();

    console.log("✅ Bot inicializado com sucesso!");
    console.log(`🔗 Transaction: https://explorer.solana.com/tx/${tx}?cluster=devnet\n`);

    console.log("📋 Configuração criada:");
    console.log("   Bot Config PDA:", botConfigPDA.toBase58());
    console.log("   Owner:", TARGET_USER_PUBKEY.toBase58());
    console.log("   Backend Authority:", backendAuthority.toBase58());
    console.log("   Max Trade Amount:", maxTradeAmount.toString());
    console.log("   Max Slippage (bps):", maxSlippageBps);
    
    console.log("\n💡 Próximo passo:");
    console.log("   Execute o bot: npx ts-node --project tsconfig.backend.json scripts/run_bot.ts");

  } catch (err: unknown) {
    console.error("❌ Erro ao inicializar bot:", err);
    if (err instanceof Error && 'logs' in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("📜 Program Logs:", (err as any).logs);
    }
  }
}

initializeBot().catch(console.error);

