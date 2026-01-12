'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'sonner';
import { IndicatorSelector } from './IndicatorSelector';
import type { CreateStrategyDto, IndicatorConfig } from '@/lib/types/strategy';
import strategiesApi from '@/lib/api/strategies';

interface StrategyFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function StrategyForm({ onSuccess, onCancel }: StrategyFormProps) {
  const { publicKey } = useWallet();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    tokenPair: 'SOL/USDC',
    strategyType: 'composite',
    mode: 'unanimous' as 'unanimous' | 'majority' | 'weighted',
    indicators: [] as IndicatorConfig[],
    maxTradeSize: 0.01,
    stopLoss: 0.05,
    takeProfit: 0.10,
  });

  const handleSubmit = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (formData.indicators.length === 0) {
      toast.error('Please add at least one indicator');
      return;
    }

    setIsSubmitting(true);

    try {
      const strategy: CreateStrategyDto = {
        userId: publicKey.toBase58(),
        walletAddress: publicKey.toBase58(),
        tokenPair: formData.tokenPair,
        strategyType: formData.strategyType,
        config: {
          mode: formData.mode,
          strategies: formData.indicators,
          riskManagement: {
            maxTradeSize: formData.maxTradeSize,
            stopLoss: formData.stopLoss,
            takeProfit: formData.takeProfit,
          },
        },
      };

      await strategiesApi.create(strategy);
      toast.success('Strategy created successfully!');
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to create strategy');
      console.error('Strategy creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                s === step
                  ? 'bg-primary text-primary-foreground'
                  : s < step
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className="h-0.5 w-12 bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Configuration */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-card-foreground">Basic Configuration</h2>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Token Pair</label>
            <select
              value={formData.tokenPair}
              onChange={(e) => setFormData({ ...formData, tokenPair: e.target.value })}
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            >
              <option value="SOL/USDC">SOL/USDC</option>
              <option value="SOL/USDT">SOL/USDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Strategy Type</label>
            <input
              type="text"
              value={formData.strategyType}
              onChange={(e) => setFormData({ ...formData, strategyType: e.target.value })}
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
              placeholder="e.g., my_rsi_strategy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Confluence Mode</label>
            <select
              value={formData.mode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mode: e.target.value as 'unanimous' | 'majority' | 'weighted',
                })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            >
              <option value="unanimous">Unanimous (all indicators must agree)</option>
              <option value="majority">Majority (more than 50% must agree)</option>
              <option value="weighted">Weighted (score-based decision)</option>
            </select>
            <p className="mt-1 text-sm text-muted-foreground">
              {formData.mode === 'unanimous' &&
                'Most conservative: Trade only when all indicators agree'}
              {formData.mode === 'majority' &&
                'Balanced: Trade when majority of indicators agree'}
              {formData.mode === 'weighted' &&
                'Flexible: Each indicator contributes based on weight'}
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            {onCancel && (
              <button
                onClick={onCancel}
                className="rounded-md border border-border px-4 py-2 hover:bg-muted"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => setStep(2)}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Indicators */}
      {step === 2 && (
        <div className="space-y-4">
          <IndicatorSelector
            indicators={formData.indicators}
            onChange={(indicators) => setFormData({ ...formData, indicators })}
          />

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setStep(1)}
              className="rounded-md border border-border px-4 py-2 hover:bg-muted"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={formData.indicators.length === 0}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Risk Management */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-card-foreground">Risk Management</h2>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Max Trade Size (SOL)
            </label>
            <input
              type="number"
              step="0.001"
              min="0.001"
              value={formData.maxTradeSize}
              onChange={(e) =>
                setFormData({ ...formData, maxTradeSize: parseFloat(e.target.value) })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Maximum amount to trade per signal
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Stop Loss (%)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.stopLoss * 100}
              onChange={(e) =>
                setFormData({ ...formData, stopLoss: parseFloat(e.target.value) / 100 })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Automatically exit if loss exceeds this percentage
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Take Profit (%)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="100"
              value={formData.takeProfit * 100}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  takeProfit: parseFloat(e.target.value) / 100,
                })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Automatically exit if profit reaches this percentage
            </p>
          </div>

          {/* Configuration Preview */}
          <div className="rounded-lg bg-muted p-4">
            <h3 className="font-semibold text-card-foreground mb-2">Configuration Summary</h3>
            <pre className="text-xs overflow-auto text-muted-foreground">
              {JSON.stringify(
                {
                  tokenPair: formData.tokenPair,
                  strategyType: formData.strategyType,
                  mode: formData.mode,
                  indicators: formData.indicators.length,
                  riskManagement: {
                    maxTradeSize: formData.maxTradeSize,
                    stopLoss: `${(formData.stopLoss * 100).toFixed(2)}%`,
                    takeProfit: `${(formData.takeProfit * 100).toFixed(2)}%`,
                  },
                },
                null,
                2
              )}
            </pre>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setStep(2)}
              className="rounded-md border border-border px-4 py-2 hover:bg-muted"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Strategy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
