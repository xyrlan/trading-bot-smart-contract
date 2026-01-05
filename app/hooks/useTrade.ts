import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { useProgram } from "./useProgram";
import { useBotConfig } from "./useBotConfig";
import { TradeParams } from "@/lib/types";
import { Idl } from "@coral-xyz/anchor";
import { 
  approveTokensForBot, 
  revokeTokenApproval, 
  checkTokenApproval 
} from "@/lib/token-delegation";

/**
 * Hook para executar operações de trading
 */
export function useTrade(idl?: Idl) {
  const wallet = useAnchorWallet();
  const { program } = useProgram(idl);
  const { botConfigPDA } = useBotConfig(idl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Inicializa o bot de trading para o usuário
   * 
   * VERSÃO CORRIGIDA: Usa getAccountInfo para verificação robusta
   * 
   * @param backendAuthority - Public key do backend autorizado a executar trades
   * @param maxTradeAmount - Quantidade máxima por trade
   * @param maxSlippageBps - Slippage máximo em basis points
   */
  const initializeBot = async (
    backendAuthority: PublicKey,
    maxTradeAmount: BN,
    maxSlippageBps: number
  ): Promise<string | null> => {
    if (!program || !wallet || !botConfigPDA) {
      setError("Wallet ou programa não conectado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Verificar se já existe usando método robusto
      const connection = program.provider.connection;
      const accountInfo = await connection.getAccountInfo(botConfigPDA);
      const botExists = accountInfo !== null;

      if (botExists) {
        console.log("⚠️ Bot já inicializado para esta carteira");
        setError("Bot já inicializado! Use a seção de configuração para atualizar.");
        return null;
      }

      console.log("🆕 Inicializando novo bot...");

      const tx = await program.methods
        .initializeBot(
          backendAuthority,
          maxTradeAmount,
          maxSlippageBps
        )
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log(`✅ Bot initialized! Backend authority: ${backendAuthority.toBase58()}`);
      return tx;
    } catch (err) {
      console.error("Erro ao inicializar bot:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao inicializar bot";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Executa um swap de tokens
   */
  const executeSwap = async (
    params: TradeParams
  ): Promise<string | null> => {
    if (!program || !wallet || !botConfigPDA) {
      setError("Wallet ou programa não conectado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Aqui você precisaria derivar as contas de token do usuário
      // Por enquanto, este é um placeholder que assume que você tem os endereços
      const tx = await program.methods
        .executeSwap(params.amountIn, params.minimumAmountOut)
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
          userTokenIn: params.tokenIn, // Deveria ser a conta de token, não o mint
          userTokenOut: params.tokenOut, // Deveria ser a conta de token, não o mint
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      return tx;
    } catch (err) {
      console.error("Erro ao executar swap:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao executar swap";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Atualiza a configuração do bot
   */
  const updateConfig = async (
    maxTradeAmount?: BN,
    maxSlippageBps?: number,
    isActive?: boolean
  ): Promise<string | null> => {
    if (!program || !wallet || !botConfigPDA) {
      setError("Wallet ou programa não conectado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const tx = await program.methods
        .updateConfig(
          maxTradeAmount || null,
          maxSlippageBps !== undefined ? maxSlippageBps : null,
          isActive !== undefined ? isActive : null
        )
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
        })
        .rpc();

      return tx;
    } catch (err) {
      console.error("Erro ao atualizar config:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar configuração";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Aprova tokens para a PDA do bot gastar
   * 
   * @param tokenMint - Endereço do token (ex: USDC)
   * @param amount - Quantidade máxima que o bot pode gastar
   */
  const approveTokens = async (
    tokenMint: PublicKey,
    amount: number | bigint
  ): Promise<string | null> => {
    if (!program || !wallet) {
      setError("Wallet ou programa não conectado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const signature = await approveTokensForBot(
        program.provider.connection,
        wallet,
        tokenMint,
        amount,
        program.programId
      );

      console.log(`✅ Tokens approved! Signature: ${signature}`);
      return signature;
    } catch (err) {
      console.error("Erro ao aprovar tokens:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao aprovar tokens";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Revoga a aprovação de tokens
   * 
   * @param tokenMint - Endereço do token
   */
  const revokeApproval = async (
    tokenMint: PublicKey
  ): Promise<string | null> => {
    if (!program || !wallet) {
      setError("Wallet ou programa não conectado");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const signature = await revokeTokenApproval(
        program.provider.connection,
        wallet,
        tokenMint
      );

      console.log(`✅ Approval revoked! Signature: ${signature}`);
      return signature;
    } catch (err) {
      console.error("Erro ao revogar aprovação:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro ao revogar aprovação";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Verifica se há aprovação ativa
   * 
   * @param tokenMint - Endereço do token
   */
  const checkApproval = async (tokenMint: PublicKey) => {
    if (!program || !wallet) {
      return { isApproved: false, amount: 0n, delegate: null };
    }

    try {
      return await checkTokenApproval(
        program.provider.connection,
        wallet.publicKey,
        tokenMint,
        program.programId
      );
    } catch (err) {
      console.error("Erro ao verificar aprovação:", err);
      return { isApproved: false, amount: 0n, delegate: null };
    }
  };

  /**
   * Fecha a conta do bot e devolve o rent ao owner
   * Útil para resetar o bot ou recuperar SOL
   */
  const closeBot = async (): Promise<string | null> => {
    if (!program || !wallet || !botConfigPDA) {
      const msg = "Wallet ou programa não conectado";
      console.error("❌", msg);
      setError(msg);
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Preparando transação closeBot...");
      console.log("  - Bot Config PDA:", botConfigPDA.toBase58());
      console.log("  - Owner:", wallet.publicKey.toBase58());
      console.log("  - Program ID:", program.programId.toBase58());

      const tx = await program.methods
        .closeBot()
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
        })
        .rpc();

      console.log(`✅ Bot fechado com sucesso! Signature: ${tx}`);
      console.log(`🔗 Explorer: https://explorer.solana.com/tx/${tx}?cluster=devnet`);
      return tx;
    } catch (err) {
      console.error("❌ Erro ao fechar bot:", err);
      
      // Log detalhado do erro
      if (err instanceof Error) {
        console.error("  - Message:", err.message);
        console.error("  - Stack:", err.stack);
      }
      
      const errorMessage = err instanceof Error ? err.message : "Erro ao fechar bot";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    initializeBot,
    executeSwap,
    updateConfig,
    approveTokens,
    revokeApproval,
    checkApproval,
    closeBot,
    loading,
    error,
  };
}

