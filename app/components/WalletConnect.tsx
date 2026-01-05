"use client";

import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletConnect: FC = () => {
  const { connected, publicKey } = useWallet();

  return (
    <div className="flex items-center gap-4">
      {connected && publicKey && (
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-300">
            {publicKey.toString().slice(0, 4)}...
            {publicKey.toString().slice(-4)}
          </span>
        </div>
      )}
      <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 hover:!from-purple-700 hover:!to-blue-700" />
    </div>
  );
};

