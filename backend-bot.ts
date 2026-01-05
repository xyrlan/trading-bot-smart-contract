/**
 * Backend Bot - Script que executa trades automaticamente
 * 
 * Este script deve rodar em um servidor (não no frontend)
 * Ele monitora o mercado e executa trades usando a chave privada do backend
 */

import * as anchor from "@coral-xyz/anchor";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import fs from "fs";

// Tipos do seu programa (gerado após anchor build)
// import { TradingBotSmartContract } from "./target/types/trading_bot_smart_contract";

const PROGRAM_ID = new PublicKey("AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ");

/**
 * Configuração do bot
 */
interface BotConfig {
  // RPC endpoint
  rpcUrl: string;
  // Caminho para o keypair do backend
  backendKeypairPath: string;
  // Public key do usuário cujo bot vamos executar
  userPublicKey: string;
  // Token mints
  tokenMintIn: string;  // Ex: USDC
  tokenMintOut: string; // Ex: SOL
}

/**
 * Carrega a configuração do bot
 */
function loadConfig(): BotConfig {
  // TODO: Carregar de .env ou arquivo de config
  return {
    rpcUrl: process.env.RPC_URL || "https://api.devnet.solana.com",
    backendKeypairPath: process.env.BACKEND_KEYPAIR_PATH || "./bot-keypair.json",
    userPublicKey: process.env.USER_PUBLIC_KEY || "",
    tokenMintIn: process.env.TOKEN_MINT_IN || "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC devnet
    tokenMintOut: process.env.TOKEN_MINT_OUT || "So11111111111111111111111111111111111111112", // Wrapped SOL
  };
}

/**
 * Executa um trade para um usuário específico
 */
async function executeTrade(
  program: Program,
  backendKeypair: Keypair,
  userPublicKey: PublicKey,
  amountIn: anchor.BN,
  minimumAmountOut: anchor.BN,
  tokenMintIn: PublicKey,
  tokenMintOut: PublicKey,
  poolTokenAccount: PublicKey
) {
  try {
    // 1. Derivar a PDA do bot_config
    const [botConfigPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bot_config"), userPublicKey.toBuffer()],
      program.programId
    );

    console.log(`📍 Bot Config PDA: ${botConfigPDA.toBase58()}`);

    // 2. Obter as contas de token do usuário (ATAs)
    const userTokenIn = await getAssociatedTokenAddress(tokenMintIn, userPublicKey);
    const userTokenOut = await getAssociatedTokenAddress(tokenMintOut, userPublicKey);

    console.log(`💰 User Token In: ${userTokenIn.toBase58()}`);
    console.log(`💰 User Token Out: ${userTokenOut.toBase58()}`);

    // 3. Executar o swap
    console.log(`\n🔄 Executando swap de ${amountIn.toString()} tokens...`);

    const tx = await program.methods
      .executeSwap(amountIn, minimumAmountOut)
      .accounts({
        botConfig: botConfigPDA,
        owner: userPublicKey, // O dono (não assina)
        backendSigner: backendKeypair.publicKey, // Backend assina e paga gás
        userTokenIn: userTokenIn,
        userTokenOut: userTokenOut,
        poolTokenAccount: poolTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log(`✅ Trade executado com sucesso!`);
    console.log(`📝 Signature: ${tx}`);
    console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);

    return tx;
  } catch (error) {
    console.error("❌ Erro ao executar trade:", error);
    throw error;
  }
}

/**
 * Monitora o mercado e executa trades quando necessário
 * 
 * TODO: Implementar lógica real de análise de mercado
 * Por enquanto, é apenas um exemplo
 */
async function monitorMarket(
  program: Program,
  backendKeypair: Keypair,
  config: BotConfig
) {
  console.log("👀 Monitorando mercado...\n");

  // TODO: Implementar lógica de análise
  // Exemplos:
  // - Buscar preços em APIs (Jupiter, Birdeye, etc.)
  // - Analisar volatilidade
  // - Detectar oportunidades de arbitragem
  // - Usar indicadores técnicos (RSI, MACD, etc.)

  // Por enquanto, apenas um exemplo de execução manual
  const shouldTrade = false; // Mude para true para testar

  if (shouldTrade) {
    const userPubkey = new PublicKey(config.userPublicKey);
    const tokenMintIn = new PublicKey(config.tokenMintIn);
    const tokenMintOut = new PublicKey(config.tokenMintOut);
    
    // Exemplo: Pool account (substitua pela conta real do pool Raydium)
    const poolTokenAccount = await getAssociatedTokenAddress(
      tokenMintIn,
      backendKeypair.publicKey
    );

    await executeTrade(
      program,
      backendKeypair,
      userPubkey,
      new anchor.BN(1_000_000), // 1 USDC (6 decimais)
      new anchor.BN(0), // Min out 0 para teste
      tokenMintIn,
      tokenMintOut,
      poolTokenAccount
    );
  }
}

/**
 * Função principal
 */
async function main() {
  console.log("🤖 Trading Bot Backend\n");

  // 1. Carregar configuração
  const config = loadConfig();

  if (!config.userPublicKey) {
    console.error("❌ USER_PUBLIC_KEY não configurado!");
    console.log("\nConfigure as variáveis de ambiente:");
    console.log("  export USER_PUBLIC_KEY=<public_key_do_usuario>");
    console.log("  export BACKEND_KEYPAIR_PATH=./bot-keypair.json");
    console.log("  export RPC_URL=https://api.devnet.solana.com");
    process.exit(1);
  }

  // 2. Carregar keypair do backend
  console.log(`🔑 Carregando keypair do backend: ${config.backendKeypairPath}`);
  
  if (!fs.existsSync(config.backendKeypairPath)) {
    console.error(`❌ Arquivo não encontrado: ${config.backendKeypairPath}`);
    console.log("\nGere um keypair com:");
    console.log("  solana-keygen new -o bot-keypair.json");
    process.exit(1);
  }

  const keypairData = JSON.parse(fs.readFileSync(config.backendKeypairPath, "utf-8"));
  const backendKeypair = Keypair.fromSecretKey(new Uint8Array(keypairData));

  console.log(`✅ Backend Authority: ${backendKeypair.publicKey.toBase58()}\n`);

  // 3. Conectar à Solana
  console.log(`🌐 Conectando a: ${config.rpcUrl}`);
  const connection = new Connection(config.rpcUrl, "confirmed");

  // 4. Verificar saldo (backend precisa de SOL para pagar gás)
  const balance = await connection.getBalance(backendKeypair.publicKey);
  console.log(`💰 Saldo do backend: ${balance / 1e9} SOL`);

  if (balance < 0.01 * 1e9) {
    console.warn("⚠️  Saldo baixo! Backend precisa de SOL para pagar taxas.");
    console.log("   Execute: solana airdrop 1 " + backendKeypair.publicKey.toBase58());
  }

  // 5. Configurar Anchor
  const wallet = new anchor.Wallet(backendKeypair);
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });

  // 6. Carregar o programa
  // OPÇÃO 1: Se você tem o IDL local
  // const idl = JSON.parse(fs.readFileSync("./target/idl/trading_bot_smart_contract.json", "utf-8"));
  // const program = new Program(idl, PROGRAM_ID, provider);

  // OPÇÃO 2: Buscar IDL da blockchain
  const program = await Program.at(PROGRAM_ID, provider);

  console.log(`✅ Programa carregado: ${program.programId.toBase58()}\n`);

  // 7. Iniciar monitoramento
  console.log("=".repeat(50));
  
  // Loop infinito (em produção, use um scheduler como node-cron)
  while (true) {
    try {
      await monitorMarket(program, backendKeypair, config);
    } catch (error) {
      console.error("Erro no loop:", error);
    }

    // Aguardar antes da próxima verificação (ex: 10 segundos)
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
}

// Executar
main().catch((error) => {
  console.error("Erro fatal:", error);
  process.exit(1);
});

