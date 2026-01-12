'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { SignalsChart } from '@/components/charts/SignalsChart';
import strategiesApi from '@/lib/api/strategies';
import type { StrategyConfig, TradeSignal } from '@/lib/types/strategy';

export default function StrategyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const strategyId = params.id as string;

  const [strategy, setStrategy] = useState<StrategyConfig | null>(null);
  const [signals, setSignals] = useState<TradeSignal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStrategyDetails();
  }, [strategyId]);

  const loadStrategyDetails = async () => {
    try {
      const [strategyData, signalsData] = await Promise.all([
        strategiesApi.get(strategyId),
        strategiesApi.signals(strategyId).catch(() => []),
      ]);

      setStrategy(strategyData);
      setSignals(signalsData);
    } catch (error) {
      toast.error('Failed to load strategy details');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = async () => {
    if (!strategy) return;
    try {
      await strategiesApi.pause(strategy.id);
      toast.success('Strategy paused');
      loadStrategyDetails();
    } catch (error) {
      toast.error('Failed to pause strategy');
    }
  };

  const handleResume = async () => {
    if (!strategy) return;
    try {
      await strategiesApi.resume(strategy.id);
      toast.success('Strategy resumed');
      loadStrategyDetails();
    } catch (error) {
      toast.error('Failed to resume strategy');
    }
  };

  const handleDelete = async () => {
    if (!strategy || !confirm('Are you sure you want to delete this strategy?')) return;

    try {
      await strategiesApi.delete(strategy.id);
      toast.success('Strategy deleted');
      router.push('/dashboard/strategies');
    } catch (error) {
      toast.error('Failed to delete strategy');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading strategy details...</p>
      </div>
    );
  }

  if (!strategy) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Strategy not found</p>
      </div>
    );
  }

  // Generate mock performance data for demonstration
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    value: 1000 + Math.random() * 200 - 100,
  }));

  // Generate mock signals chart data
  const signalsChartData = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    buy: Math.floor(Math.random() * 10),
    sell: Math.floor(Math.random() * 10),
  }));

  const totalSignals = signals.length;
  const buySignals = signals.filter((s) => s.signal === 'BUY').length;
  const sellSignals = signals.filter((s) => s.signal === 'SELL').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-md border border-border p-2 hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-card-foreground">{strategy.strategyType}</h1>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  strategy.status === 'ACTIVE'
                    ? 'bg-success-muted text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {strategy.status}
              </span>
            </div>
            <p className="text-muted-foreground">{strategy.tokenPair}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {strategy.status === 'ACTIVE' ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-muted"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="flex items-center gap-2 rounded-md border border-border px-4 py-2 hover:bg-muted"
            >
              <Play className="h-4 w-4" />
              Resume
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-error hover:bg-error-muted"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Signals</p>
          <p className="text-2xl font-bold text-card-foreground">{totalSignals}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-success" />
            <p className="text-sm text-muted-foreground">Buy Signals</p>
          </div>
          <p className="text-2xl font-bold text-success">{buySignals}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-error" />
            <p className="text-sm text-muted-foreground">Sell Signals</p>
          </div>
          <p className="text-2xl font-bold text-error">{sellSignals}</p>
        </div>
      </div>

      {/* Configuration */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-card-foreground">Configuration</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Mode</p>
            <p className="font-medium text-card-foreground capitalize">{strategy.config.mode}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Max Trade Size</p>
            <p className="font-medium text-card-foreground">
              {strategy.config.riskManagement?.maxTradeSize || 0} SOL
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Stop Loss</p>
            <p className="font-medium text-card-foreground">
              {((strategy.config.riskManagement?.stopLoss || 0) * 100).toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Take Profit</p>
            <p className="font-medium text-card-foreground">
              {((strategy.config.riskManagement?.takeProfit || 0) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Indicators</p>
          <div className="space-y-2">
            {strategy.config.strategies.map((indicator, index) => (
              <div key={index} className="rounded-md bg-muted p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-card-foreground">{indicator.type.toUpperCase()}</span>
                  <span className="text-sm text-muted-foreground">
                    Weight: {indicator.weight}
                  </span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {JSON.stringify(indicator.params)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-card-foreground">Performance (Mock Data)</h2>
        <PerformanceChart data={performanceData} />
      </div>

      {/* Signals Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-card-foreground">Signals Activity (Mock Data)</h2>
        <SignalsChart data={signalsChartData} />
      </div>

      {/* Recent Signals */}
      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4 text-card-foreground">Recent Signals</h2>
        {signals.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No signals generated yet
          </p>
        ) : (
          <div className="space-y-2">
            {signals.slice(0, 10).map((signal) => (
              <div
                key={signal.id}
                className="flex items-center justify-between rounded-md border border-border p-3"
              >
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      signal.signal === 'BUY'
                        ? 'bg-success-muted text-success'
                        : signal.signal === 'SELL'
                        ? 'bg-error-muted text-error'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {signal.signal}
                  </span>
                  <span className="ml-3 text-sm text-muted-foreground">
                    Confidence: {(signal.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(signal.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
