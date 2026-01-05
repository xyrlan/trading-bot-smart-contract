"use client";

import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useBotConfig } from "@/hooks/useBotConfig";
import { useTrade } from "@/hooks/useTrade";
import BN from "bn.js";
import { DEFAULT_MAX_TRADE_AMOUNT, DEFAULT_MAX_SLIPPAGE_BPS } from "@/lib/constants";

interface TradeFormProps {
  idl?: any;
}

export const TradeForm: FC<TradeFormProps> = ({ idl }) => {
  const { connected } = useWallet();
  const { exists, botConfig } = useBotConfig(idl);
  const { initializeBot, updateConfig, loading, error } = useTrade(idl);

  // Estados para inicialização
  const [maxTradeAmount, setMaxTradeAmount] = useState(
    DEFAULT_MAX_TRADE_AMOUNT / 1e9
  );
  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE_BPS / 100);

  // Estados para atualização
  const [isEditing, setIsEditing] = useState(false);

  const handleInitialize = async () => {
    const amountLamports = new BN(maxTradeAmount * 1e9);
    const slippageBps = Math.floor(maxSlippage * 100);
    
    const signature = await initializeBot(amountLamports, slippageBps);
    if (signature) {
      alert(`Bot inicializado! Signature: ${signature}`);
    }
  };

  const handleUpdate = async () => {
    const amountLamports = new BN(maxTradeAmount * 1e9);
    const slippageBps = Math.floor(maxSlippage * 100);
    
    const signature = await updateConfig(amountLamports, slippageBps, undefined);
    if (signature) {
      alert(`Configuração atualizada! Signature: ${signature}`);
      setIsEditing(false);
    }
  };

  const handleToggleActive = async () => {
    if (!botConfig) return;
    const signature = await updateConfig(undefined, undefined, !botConfig.isActive);
    if (signature) {
      alert(`Bot ${!botConfig.isActive ? "ativado" : "desativado"}! Signature: ${signature}`);
    }
  };

  if (!connected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center text-gray-400">
          Conecte sua carteira para configurar o bot
        </div>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Inicializar Bot</h3>
        <p className="text-gray-400 mb-6">
          Configure os limites iniciais para seu bot de trading
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Limite Máximo por Trade (tokens)
            </label>
            <input
              type="number"
              value={maxTradeAmount}
              onChange={(e) => setMaxTradeAmount(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="1.0"
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slippage Máximo (%)
            </label>
            <input
              type="number"
              value={maxSlippage}
              onChange={(e) => setMaxSlippage(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="5.0"
              step="0.1"
              min="0"
              max="100"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleInitialize}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Inicializando..." : "Inicializar Bot"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Configuração do Bot</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          {isEditing ? "Cancelar" : "Editar"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Limite Máximo por Trade (tokens)
            </label>
            <input
              type="number"
              value={maxTradeAmount}
              onChange={(e) => setMaxTradeAmount(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slippage Máximo (%)
            </label>
            <input
              type="number"
              value={maxSlippage}
              onChange={(e) => setMaxSlippage(Number(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              step="0.1"
              min="0"
              max="100"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Atualizando..." : "Salvar Alterações"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Status</span>
            <div className="flex items-center gap-3">
              <span className={botConfig?.isActive ? "text-green-400" : "text-red-400"}>
                {botConfig?.isActive ? "Ativo" : "Inativo"}
              </span>
              <button
                onClick={handleToggleActive}
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1 px-3 rounded transition-colors disabled:opacity-50"
              >
                {botConfig?.isActive ? "Desativar" : "Ativar"}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Limite por Trade</span>
            <span className="text-white">
              {botConfig ? (Number(botConfig.maxTradeAmount) / 1e9).toFixed(2) : "0"} tokens
            </span>
          </div>

          <div className="flex justify-between items-center py-3">
            <span className="text-gray-400">Slippage Máximo</span>
            <span className="text-white">
              {botConfig ? (botConfig.maxSlippageBps / 100).toFixed(2) : "0"}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

