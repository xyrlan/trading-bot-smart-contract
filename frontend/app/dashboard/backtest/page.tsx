'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Play, Download } from 'lucide-react';
import { toast } from 'sonner';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import type { IndicatorConfig } from '@/lib/types/strategy';
import { IndicatorSelector } from '@/components/strategies/IndicatorSelector';

interface BacktestResult {
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  performanceData: Array<{ timestamp: number; value: number }>;
}

export default function BacktestPage() {
  const { publicKey } = useWallet();
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<BacktestResult | null>(null);

  const [config, setConfig] = useState({
    tokenPair: 'SOL/USDC',
    startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    initialCapital: 1000,
    mode: 'unanimous' as 'unanimous' | 'majority' | 'weighted',
    indicators: [] as IndicatorConfig[],
  });

  const handleRunBacktest = async () => {
    if (!publicKey) {
      toast.error('Please connect your wallet');
      return;
    }

    if (config.indicators.length === 0) {
      toast.error('Please add at least one indicator');
      return;
    }

    setIsRunning(true);

    try {
      // Simulate backtest (in real app, call backend API)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock results
      const mockResult: BacktestResult = {
        totalReturn: 15.5 + Math.random() * 10,
        sharpeRatio: 1.5 + Math.random() * 0.5,
        maxDrawdown: -(5 + Math.random() * 5),
        winRate: 60 + Math.random() * 15,
        totalTrades: Math.floor(30 + Math.random() * 20),
        performanceData: Array.from({ length: 90 }, (_, i) => ({
          timestamp: new Date(config.startDate).getTime() + i * 24 * 60 * 60 * 1000,
          value: config.initialCapital * (1 + ((15 + Math.random() * 10) / 100) * (i / 90)),
        })),
      };

      setResult(mockResult);
      toast.success('Backtest completed successfully!');
    } catch (error) {
      toast.error('Backtest failed');
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleExport = () => {
    if (!result) return;

    const data = {
      config,
      result,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backtest-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('Backtest results exported');
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Connect your wallet to run backtests</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Strategy Backtesting</h1>
        <p className="text-muted-foreground">
          Test your strategy on historical data before going live
        </p>
      </div>

      {/* Configuration Form */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-card-foreground">Backtest Configuration</h2>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Token Pair</label>
            <select
              value={config.tokenPair}
              onChange={(e) => setConfig({ ...config, tokenPair: e.target.value })}
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            >
              <option value="SOL/USDC">SOL/USDC</option>
              <option value="SOL/USDT">SOL/USDT</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Initial Capital</label>
            <input
              type="number"
              value={config.initialCapital}
              onChange={(e) =>
                setConfig({ ...config, initialCapital: parseFloat(e.target.value) })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Start Date</label>
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">End Date</label>
            <input
              type="date"
              value={config.endDate}
              onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-card-foreground mb-2">Confluence Mode</label>
            <select
              value={config.mode}
              onChange={(e) =>
                setConfig({
                  ...config,
                  mode: e.target.value as 'unanimous' | 'majority' | 'weighted',
                })
              }
              className="w-full rounded-md border border-border bg-card text-card-foreground px-3 py-2"
            >
              <option value="unanimous">Unanimous</option>
              <option value="majority">Majority</option>
              <option value="weighted">Weighted</option>
            </select>
          </div>
        </div>

        <IndicatorSelector
          indicators={config.indicators}
          onChange={(indicators) => setConfig({ ...config, indicators })}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleRunBacktest}
            disabled={isRunning || config.indicators.length === 0}
            className="flex items-center gap-2 rounded-md bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running Backtest...' : 'Run Backtest'}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-card-foreground">Backtest Results</h2>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Export Results
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Return</p>
                <p
                  className={`text-2xl font-bold ${
                    result.totalReturn >= 0 ? 'text-success' : 'text-error'
                  }`}
                >
                  {result.totalReturn >= 0 ? '+' : ''}
                  {result.totalReturn.toFixed(2)}%
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-1">Sharpe Ratio</p>
                <p className="text-2xl font-bold text-card-foreground">{result.sharpeRatio.toFixed(2)}</p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-1">Max Drawdown</p>
                <p className="text-2xl font-bold text-error">
                  {result.maxDrawdown.toFixed(2)}%
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-1">Win Rate</p>
                <p className="text-2xl font-bold text-card-foreground">{result.winRate.toFixed(1)}%</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Total Trades: <span className="font-medium">{result.totalTrades}</span>
              </p>
            </div>

            <PerformanceChart data={result.performanceData} />
          </div>

          <div className="rounded-lg bg-muted border border-border p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-card-foreground">Important:</strong> Past performance does not guarantee future results.
              This backtest uses historical data and may not reflect real market conditions,
              slippage, or fees.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
