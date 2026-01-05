import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import BN from "bn.js";
import { useProgram } from "./useProgram";
import { useBotConfig } from "./useBotConfig";
import { TradeParams } from "@/lib/types";
import { Idl } from "@coral-xyz/anchor";

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
   */
  const initializeBot = async (
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

      const tx = await program.methods
        .initializeBot(maxTradeAmount, maxSlippageBps)
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

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

  return {
    initializeBot,
    executeSwap,
    updateConfig,
    loading,
    error,
  };
}

