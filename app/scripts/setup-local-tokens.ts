import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import fs from "fs";
import os from "os";
import path from "path";

async function main() {
  // 1. Conectar ao Localhost
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");
  console.log("🔌 Conectado ao validador local");

  // 2. Carregar a carteira padrão do Solana (id.json)
  // Geralmente fica em ~/.config/solana/id.json
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

  const browserWallet = new PublicKey("3KkQUZvJnWXTmZiTx8LvF3ucLkcgcNNA5F7z9afz4m3U");

  // 4. Criar conta de token para a sua carteira
  const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    usdcMint,
    browserWallet
  );

  // 5. Cunhar (Mint) tokens para você testar (Ex: 10,000 USDC)
  const amountToMint = 10_000 * 1_000_000; // 10k com 6 decimais
  await mintTo(
    connection,
    payer,
    usdcMint,
    payerTokenAccount.address,
    payer,
    amountToMint
  );

  console.log(`💰 Enviado 10,000 USDC Fake para sua carteira.`);
  console.log("---------------------------------------------------");
  console.log("📋 COPIE O ENDEREÇO ABAIXO PARA O SEU FRONTEND:");
  console.log("");
  console.log(`export const MOCK_USDC_MINT = new PublicKey("${usdcMint.toString()}");`);
  console.log("");
  console.log("---------------------------------------------------");
}

main().catch((err) => {
  console.error(err);
});