/**
 * Funções para gerenciar delegação de tokens (approve/revoke)
 * para permitir que a PDA do bot mova tokens do usuário
 */

import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  createApproveInstruction,
  createRevokeInstruction,
  getAssociatedTokenAddress,
  AccountLayout,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Program } from "@coral-xyz/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";

/**
 * Aprova a PDA do bot para gastar tokens do usuário
 * 
 * @param connection - Conexão com a Solana
 * @param wallet - Wallet do usuário
 * @param tokenMint - Endereço do token (ex: USDC)
 * @param amount - Quantidade máxima que o bot pode gastar
 * @param programId - ID do programa do bot
 * @returns Assinatura da transação
 */
export async function approveTokensForBot(
  connection: Connection,
  wallet: AnchorWallet,
  tokenMint: PublicKey,
  amount: number | bigint,
  programId: PublicKey
): Promise<string> {
  console.log("🔄 Iniciando approve de tokens...");
  
  if (!wallet.publicKey) {
    throw new Error("Wallet não conectada");
  }

  // 1. Calcular o endereço da PDA (bot_config)
  const [botConfigPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), wallet.publicKey.toBuffer()],
    programId
  );
  console.log("  - Bot Config PDA:", botConfigPDA.toBase58());

  // 2. Obter a conta de token do usuário (ATA)
  const userTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey
  );
  console.log("  - User Token Account:", userTokenAccount.toBase58());
  console.log("  - Token Mint:", tokenMint.toBase58());
  console.log("  - Amount:", amount.toString());

  // Verificar se a conta de token existe
  const accountInfo = await connection.getAccountInfo(userTokenAccount);
  if (!accountInfo) {
    throw new Error(
      `❌ Você não tem uma conta para este token!\n\n` +
      `Token: ${tokenMint.toBase58()}\n` +
      `Você precisa criar uma Associated Token Account (ATA) primeiro.\n\n` +
      `Tente enviar/receber esse token uma vez para criar a conta.`
    );
  }
  console.log("  ✅ Token account existe");

  // 3. Criar instrução de approve
  const approveIx = createApproveInstruction(
    userTokenAccount, // Conta do usuário
    botConfigPDA, // Delegate (a PDA do bot)
    wallet.publicKey, // Owner (usuário assina)
    BigInt(amount), // Quantidade autorizada
    [], // Signers adicionais (nenhum)
    TOKEN_PROGRAM_ID
  );

  // 4. Criar e enviar transação
  const tx = new Transaction().add(approveIx);
  
  // Obter blockhash recente
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet.publicKey;

  console.log("  📤 Enviando transação...");

  // Assinar e enviar
  const signedTx = await wallet.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  
  console.log("  ⏳ Aguardando confirmação...");
  console.log("  📝 Signature:", signature);
  
  // Confirmar transação
  await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight,
  });

  console.log(`✅ Tokens aprovados com sucesso!`);
  console.log(`🔗 Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`);
  return signature;
}

/**
 * Revoga a aprovação da PDA do bot
 * 
 * @param connection - Conexão com a Solana
 * @param wallet - Wallet do usuário
 * @param tokenMint - Endereço do token
 * @returns Assinatura da transação
 */
export async function revokeTokenApproval(
  connection: Connection,
  wallet: AnchorWallet,
  tokenMint: PublicKey
): Promise<string> {
  if (!wallet.publicKey) {
    throw new Error("Wallet não conectada");
  }

  // Obter a conta de token do usuário
  const userTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey
  );

  // Criar instrução de revoke
  const revokeIx = createRevokeInstruction(
    userTokenAccount,
    wallet.publicKey,
    [],
    TOKEN_PROGRAM_ID
  );

  // Criar e enviar transação
  const tx = new Transaction().add(revokeIx);
  
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.feePayer = wallet.publicKey;

  const signedTx = await wallet.signTransaction(tx);
  const signature = await connection.sendRawTransaction(signedTx.serialize());
  
  await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight,
  });

  console.log(`✅ Revoked token approval. Signature: ${signature}`);
  return signature;
}

/**
 * Verifica se há aprovação ativa para a PDA do bot
 * 
 * @param connection - Conexão com a Solana
 * @param userPublicKey - Public key do usuário
 * @param tokenMint - Endereço do token
 * @param programId - ID do programa do bot
 * @returns Objeto com informações sobre a aprovação
 */
export async function checkTokenApproval(
  connection: Connection,
  userPublicKey: PublicKey,
  tokenMint: PublicKey,
  programId: PublicKey
): Promise<{
  isApproved: boolean;
  amount: bigint;
  delegate: PublicKey | null;
}> {
  try {
    // Calcular PDA do bot
    const [botConfigPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("bot_config"), userPublicKey.toBuffer()],
      programId
    );

    // Obter a conta de token do usuário
    const userTokenAccount = await getAssociatedTokenAddress(
      tokenMint,
      userPublicKey
    );

    // Buscar informações da conta de token
    const accountInfo = await connection.getAccountInfo(userTokenAccount);
    
    if (!accountInfo) {
      return { isApproved: false, amount: 0n, delegate: null };
    }

    // Parse dos dados usando o Layout oficial do SPL Token
    const decodedAccount = AccountLayout.decode(accountInfo.data);

    // O campo delegateOption é uma enum (0 = None, 1 = Some)
    const hasDelegate = decodedAccount.delegateOption === 1;
    
    if (!hasDelegate) {
      return { isApproved: false, amount: 0n, delegate: null };
    }

    const delegate = decodedAccount.delegate;
    const amount = decodedAccount.delegatedAmount;
    const isApproved = delegate.equals(botConfigPDA);

    return { isApproved, amount, delegate };
  } catch (error) {
    console.error("Error checking token approval:", error);
    return { isApproved: false, amount: 0n, delegate: null };
  }
}

/**
 * Cria uma transação combinada de inicialização + approve
 * 
 * VERSÃO CORRIGIDA: Usa getAccountInfo para verificação robusta
 * - getAccountInfo apenas verifica se a conta existe na blockchain
 * - Não tenta deserializar dados (evita erros com estruturas antigas)
 * 
 * @param program - Programa Anchor
 * @param wallet - Wallet do usuário
 * @param backendAuthority - Public key do backend autorizado
 * @param maxTradeAmount - Quantidade máxima por trade
 * @param maxSlippageBps - Slippage máximo em basis points
 * @param tokenMint - Token a ser aprovado
 * @param approveAmount - Quantidade a aprovar
 * @param botConfigPDA - PDA da configuração do bot
 * @returns Assinatura da transação
 */
export async function initializeAndApprove(
  program: Program,
  wallet: AnchorWallet,
  backendAuthority: PublicKey,
  maxTradeAmount: bigint,
  maxSlippageBps: number,
  tokenMint: PublicKey,
  approveAmount: bigint,
  botConfigPDA: PublicKey
): Promise<string> {
  const connection = program.provider.connection;
  const transaction = new Transaction();

  console.log("🔍 Verificando existência da conta (Raw check)...");

  // 1. Verificar se a conta do bot JÁ existe (Método Seguro)
  // getAccountInfo retorna null se a conta não existir.
  // Se retornar objeto, a conta existe (mesmo que os dados estejam velhos).
  const accountInfo = await connection.getAccountInfo(botConfigPDA);
  const botExists = accountInfo !== null;

  if (botExists) {
    console.log("⚠️ Conta do bot encontrada na blockchain. ID:", botConfigPDA.toBase58());
  } else {
    console.log("🆕 Conta livre. Prosseguindo com criação.");
  }

  // 2. Se NÃO existe, adiciona a instrução de inicialização
  if (!botExists) {
    const initIx = await program.methods
      .initializeBot(backendAuthority, maxTradeAmount, maxSlippageBps)
      .accounts({
        botConfig: botConfigPDA,
        owner: wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .instruction();
    transaction.add(initIx);
    console.log("➕ Instrução de inicialização adicionada");
  } else {
    console.log("ℹ️ Bot já existe. Apenas aprovando tokens...");
  }

  // 3. Adiciona a instrução de Approve (sempre necessária)
  const userTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey
  );

  const approveIx = createApproveInstruction(
    userTokenAccount,
    botConfigPDA,
    wallet.publicKey,
    approveAmount,
    [],
    TOKEN_PROGRAM_ID
  );
  transaction.add(approveIx);
  console.log("➕ Instrução de approve adicionada");

  // 4. Enviar Transação
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = wallet.publicKey;

  try {
    const signedTx = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTx.serialize());
    
    await connection.confirmTransaction({
      signature,
      blockhash,
      lastValidBlockHeight,
    });

    const action = botExists ? "Tokens approved" : "Bot initialized and tokens approved";
    console.log(`✅ ${action}! Signature: ${signature}`);
    return signature;
  } catch (error) {
    console.error("❌ Erro na transação:", error);
    throw error;
  }
}

