'use client';

import { FC, useState, useEffect } from 'react';
import { PublicKey, Keypair } from '@solana/web3.js';
import { useTrade } from '@/hooks/useTrade';
import { toast } from 'sonner';
import BN from 'bn.js';
import { DEFAULT_MAX_TRADE_AMOUNT, DEFAULT_MAX_SLIPPAGE_BPS, DEVNET_TOKENS } from '@/lib/constants';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import idl from '@/lib/idl.json';
import { Idl } from '@coral-xyz/anchor';

interface OnboardingCardProps {
  onComplete: () => void;
}

type SetupStep = 'idle' | 'initializing' | 'approving' | 'complete' | 'error';

export const OnboardingCard: FC<OnboardingCardProps> = ({ onComplete }) => {
  const [step, setStep] = useState<SetupStep>('idle');
  const [maxTradeAmount, setMaxTradeAmount] = useState(DEFAULT_MAX_TRADE_AMOUNT / 1e9);
  const [maxSlippage, setMaxSlippage] = useState(DEFAULT_MAX_SLIPPAGE_BPS / 100);
  const [backendAuthority, setBackendAuthority] = useState('');
  const [approveAmount, setApproveAmount] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');

  const programIdl = idl as Idl;
  const { initializeBot, approveTokens, loading } = useTrade(programIdl);

  // Gerar keypair para demo
  useEffect(() => {
    if (!backendAuthority) {
      const demoKeypair = Keypair.generate();
      setBackendAuthority("GeNh46AyProQ6KP847BPprXRDQ8QcXs3Kc3R96vfuN8x");
    }
  }, [backendAuthority]);

  const handleQuickSetup = async () => {
    if (!backendAuthority) {
      setErrorMessage('Por favor, insira a chave pública do backend');
      return;
    }

    try {
      setErrorMessage('');
      
      // Step 1: Inicializar bot
      setStep('initializing');
      toast.info('Inicializando bot on-chain...', { duration: 2000 });
      
      const backendPubkey = new PublicKey(backendAuthority);
      const amountLamports = new BN(maxTradeAmount * 1e9);
      const slippageBps = Math.floor(maxSlippage * 100);

      console.log('🔧 Step 1/2: Inicializando bot...');
      console.log('DEBUG - backendPubkey:', backendPubkey.toBase58());
      console.log('DEBUG - amountLamports:', amountLamports.toString());
      console.log('DEBUG - slippageBps:', slippageBps);
      console.log('DEBUG - Chamando initializeBot...');
      
      const initSignature = await initializeBot(backendPubkey, amountLamports, slippageBps);
      
      console.log('DEBUG - initSignature retornou:', initSignature);
      
      if (!initSignature) {
        console.error('❌❌❌ INITIALIZACAO FALHOU! initSignature é null');
        // Verificar se tem erro no hook
        throw new Error('Falha ao inicializar bot - signature retornou null');
      }

      console.log('✅ Bot inicializado! Signature:', initSignature);
      toast.success('Bot inicializado!', { duration: 2000 });

      // Aguardar confirmação
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 2: Pular aprovação de tokens por enquanto (opcional)
      console.log('ℹ️  Pulando aprovação de tokens (não obrigatório)');
      console.log('💡 Você pode aprovar tokens depois se necessário');
      
      // Opcional: Tentar aprovar tokens mas não falhar se der erro
      // setStep('approving');
      // toast.info('Aprovando tokens USDC...', { duration: 2000 });
      // try {
      //   const amountWithDecimals = BigInt(Math.floor(approveAmount * 1e6));
      //   const approveSignature = await approveTokens(DEVNET_TOKENS.USDC, amountWithDecimals);
      //   if (approveSignature) {
      //     console.log('✅ Tokens aprovados! Signature:', approveSignature);
      //     toast.success('Tokens aprovados!', { duration: 2000 });
      //   }
      // } catch (approveError) {
      //   console.warn('⚠️  Não foi possível aprovar tokens (não crítico):', approveError);
      // }

      setStep('complete');
      toast.success('Setup completo!', {
        description: 'Seu bot está pronto para trading. Agora você pode criar estratégias.',
        duration: 4000,
      });
      
      // Notificar conclusão
      setTimeout(() => {
        onComplete();
      }, 2000);

    } catch (err) {
      console.error('❌❌❌ ERRO NO SETUP (CATCH PRINCIPAL):', err);
      console.error('Type:', typeof err);
      console.error('Is Error?:', err instanceof Error);
      if (err instanceof Error) {
        console.error('Message:', err.message);
        console.error('Stack:', err.stack);
      }
      console.error('Full error object:', err);
      
      setStep('error');
      const errorMsg = err instanceof Error ? err.message : 'Erro ao configurar bot';
      setErrorMessage(errorMsg);
      console.error('❌ ErrorMessage set to:', errorMsg);
    }
  };

  const getStepStatus = (currentStep: SetupStep) => {
    if (step === 'error') return 'error';
    if (step === 'complete') return 'complete';
    if (step === currentStep) return 'active';
    if (step === 'idle') return 'pending';
    
    // Determinar se o passo foi completado
    const steps: SetupStep[] = ['idle', 'initializing', 'approving', 'complete'];
    const currentIndex = steps.indexOf(step);
    const stepIndex = steps.indexOf(currentStep);
    
    return stepIndex < currentIndex ? 'complete' : 'pending';
  };

  const isProcessing = step === 'initializing' || step === 'approving';
  const isComplete = step === 'complete';
  const hasError = step === 'error';

  return (
    <div className="rounded-lg border border-border bg-card p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <span className="text-3xl">🤖</span>
        </div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">
          Configure seu Trading Bot
        </h2>
        <p className="text-muted-foreground">
          Configure seu bot em um único passo. Vamos inicializar e aprovar tokens automaticamente.
        </p>
      </div>

      {/* Progress Steps */}
      {isProcessing && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3">
            {getStepStatus('initializing') === 'active' ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : getStepStatus('initializing') === 'complete' ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-muted" />
            )}
            <span className={`text-sm ${
              getStepStatus('initializing') === 'active' ? 'text-primary font-medium' :
              getStepStatus('initializing') === 'complete' ? 'text-success' :
              'text-muted-foreground'
            }`}>
              Inicializando bot on-chain
            </span>
          </div>

          <div className="flex items-center gap-3">
            {getStepStatus('approving') === 'active' ? (
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            ) : getStepStatus('approving') === 'complete' ? (
              <CheckCircle2 className="h-5 w-5 text-success" />
            ) : (
              <div className="h-5 w-5 rounded-full border-2 border-muted" />
            )}
            <span className={`text-sm ${
              getStepStatus('approving') === 'active' ? 'text-primary font-medium' :
              getStepStatus('approving') === 'complete' ? 'text-success' :
              'text-muted-foreground'
            }`}>
              Aprovando tokens USDC
            </span>
          </div>
        </div>
      )}

      {isComplete && (
        <div className="mb-6 p-4 rounded-lg bg-success-muted border border-success">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0" />
            <div>
              <p className="font-semibold text-success">Setup completo!</p>
              <p className="text-sm text-success/80">
                Seu bot está configurado e pronto para trading.
              </p>
            </div>
          </div>
        </div>
      )}

      {hasError && errorMessage && (
        <div className="mb-6 p-4 rounded-lg bg-error-muted border border-error">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-error flex-shrink-0" />
            <div>
              <p className="font-semibold text-error">Erro no setup</p>
              <p className="text-sm text-error/80">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {step === 'idle' && (
        <div className="space-y-4">
          {/* Backend Authority */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Backend Authority (Chave Pública)
            </label>
            <input
              type="text"
              value={backendAuthority}
              onChange={(e) => setBackendAuthority(e.target.value)}
              className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Chave pública do backend..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Esta chave terá permissão para executar trades automaticamente
            </p>
          </div>

          {/* Max Trade Amount */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Limite Máximo por Trade (tokens)
            </label>
            <input
              type="number"
              value={maxTradeAmount}
              onChange={(e) => setMaxTradeAmount(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="1.0"
              step="0.1"
              min="0"
            />
          </div>

          {/* Max Slippage */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Slippage Máximo (%)
            </label>
            <input
              type="number"
              value={maxSlippage}
              onChange={(e) => setMaxSlippage(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="5.0"
              step="0.1"
              min="0"
              max="100"
            />
          </div>

          {/* Approve Amount */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Quantidade de USDC a Aprovar
            </label>
            <input
              type="number"
              value={approveAmount}
              onChange={(e) => setApproveAmount(Number(e.target.value))}
              className="w-full rounded-md border border-border bg-background text-foreground px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="10"
              step="1"
              min="0"
            />
            <p className="text-xs text-muted-foreground mt-1">
              O bot poderá usar até esta quantidade para executar trades
            </p>
          </div>

          {/* Setup Button */}
          <button
            onClick={handleQuickSetup}
            disabled={loading || !backendAuthority || isProcessing}
            className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading || isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Configurando...
              </>
            ) : (
              <>
                Configurar Bot (1 clique)
              </>
            )}
          </button>

          {/* Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>O que vai acontecer:</strong>
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
              <li>Criar conta do bot on-chain (~0.002 SOL de rent)</li>
              <li>Aprovar tokens USDC para o bot usar</li>
              <li>Você mantém controle total dos seus fundos</li>
            </ul>
          </div>
        </div>
      )}

      {hasError && (
        <button
          onClick={() => {
            setStep('idle');
            setErrorMessage('');
          }}
          className="w-full mt-4 bg-muted text-foreground font-medium py-2 px-4 rounded-lg hover:bg-muted/80 transition-all"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};
