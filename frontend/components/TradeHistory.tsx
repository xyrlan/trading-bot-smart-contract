"use client";

import { FC, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { getBotConfigPDA } from "@/lib/anchor-client";
import { TransactionHistory } from "@/lib/types";

interface TradeHistoryProps {
  idl?: unknown;
}

export const TradeHistory: FC<TradeHistoryProps> = ({ idl }) => {
  const { connected, publicKey } = useWallet();
  const { connection } = useConnection();
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected || !publicKey) {
      setTransactions([]);
      return;
    }

    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const [botConfigPDA] = getBotConfigPDA(publicKey);

        // Busca assinaturas de transações relacionadas ao PDA do bot
        const signatures = await connection.getSignaturesForAddress(
          botConfigPDA,
          { limit: 20 }
        );

        const txs: TransactionHistory[] = signatures.map((sig) => ({
          signature: sig.signature,
          timestamp: sig.blockTime || 0,
          type: "swap", // Idealmente, parseríamos a transação para determinar o tipo
          status: sig.err ? "error" : "success",
          details: sig.err,
        }));

        setTransactions(txs);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Atualiza a cada 10 segundos
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
  }, [connected, publicKey, connection]);

  if (!connected) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center text-gray-400">
          Conecte sua carteira para ver o histórico
        </div>
      </div>
    );
  }

  if (loading && transactions.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto" />
          <p className="text-gray-400 mt-2">Carregando histórico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Histórico de Transações</h3>

      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-5xl mb-3">📊</div>
          <p className="text-gray-400">Nenhuma transação encontrada</p>
          <p className="text-gray-500 text-sm mt-1">
            Execute seu primeiro trade para ver o histórico aqui
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((tx) => (
            <div
              key={tx.signature}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      tx.status === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-white font-medium capitalize">
                    {tx.type}
                  </span>
                </div>
                <span className="text-gray-400 text-sm">
                  {tx.timestamp
                    ? new Date(tx.timestamp * 1000).toLocaleString("pt-BR")
                    : "Pendente"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <a
                  href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 text-sm font-mono transition-colors"
                >
                  {tx.signature.slice(0, 8)}...{tx.signature.slice(-8)}
                </a>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    tx.status === "success"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {tx.status === "success" ? "Sucesso" : "Erro"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

