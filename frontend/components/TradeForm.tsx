"use client";

import { FC, useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Keypair } from "@solana/web3.js";
import { useBotConfig } from "@/hooks/useBotConfig";
import { useTrade } from "@/hooks/useTrade";
import BN from "bn.js";
import { DEFAULT_MAX_TRADE_AMOUNT, DEFAULT_MAX_SLIPPAGE_BPS, DEVNET_TOKENS } from "@/lib/constants";

interface TradeFormProps {
  idl?: any;
}

export const TradeForm: FC<TradeFormProps> = ({ idl }) => {
  const { connected } = useWallet();
  const { exists, botConfig } = useBotConfig(idl);
  const { 
    initializeBot, 
    updateConfig, 
    approveTokens, 
    revokeApproval,
    checkApproval,
    closeBot,
    loading, 
    error 
  } = useTrade(idl);

  // Estados para inicialização
  const [maxTradeAmount, setMaxTradeAmount] = useState(
    DEFAULT_MAX_TRADE_AMOUNT / 1e9
  );
  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE_BPS / 100);
  const [backendAuthority, setBackendAuthority] = useState("");
  const [approveAmount, setApproveAmount] = useState(10); // Default: 10 tokens

  // Estados para atualização
  const [isEditing, setIsEditing] = useState(false);
  const [isTokenApproved, setIsTokenApproved] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState("0");

  // Gerar keypair aleatório para demo (em produção, use uma chave backend real)
  useEffect(() => {
    if (!backendAuthority && connected) {
      // Por padrão, gera uma nova chave (apenas para demonstração)
      // Em produção, você usaria a chave pública real do seu backend
      const demoKeypair = Keypair.generate();
      setBackendAuthority(demoKeypair.publicKey.toBase58());
    }
  }, [connected, backendAuthority]);

  // Verificar aprovação ao conectar
  useEffect(() => {
    if (connected && exists) {
      checkTokenApprovalStatus();
    }
  }, [connected, exists]);

  const checkTokenApprovalStatus = async () => {
    try {
      console.log("🔍 Verificando status de aprovação do token...");
      const approval = await checkApproval(DEVNET_TOKENS.USDC);
      
      console.log("  - Is Approved:", approval.isApproved);
      console.log("  - Amount:", approval.amount.toString());
      console.log("  - Delegate:", approval.delegate?.toBase58());
      
      setIsTokenApproved(approval.isApproved);
      setApprovedAmount((Number(approval.amount) / 1e6).toFixed(2)); // Assuming 6 decimals
      
      if (approval.isApproved) {
        console.log("✅ Token está aprovado!");
      } else {
        console.log("❌ Token NÃO está aprovado");
      }
    } catch (err) {
      console.error("❌ Erro ao verificar aprovação:", err);
    }
  };

  const handleInitialize = async () => {
    if (!backendAuthority) {
      alert("Por favor, insira a chave pública do backend");
      return;
    }

    try {
      const backendPubkey = new PublicKey(backendAuthority);
      const amountLamports = new BN(maxTradeAmount * 1e9);
      const slippageBps = Math.floor(maxSlippage * 100);
      
      const signature = await initializeBot(backendPubkey, amountLamports, slippageBps);
      if (signature) {
        alert(`✅ Bot inicializado!\n\n🔑 Backend: ${backendAuthority}\n📝 Signature: ${signature}\n\n⚠️ PRÓXIMO PASSO: Aprove os tokens para o bot!`);
      }
    } catch (err) {
      alert(`Erro: ${err instanceof Error ? err.message : "Chave pública inválida"}`);
    }
  };

  const handleApprove = async () => {
    try {
      console.log("🔐 Iniciando aprovação de tokens...");
      const amountWithDecimals = BigInt(Math.floor(approveAmount * 1e6)); // USDC tem 6 decimais
      
      const signature = await approveTokens(DEVNET_TOKENS.USDC, amountWithDecimals);
      
      if (signature) {
        console.log("✅ Aprovação concluída com sucesso!");
        alert(`✅ Tokens aprovados!\n\n💰 Quantidade: ${approveAmount} USDC\n📝 Signature: ${signature}\n\n🤖 O bot agora pode executar trades automaticamente!`);
        
        // Aguardar um pouco antes de verificar o status
        console.log("⏳ Aguardando 2 segundos antes de verificar status...");
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verificar status de aprovação
        console.log("🔍 Verificando status de aprovação...");
        await checkTokenApprovalStatus();
      } else {
        console.error("❌ approveTokens retornou null");
        alert("❌ Erro ao aprovar tokens. Verifique o console para mais detalhes.");
      }
    } catch (err) {
      console.error("❌ Erro ao aprovar tokens:", err);
      alert(`❌ Erro ao aprovar tokens:\n\n${err instanceof Error ? err.message : "Erro desconhecido"}`);
    }
  };

  const handleRevoke = async () => {
    if (!confirm("Tem certeza que deseja revogar a aprovação? O bot não poderá mais executar trades.")) {
      return;
    }
    
    const signature = await revokeApproval(DEVNET_TOKENS.USDC);
    if (signature) {
      alert(`✅ Aprovação revogada!\n\n📝 Signature: ${signature}`);
      await checkTokenApprovalStatus();
    }
  };

  const handleClose = async () => {
    if (!confirm("⚠️ ATENÇÃO!\n\nIsso vai DELETAR permanentemente a conta do bot e devolver o rent (~0.002 SOL).\n\nVocê precisará inicializar novamente do zero.\n\nTem certeza?")) {
      return;
    }
    
    try {
      console.log("🗑️ Tentando deletar bot...");
      const signature = await closeBot();
      
      if (signature) {
        console.log("✅ Bot deletado! Signature:", signature);
        alert(`✅ Bot deletado com sucesso!\n\n📝 Signature: ${signature}\n\nRecarregando página...`);
        
        // Aguardar um pouco para garantir que a transação foi confirmada
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("❌ closeBot retornou null");
        alert("❌ Erro ao deletar bot. Verifique o console para mais detalhes.");
      }
    } catch (err) {
      console.error("❌ Erro ao deletar bot:", err);
      alert(`❌ Erro ao deletar bot:\n\n${err instanceof Error ? err.message : "Erro desconhecido"}`);
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
        <h3 className="text-xl font-bold text-white mb-4">🤖 Inicializar Bot</h3>
        <p className="text-gray-400 mb-6">
          Configure os limites iniciais para seu bot de trading
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              🔑 Backend Authority (Public Key)
            </label>
            <input
              type="text"
              value={backendAuthority}
              onChange={(e) => setBackendAuthority(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Backend public key (ex: 5xot9..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Esta é a chave que terá permissão para executar trades automaticamente
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              💰 Limite Máximo por Trade (tokens)
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
              📊 Slippage Máximo (%)
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
            disabled={loading || !backendAuthority}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Inicializando..." : "1️⃣ Inicializar Bot"}
          </button>

          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-3">
            <p className="text-blue-400 text-sm">
              ℹ️ Após inicializar, você precisará aprovar os tokens para o bot usar
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se existe mas não conseguiu carregar (estrutura antiga)
  if (exists && !botConfig) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">⚠️ Bot com Estrutura Antiga</h3>
        <div className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <p className="text-yellow-400 text-sm mb-2">
              O bot foi detectado mas não pode ser lido (provavelmente foi criado com uma versão antiga do contrato).
            </p>
            <p className="text-gray-400 text-sm">
              Você precisa deletar o bot antigo e criar um novo com a versão atualizada.
            </p>
          </div>

          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
            <h4 className="text-red-400 font-semibold mb-2">🗑️ Deletar Bot Antigo</h4>
            <p className="text-xs text-gray-400 mb-3">
              Isso irá remover a conta antiga e devolver o rent (~0.002 SOL).
            </p>
            <button
              onClick={handleClose}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? "Deletando..." : "🗑️ Deletar Bot e Começar do Zero"}
            </button>
          </div>
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
          {/* Status Section */}
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

          {/* Token Approval Section */}
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-semibold flex items-center gap-2">
                🔐 Aprovação de Tokens
              </h4>
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isTokenApproved 
                  ? "bg-green-500/20 text-green-400" 
                  : "bg-red-500/20 text-red-400"
              }`}>
                {isTokenApproved ? "✅ Aprovado" : "❌ Não Aprovado"}
              </div>
            </div>

            {isTokenApproved ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  💰 Quantidade aprovada: <span className="font-semibold text-green-400">{approvedAmount} USDC</span>
                </p>
                <button
                  onClick={handleRevoke}
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                >
                  Revogar Aprovação
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-400">
                  O bot precisa de aprovação para mover seus tokens
                </p>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Quantidade a aprovar (USDC)
                  </label>
                  <input
                    type="number"
                    value={approveAmount}
                    onChange={(e) => setApproveAmount(Number(e.target.value))}
                    className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="10"
                    step="1"
                    min="0"
                  />
                </div>
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
                >
                  {loading ? "Aprovando..." : "2️⃣ Aprovar Tokens"}
                </button>
              </div>
            )}
          </div>

          {/* Config Details */}
          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Limite por Trade</span>
            <span className="text-white">
              {botConfig ? (Number(botConfig.maxTradeAmount) / 1e9).toFixed(2) : "0"} tokens
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-700">
            <span className="text-gray-400">Slippage Máximo</span>
            <span className="text-white">
              {botConfig ? (botConfig.maxSlippageBps / 100).toFixed(2) : "0"}%
            </span>
          </div>

          {/* Danger Zone */}
          <div className="mt-6 pt-4 border-t border-red-900/50">
            <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              ⚠️ Zona de Perigo
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Deletar o bot irá remover a conta permanentemente e devolver o rent (~0.002 SOL).
            </p>
            <button
              onClick={handleClose}
              disabled={loading}
              className="w-full bg-red-900/30 hover:bg-red-900/50 border border-red-500 text-red-400 font-semibold py-2 px-4 rounded-lg transition-all disabled:opacity-50"
            >
              🗑️ Deletar Bot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

