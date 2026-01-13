'use client';

import { FC, useState } from 'react';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { SystemProgram } from '@solana/web3.js';
import { useProgram } from '@/hooks/useProgram';
import { useBotConfig } from '@/hooks/useBotConfig';
import BN from 'bn.js';
import { toast } from 'sonner';
import { Loader2, ArrowRightLeft } from 'lucide-react';
import idl from '@/lib/idl.json';
import { Idl } from '@coral-xyz/anchor';

export const SwapTest: FC = () => {
  const wallet = useAnchorWallet();
  const programIdl = idl as Idl;
  const { program } = useProgram(programIdl);
  const { botConfigPDA, botConfig } = useBotConfig(programIdl);
  
  const [amountIn, setAmountIn] = useState('0.001');
  const [minAmountOut, setMinAmountOut] = useState('0');
  const [loading, setLoading] = useState(false);
  const [lastTxSignature, setLastTxSignature] = useState<string | null>(null);
  const [updatingBackend, setUpdatingBackend] = useState(false);

  const handleUpdateBackendAuthority = async () => {
    if (!program || !wallet || !botConfigPDA) {
      toast.error('Wallet ou programa não conectado');
      return;
    }

    try {
      setUpdatingBackend(true);

      // Passo 1: Fechar o bot atual
      console.log('🗑️  Fechando bot atual...');
      toast.info('Fechando bot atual...', { duration: 2000 });
      
      const closeTx = await program.methods
        .closeBot()
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
        })
        .rpc();

      console.log('✅ Bot fechado! TX:', closeTx);
      
      // Aguardar confirmação
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Passo 2: Re-inicializar com nova backend authority
      console.log('🔄 Re-inicializando bot com sua wallet como backend...');
      toast.info('Re-inicializando bot...', { duration: 2000 });
      
      const initTx = await program.methods
        .initializeBot(
          wallet.publicKey, // Usar sua própria wallet como backend
          botConfig!.maxTradeAmount,
          botConfig!.maxSlippageBps
        )
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log('✅ Bot re-inicializado! TX:', initTx);
      
      toast.success('Bot re-inicializado com sucesso!', {
        description: 'Agora você pode executar swaps',
        duration: 4000,
      });

      // Aguardar e recarregar
      setTimeout(() => window.location.reload(), 2000);

    } catch (err) {
      console.error('❌ Erro ao atualizar backend:', err);
      if (err instanceof Error) {
        toast.error(`Erro: ${err.message}`);
      } else {
        toast.error('Erro ao atualizar backend authority');
      }
    } finally {
      setUpdatingBackend(false);
    }
  };

  const handleAuthorizeSwap = async () => {
    if (!program || !wallet || !botConfigPDA) {
      toast.error('Wallet ou programa não conectado');
      return;
    }

    try {
      setLoading(true);
      setLastTxSignature(null);

      // Converter valores para lamports (assumindo 9 decimals)
      const amountInLamports = new BN(parseFloat(amountIn) * 1e9);
      const minAmountOutLamports = new BN(parseFloat(minAmountOut) * 1e9);

      console.log('🔄 Autorizando swap...');
      console.log('  - Amount In:', amountInLamports.toString(), 'lamports');
      console.log('  - Min Amount Out:', minAmountOutLamports.toString(), 'lamports');
      console.log('  - Bot Config PDA:', botConfigPDA.toBase58());
      console.log('  - Owner:', wallet.publicKey.toBase58());

      // Verificar se o backend authority é a wallet atual
      const backendAuthority = botConfig?.backendAuthority.toBase58() || '';
      const currentWallet = wallet.publicKey.toBase58();

      if (backendAuthority !== currentWallet) {
        toast.error('Backend authority incorreto!', {
          description: 'Clique em "Definir Minha Wallet como Backend" primeiro',
          duration: 5000,
        });
        return;
      }

      // Chamar authorize_swap
      // Note: Este método apenas VALIDA e AUTORIZA, não executa o swap real
      const tx = await program.methods
        .authorizeSwap(amountInLamports, minAmountOutLamports)
        .accounts({
          botConfig: botConfigPDA,
          owner: wallet.publicKey,
          backendSigner: wallet.publicKey, // Agora deve ser igual ao backend_authority
        })
        .rpc();

      console.log('✅ Swap autorizado! TX:', tx);
      setLastTxSignature(tx);
      
      toast.success('Swap autorizado com sucesso!', {
        description: `TX: ${tx.slice(0, 8)}...`,
        duration: 4000,
      });

    } catch (err) {
      console.error('❌ Erro ao autorizar swap:', err);
      
      if (err instanceof Error) {
        if (err.message.includes('BotNotActive')) {
          toast.error('Bot não está ativo! Ative o bot primeiro.');
        } else if (err.message.includes('AmountExceedsLimit')) {
          toast.error('Amount excede o limite configurado!');
        } else if (err.message.includes('UnauthorizedBackend')) {
          toast.error('Backend não autorizado!');
        } else {
          toast.error(`Erro: ${err.message}`);
        }
      } else {
        toast.error('Erro ao autorizar swap');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!wallet) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground text-center">
          Conecte sua wallet para testar swaps
        </p>
      </div>
    );
  }

  if (!botConfig) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground text-center">
          Inicialize o bot primeiro para testar swaps
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <ArrowRightLeft className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-card-foreground">
          Testar Swap (Autorização)
        </h3>
      </div>

      <div className="space-y-4">
        {/* Bot Info */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className={`font-medium ${botConfig.isActive ? 'text-success' : 'text-error'}`}>
              {botConfig.isActive ? '✅ Ativo' : '❌ Inativo'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max Trade Amount:</span>
            <span className="font-medium text-card-foreground">
              {(botConfig.maxTradeAmount.toNumber() / 1e9).toFixed(4)} tokens
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Trades Executados:</span>
            <span className="font-medium text-card-foreground">
              {botConfig.tradesExecuted.toNumber()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Backend Authority:</span>
            <span className="font-mono text-xs text-card-foreground">
              {botConfig.backendAuthority.toBase58().slice(0, 8)}...
            </span>
          </div>
        </div>

        {/* Backend Authority Warning */}
        {wallet && botConfig.backendAuthority.toBase58() !== wallet.publicKey.toBase58() && (
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              ⚠️ Backend Authority Diferente
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300 mb-3">
              O backend configurado é diferente da sua wallet. 
              Para testar swaps, você precisa re-inicializar o bot com sua própria wallet como backend.
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-3 font-medium">
              ℹ️ Isso vai fechar o bot atual e criar um novo com suas configurações.
            </p>
            <button
              onClick={handleUpdateBackendAuthority}
              disabled={updatingBackend}
              className="w-full bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {updatingBackend ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                '🔄 Re-inicializar com Minha Wallet'
              )}
            </button>
          </div>
        )}

        {/* Amount In */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Amount In (tokens)
          </label>
          <input
            type="number"
            value={amountIn}
            onChange={(e) => setAmountIn(e.target.value)}
            step="0.001"
            min="0"
            max={(botConfig.maxTradeAmount.toNumber() / 1e9).toFixed(4)}
            className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0.001"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Máximo: {(botConfig.maxTradeAmount.toNumber() / 1e9).toFixed(4)} tokens
          </p>
        </div>

        {/* Min Amount Out */}
        <div>
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Minimum Amount Out (tokens)
          </label>
          <input
            type="number"
            value={minAmountOut}
            onChange={(e) => setMinAmountOut(e.target.value)}
            step="0.001"
            min="0"
            className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="0"
          />
          <p className="text-xs text-muted-foreground mt-1">
            0 = sem validação de slippage
          </p>
        </div>

        {/* Authorize Button */}
        <button
          onClick={handleAuthorizeSwap}
          disabled={loading || !botConfig.isActive}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Autorizando...
            </>
          ) : (
            <>
              <ArrowRightLeft className="h-5 w-5" />
              Autorizar Swap
            </>
          )}
        </button>

        {/* Last Transaction */}
        {lastTxSignature && (
          <div className="bg-success-muted border border-success rounded-lg p-4">
            <p className="text-sm font-medium text-success mb-1">
              ✅ Swap Autorizado!
            </p>
            <p className="text-xs text-success/80 font-mono break-all">
              TX: {lastTxSignature}
            </p>
            <a
              href={`https://explorer.solana.com/tx/${lastTxSignature}?cluster=custom&customUrl=http://127.0.0.1:8899`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-2 inline-block"
            >
              Ver no Explorer →
            </a>
          </div>
        )}

        {/* Info */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>ℹ️ Importante:</strong>
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            Este teste apenas <strong>autoriza</strong> o swap no smart contract. 
            Ele valida que o bot está ativo, o amount está dentro dos limites, 
            e incrementa o contador de trades. O swap real com Raydium requer 
            configuração adicional de pools.
          </p>
        </div>
      </div>
    </div>
  );
};
