import { useMemo } from "react";
import { useConnection, useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl } from "@coral-xyz/anchor";
import { PROGRAM_ID } from "@/lib/constants";
import { getProvider } from "@/lib/anchor-client";

/**
 * Hook para obter a instância do programa Anchor
 * Requer que o IDL seja carregado (após anchor build)
 */
export function useProgram(idl?: Idl) {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  const provider = useMemo(() => {
    if (!wallet) return null;
    return getProvider(connection, wallet);
  }, [connection, wallet]);

  const program = useMemo(() => {
    if (!provider || !idl) return null;
    return new Program(idl, provider);
  }, [provider, idl]);

  return {
    program,
    provider,
    connection,
    wallet,
    programId: PROGRAM_ID,
  };
}

