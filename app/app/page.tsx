"use client";

import { WalletConnect } from "@/components/WalletConnect";
import { StatusDisplay } from "@/components/StatusDisplay";
import { TradeForm } from "@/components/TradeForm";
import { TradeHistory } from "@/components/TradeHistory";
import idl from "@/lib/idl.json";
import { Idl } from "@coral-xyz/anchor";

export default function Home() {
  // IDL carregado do build do Anchor
  const programIdl = idl as Idl;

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Trading Bot</h1>
                <p className="text-xs text-gray-400">Solana • Não-custodial</p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trading Algorítmico{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
              Descentralizado
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Configure seu bot de trading, mantenha controle total de seus ativos
            e execute trades automatizados na Raydium DEX
          </p>
        </div>

        {/* Alert */}
        <div className="mb-8 bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-yellow-400 font-semibold mb-1">
                MVP em Desenvolvimento - Devnet Apenas
              </h3>
              <p className="text-gray-300 text-sm">
                Este é um MVP para demonstração. Use apenas em devnet com fundos de
                teste. A integração completa com Raydium ainda está em desenvolvimento.
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StatusDisplay idl={programIdl} />
          <TradeForm idl={programIdl} />
        </div>

        {/* Trade History */}
        <TradeHistory idl={programIdl} />

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-white font-semibold mb-2">Não-Custodial</h3>
            <p className="text-gray-400 text-sm">
              Seus fundos permanecem sempre em sua carteira. Você mantém controle
              total de seus ativos.
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">Solana</h3>
            <p className="text-gray-400 text-sm">
              Transações rápidas e taxas baixíssimas (~$0.00025 por transação).
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-white font-semibold mb-2">Transparente</h3>
            <p className="text-gray-400 text-sm">
              Todas as operações são registradas na blockchain e auditáveis.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>
            Trading Bot MVP • Solana Devnet •{" "}
            <a
              href="https://github.com"
              className="text-purple-400 hover:text-purple-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
          <p className="mt-2">
            ⚠️ Este projeto é apenas para fins educacionais. Use por sua conta e
            risco.
          </p>
        </div>
      </footer>
    </div>
  );
}
