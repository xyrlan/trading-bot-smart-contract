const anchor = require("@coral-xyz/anchor");
const { Program, BN } = anchor;
const { 
  Connection, 
  Keypair, 
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const { 
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Cores para console
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function main() {
  log("\n🚀 Localnet Deploy & Setup\n", "cyan");
  log("════════════════════════════════════════\n", "cyan");

  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  // Verificar se validator está rodando
  try {
    const version = await connection.getVersion();
    log(`✓ Validator rodando (versão ${version["solana-core"]})`, "green");
  } catch (error) {
    log("❌ Validator não está rodando!", "red");
    log("\nExecute primeiro: yarn localnet:start\n", "yellow");
    process.exit(1);
  }

  log("\n📦 Step 1: Building Program...\n", "blue");
  
  try {
    execSync("anchor build", { stdio: "inherit" });
    log("\n✓ Build completo", "green");
  } catch (error) {
    log("\n❌ Erro no build", "red");
    process.exit(1);
  }

  log("\n🚀 Step 2: Deploying Program...\n", "blue");
  
  try {
    execSync("anchor deploy", { stdio: "inherit" });
    log("\n✓ Deploy completo", "green");
  } catch (error) {
    log("\n❌ Erro no deploy", "red");
    process.exit(1);
  }

  // Ler o Program ID do target/deploy
  const programIdPath = "./target/deploy/trading_bot-keypair.json";
  if (!fs.existsSync(programIdPath)) {
    log("❌ Program keypair não encontrado!", "red");
    log(`   Procurando em: ${programIdPath}`, "red");
    log("   Arquivos disponíveis:", "yellow");
    try {
      const files = fs.readdirSync("./target/deploy");
      files.forEach(f => log(`     - ${f}`, "yellow"));
    } catch (e) {
      log("   Não foi possível listar arquivos", "red");
    }
    process.exit(1);
  }

  const programKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync(programIdPath, "utf-8")))
  );
  const programId = programKeypair.publicKey;
  
  log(`\n✓ Program ID: ${programId.toBase58()}`, "green");

  log("\n👤 Step 3: Creating Test Wallets...\n", "blue");

  // Criar diretório para wallets se não existir
  const walletsDir = "./test-wallets";
  if (!fs.existsSync(walletsDir)) {
    fs.mkdirSync(walletsDir, { recursive: true });
  }

  // User Wallet (para testar no frontend)
  const userWallet = Keypair.generate();
  const userWalletPath = path.join(walletsDir, "user-wallet.json");
  fs.writeFileSync(
    userWalletPath,
    JSON.stringify(Array.from(userWallet.secretKey))
  );

  // Airdrop para user wallet
  const userAirdropSig = await connection.requestAirdrop(
    userWallet.publicKey,
    100 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(userAirdropSig);
  
  log(`✓ User Wallet: ${userWallet.publicKey.toBase58()}`, "green");
  log(`  Saldo: 100 SOL`, "green");
  log(`  Keypair salvo em: ${userWalletPath}`, "green");

  // Backend Wallet (para autorizar trades)
  const backendWallet = Keypair.generate();
  const backendWalletPath = path.join(walletsDir, "backend-wallet.json");
  fs.writeFileSync(
    backendWalletPath,
    JSON.stringify(Array.from(backendWallet.secretKey))
  );

  // Airdrop para backend wallet
  const backendAirdropSig = await connection.requestAirdrop(
    backendWallet.publicKey,
    50 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(backendAirdropSig);
  
  log(`\n✓ Backend Wallet: ${backendWallet.publicKey.toBase58()}`, "green");
  log(`  Saldo: 50 SOL`, "green");
  log(`  Keypair salvo em: ${backendWalletPath}`, "green");

  log("\n🪙 Step 4: Creating Test Tokens...\n", "blue");

  // Criar USDC de teste
  const usdcMint = await createMint(
    connection,
    userWallet,
    userWallet.publicKey,
    null,
    6 // USDC tem 6 decimais
  );

  log(`✓ USDC Mint: ${usdcMint.toBase58()}`, "green");

  // Criar Test Token
  const testTokenMint = await createMint(
    connection,
    userWallet,
    userWallet.publicKey,
    null,
    9 // 9 decimais
  );

  log(`✓ Test Token Mint: ${testTokenMint.toBase58()}`, "green");

  // Criar token accounts para user wallet
  const userUsdcAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    userWallet,
    usdcMint,
    userWallet.publicKey
  );

  const userTestTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    userWallet,
    testTokenMint,
    userWallet.publicKey
  );

  // Mintar tokens para user
  await mintTo(
    connection,
    userWallet,
    usdcMint,
    userUsdcAccount.address,
    userWallet,
    1_000_000_000_000 // 1M USDC
  );

  await mintTo(
    connection,
    userWallet,
    testTokenMint,
    userTestTokenAccount.address,
    userWallet,
    1_000_000_000_000_000 // 1M Test Tokens
  );

  log(`\n✓ User Token Accounts criados e mintados`, "green");
  log(`  USDC: 1,000,000 USDC`, "green");
  log(`  Test Token: 1,000,000 tokens`, "green");

  // Criar token accounts para backend wallet
  const backendUsdcAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    backendWallet,
    usdcMint,
    backendWallet.publicKey
  );

  const backendTestTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    backendWallet,
    testTokenMint,
    backendWallet.publicKey
  );

  await mintTo(
    connection,
    userWallet,
    usdcMint,
    backendUsdcAccount.address,
    userWallet,
    100_000_000_000 // 100k USDC
  );

  await mintTo(
    connection,
    userWallet,
    testTokenMint,
    backendTestTokenAccount.address,
    userWallet,
    100_000_000_000_000 // 100k Test Tokens
  );

  log(`\n✓ Backend Token Accounts criados e mintados`, "green");

  log("\n💾 Step 5: Saving Configuration...\n", "blue");

  const config = {
    network: "localnet",
    rpcUrl: "http://127.0.0.1:8899",
    programId: programId.toBase58(),
    userWallet: {
      publicKey: userWallet.publicKey.toBase58(),
      secretPath: userWalletPath,
    },
    backendWallet: {
      publicKey: backendWallet.publicKey.toBase58(),
      secretPath: backendWalletPath,
    },
    tokens: {
      wsol: "So11111111111111111111111111111111111111112",
      usdc: {
        mint: usdcMint.toBase58(),
        decimals: 6,
      },
      testToken: {
        mint: testTokenMint.toBase58(),
        decimals: 9,
        symbol: "TEST",
      },
    },
  };

  // Salvar config geral
  const configPath = "./localnet-config.json";
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  log(`✓ Configuração salva em: ${configPath}`, "green");

  // Criar .env.local para frontend
  const frontendEnv = `# Localnet Configuration - Auto-generated
NEXT_PUBLIC_NETWORK=localnet
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8899
NEXT_PUBLIC_PROGRAM_ID=${programId.toBase58()}

# Tokens
NEXT_PUBLIC_USDC_MINT=${usdcMint.toBase58()}
NEXT_PUBLIC_TEST_TOKEN_MINT=${testTokenMint.toBase58()}

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
`;

  const frontendEnvPath = "./frontend/.env.local";
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  log(`\n✓ Frontend .env.local criado: ${frontendEnvPath}`, "green");

  // Criar .env.local para backend
  const backendEnv = `# Localnet Configuration - Auto-generated
NETWORK=localnet
RPC_URL=http://127.0.0.1:8899
PROGRAM_ID=${programId.toBase58()}

# Backend Wallet (para autorizar trades)
BACKEND_PRIVATE_KEY=${JSON.stringify(Array.from(backendWallet.secretKey))}
WALLET_PUBLIC_KEY=${backendWallet.publicKey.toBase58()}

# User Wallet (target)
TARGET_USER_PUBLIC_KEY=${userWallet.publicKey.toBase58()}

# Tokens
USDC_MINT=${usdcMint.toBase58()}
TEST_TOKEN_MINT=${testTokenMint.toBase58()}

# Market Data (modo mock para localnet)
BIRDEYE_WS_URL=mock://localhost
BIRDEYE_API_KEY=not-required-for-localnet

# Trading Config
TRADING_PAIRS=TEST/USDC
CANDLE_SIZE=5m

# API Config
API_PORT=3001
API_HOST=0.0.0.0
LOG_LEVEL=info

# Database (opcional para localnet)
DATABASE_URL=file:./dev.db
`;

  const backendEnvPath = "./backend/.env.local";
  fs.writeFileSync(backendEnvPath, backendEnv);
  log(`✓ Backend .env.local criado: ${backendEnvPath}`, "green");

  log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "cyan");
  log("  ✅ Setup Completo!", "green");
  log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n", "cyan");

  log("📋 Resumo:\n", "cyan");
  log(`  Program ID: ${programId.toBase58()}`, "reset");
  log(`  RPC: http://127.0.0.1:8899`, "reset");
  log(`  User Wallet: ${userWallet.publicKey.toBase58()}`, "reset");
  log(`  Backend Wallet: ${backendWallet.publicKey.toBase58()}`, "reset");
  log(`  USDC Mint: ${usdcMint.toBase58()}`, "reset");
  log(`  Test Token Mint: ${testTokenMint.toBase58()}`, "reset");

  log("\n📝 Próximos Passos:\n", "yellow");
  log("  1. Importar wallet no Phantom/Solflare:", "reset");
  log(`     - Usar a chave privada de: ${userWalletPath}`, "reset");
  log(`     - Configurar RPC customizado: http://127.0.0.1:8899\n`, "reset");
  
  log("  2. Iniciar frontend:", "reset");
  log("     cd frontend && yarn dev\n", "reset");
  
  log("  3. Iniciar backend (opcional):", "reset");
  log("     cd backend && yarn dev\n", "reset");
  
  log("  4. Acessar: http://localhost:3000\n", "reset");

  log("💡 Dica: Para ver a chave privada no formato correto:", "yellow");
  log(`   cat ${userWalletPath}\n`, "reset");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erro:", error);
    process.exit(1);
  });
