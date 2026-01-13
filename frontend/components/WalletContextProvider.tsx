"use client";

import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { RPC_ENDPOINT } from "@/lib/constants";

// CSS padrão do wallet adapter
import "@solana/wallet-adapter-react-ui/styles.css";

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({
  children,
}) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      // Adicione outros wallets aqui:
      // new SolflareWalletAdapter(),
      // new BackpackWalletAdapter(),
    ],
    []
  );

  // Configuração otimizada para melhor performance
  const connectionConfig = useMemo(() => ({
    commitment: 'processed' as const,
    confirmTransactionInitialTimeout: 60000,
  }), []);

  return (
    <ConnectionProvider 
      endpoint={RPC_ENDPOINT}
      config={connectionConfig}
    >
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

