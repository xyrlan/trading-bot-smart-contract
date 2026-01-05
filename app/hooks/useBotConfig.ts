import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { getBotConfigPDA } from "@/lib/anchor-client";
import { BotConfig } from "@/lib/types";
import { useProgram } from "./useProgram";
import { Idl } from "@coral-xyz/anchor";

/**
 * Hook para buscar e monitorar a configuração do bot do usuário
 * 
 * @param idl - IDL do programa (gerado após `anchor build`)
 */
export function useBotConfig(idl?: Idl) {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const { program } = useProgram(idl);
  const [botConfig, setBotConfig] = useState<BotConfig | null>(null);
  const [botConfigPDA, setBotConfigPDA] = useState<PublicKey | null>(null);
  const [loading, setLoading] = useState(false);
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!wallet?.publicKey) {
      setBotConfig(null);
      setBotConfigPDA(null);
      setExists(false);
      return;
    }

    const [pda] = getBotConfigPDA(wallet.publicKey);
    setBotConfigPDA(pda);

    if (!program) return;

    const fetchBotConfig = async () => {
      try {
        setLoading(true);
        
        // Primeiro, verificar se a conta existe usando método robusto
        const accountInfo = await connection.getAccountInfo(pda);
        
        if (!accountInfo) {
          // Conta não existe
          setBotConfig(null);
          setExists(false);
          return;
        }

        // Conta existe, tentar buscar dados
        setExists(true);
        
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const config = await (program.account as any).tradeBotConfig.fetch(pda);
          setBotConfig(config as BotConfig);
        } catch (fetchError) {
          // Conta existe mas não consegue deserializar (estrutura antiga?)
          console.warn("Conta existe mas não pode ser deserializada. Pode ser estrutura antiga.");
          setBotConfig(null);
          // Manter exists = true para mostrar opções de gerenciamento
        }
      } catch (error) {
        console.error("Erro ao buscar bot config:", error);
        setBotConfig(null);
        setExists(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBotConfig();

    // Subscrever para atualizações
    const subscriptionId = connection.onAccountChange(
      pda,
      () => {
        fetchBotConfig();
      },
      "confirmed"
    );

    return () => {
      connection.removeAccountChangeListener(subscriptionId);
    };
  }, [wallet?.publicKey, program, connection]);

  return {
    botConfig,
    botConfigPDA,
    loading,
    exists,
  };
}

