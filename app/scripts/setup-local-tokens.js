const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { createMint, getOrCreateAssociatedTokenAccount, mintTo } = require("@solana/spl-token");
const fs = require("fs");
const os = require("os");
const path = require("path");

async function main() {
  // 1. Conectar ao Localhost
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  console.log("🔌 Conectado ao validador local");

  // 2. Carregar a carteira padrão do Solana (id.json)
  const homeDir = os.homedir();
  const keypairPath = path.join(homeDir, ".config", "solana", "id.json");
  
  if (!fs.existsSync(keypairPath)) {
    throw new Error(`Carteira não encontrada em ${keypairPath}. Rode 'solana-keygen new' primeiro.`);
  }

  const secretKey = Uint8Array.from(JSON.parse(fs.readFileSync(keypairPath, "utf-8")));
  const payer = Keypair.fromSecretKey(secretKey);
  console.log(`🔑 Usando carteira: ${payer.publicKey.toString()}`);

  // 3. Criar o Mint do "USDC Fake" (6 decimais, igual ao USDC real)
  console.log("🔨 Criando token 'Mock USDC'...");
  const usdcMint = await createMint(
    connection,
    payer,              // Quem paga as taxas
    payer.publicKey,    // Mint Authority
    null,               // Freeze Authority
    6                   // Decimais (USDC usa 6)
  );

  console.log(`✅ Mint criado: ${usdcMint.toString()}`);

  // IMPORTANTE: Substitua pela public key da SUA carteira (a que está conectada no navegador)
  const browserWallet = new PublicKey("3KkQUZvJnWXTmZiTx8LvF3ucLkcgcNNA5F7z9afz4m3U");

  // 4. Criar conta de token para a sua carteira
  console.log(`📦 Criando conta de token para ${browserWallet.toString()}...`);
  const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    usdcMint,
    browserWallet
  );

  console.log(`✅ Conta criada: ${payerTokenAccount.address.toString()}`);

  // 5. Cunhar (Mint) tokens para você testar (Ex: 10,000 USDC)
  console.log("💰 Mintando 10,000 USDC...");
  const amountToMint = 10_000 * 1_000_000; // 10k com 6 decimais
  await mintTo(
    connection,
    payer,
    usdcMint,
    payerTokenAccount.address,
    payer,
    amountToMint
  );

  console.log(`✅ Enviado 10,000 USDC Fake para sua carteira.`);
  console.log("");
  console.log("===================================================");
  console.log("📋 ATUALIZE O ARQUIVO app/lib/constants.ts:");
  console.log("");
  console.log("Substitua a linha do USDC por:");
  console.log("");
  console.log(`  USDC: NETWORK === "localnet"`);
  console.log(`    ? new PublicKey("${usdcMint.toString()}")`);
  console.log(`    : new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),`);
  console.log("");
  console.log("===================================================");
  console.log("");
  console.log("🎉 Setup concluído!");
  console.log("");
  console.log("Próximos passos:");
  console.log("  1. Atualize app/lib/constants.ts com o mint acima");
  console.log("  2. Recarregue o frontend (F5)");
  console.log("  3. Tente aprovar tokens novamente");
  console.log("");
}

main().catch((err) => {
  console.error("❌ Erro:", err);
  process.exit(1);
});

