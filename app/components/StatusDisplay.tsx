"use client";

import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useBotConfig } from "@/hooks/useBotConfig";

interface StatusDisplayProps {
  idl?: any;
}

export const StatusDisplay: FC<StatusDisplayProps> = ({ idl }) => {
  const { connected } = useWallet();
  const { botConfig, loading, exists } = useBotConfig(idl);

  if (!connected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center text-gray-400">
          Conecte sua carteira para ver o status do bot
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto" />
          <p className="text-gray-400 mt-2">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!exists || !botConfig) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center">
          <div className="text-yellow-500 text-4xl mb-2">⚠️</div>
          <h3 className="text-xl font-bold text-white mb-2">Bot não inicializado</h3>
          <p className="text-gray-400">
            Você precisa inicializar seu bot antes de começar a fazer trades
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Status do Bot</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400 text-sm">Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-3 h-3 rounded-full ${
                botConfig.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <p className="text-white font-semibold">
              {botConfig.isActive ? "Ativo" : "Inativo"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Trades Executados</p>
          <p className="text-white font-semibold text-lg mt-1">
            {botConfig.tradesExecuted.toString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Limite Máximo por Trade</p>
          <p className="text-white font-semibold mt-1">
            {(Number(botConfig.maxTradeAmount) / 1e9).toFixed(2)} tokens
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Slippage Máximo</p>
          <p className="text-white font-semibold mt-1">
            {(botConfig.maxSlippageBps / 100).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

