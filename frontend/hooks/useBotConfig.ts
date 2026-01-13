import { useEffect, useState, useRef } from "react";
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
  const [loading, setLoading] = useState(true); // Começa como true
  const [exists, setExists] = useState(false);
  const fetchedRef = useRef(false); // Prevenir múltiplas chamadas

  useEffect(() => {
    if (!wallet?.publicKey) {
      setBotConfig(null);
      setBotConfigPDA(null);
      setExists(false);
      setLoading(false);
      fetchedRef.current = false;
      return;
    }

    const [pda] = getBotConfigPDA(wallet.publicKey);
    setBotConfigPDA(pda);

    if (!program) {
      setLoading(false);
      return;
    }

    // Se já buscou, não buscar novamente
    if (fetchedRef.current) {
      return;
    }
    fetchedRef.current = true;

    const fetchBotConfig = async () => {
      const startTime = Date.now();
      try {
        setLoading(true);
        console.log('🔍 Fetching bot config for PDA:', pda.toBase58());
        
        // Usar commitment 'processed' para ser mais rápido
        const accountInfo = await connection.getAccountInfo(pda, 'processed');
        const fetchTime = Date.now() - startTime;
        console.log(`📦 Account info fetched in ${fetchTime}ms:`, accountInfo ? 'exists' : 'not found');
        
        if (!accountInfo) {
          console.log('❌ Bot not initialized');
          setBotConfig(null);
          setExists(false);
          setLoading(false);
          return;
        }

        console.log('✅ Bot account exists');
        setExists(true);
        
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const config = await (program.account as any).tradeBotConfig.fetch(pda);
          const totalTime = Date.now() - startTime;
          console.log(`✅ Bot config fetched successfully in ${totalTime}ms`);
          setBotConfig(config as BotConfig);
        } catch (fetchError) {
          console.warn("⚠️  Conta existe mas não pode ser deserializada:", fetchError);
          setBotConfig(null);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar bot config:", error);
        setBotConfig(null);
        setExists(false);
      } finally {
        const totalTime = Date.now() - startTime;
        console.log(`✅ fetchBotConfig completed in ${totalTime}ms, setting loading to false`);
        setLoading(false);
      }
    };

    fetchBotConfig().catch(err => {
      console.error('❌ Uncaught error in fetchBotConfig:', err);
      setLoading(false);
    });

    // Não subscrever para atualizações - isso causa overhead desnecessário
    // A subscription será removida para melhorar performance
  }, [wallet?.publicKey, program]);

  return {
    botConfig,
    botConfigPDA,
    loading,
    exists,
  };
}

