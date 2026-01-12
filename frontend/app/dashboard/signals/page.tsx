'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import strategiesApi from '@/lib/api/strategies';
import type { TradeSignal, StrategyConfig } from '@/lib/types/strategy';

export default function SignalsPage() {
  const { publicKey } = useWallet();
  const [signals, setSignals] = useState<TradeSignal[]>([]);
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [publicKey]);

  const loadData = async () => {
    if (!publicKey) {
      setIsLoading(false);
      return;
    }

    try {
      const strategiesData = await strategiesApi.list(publicKey.toBase58());
      setStrategies(strategiesData);

      // Load signals from all strategies
      const allSignals: TradeSignal[] = [];
      for (const strategy of strategiesData) {
        try {
          const strategySignals = await strategiesApi.signals(strategy.id);
          allSignals.push(...strategySignals);
        } catch (error) {
          console.error(`Failed to load signals for strategy ${strategy.id}:`, error);
        }
      }

      // Sort signals by createdAt (newest first)
      allSignals.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setSignals(allSignals);
    } catch (error) {
      console.error('Error loading signals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSignals =
    selectedStrategy === 'all'
      ? signals
      : signals.filter((s) => s.strategyId === selectedStrategy);

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return <TrendingUp className="h-5 w-5 text-success" />;
      case 'SELL':
        return <TrendingDown className="h-5 w-5 text-error" />;
      default:
        return <Minus className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-success-muted text-success border-success';
      case 'SELL':
        return 'bg-error-muted text-error border-error';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Connect your wallet to view signals</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trade Signals</h1>
          <p className="text-muted-foreground">
            Real-time signals from your active strategies
          </p>
        </div>

        <select
          value={selectedStrategy}
          onChange={(e) => setSelectedStrategy(e.target.value)}
          className="rounded-md border border-border bg-card text-card-foreground px-4 py-2"
        >
          <option value="all">All Strategies</option>
          {strategies.map((strategy) => (
            <option key={strategy.id} value={strategy.id}>
              {strategy.strategyType}
            </option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Signals</p>
          <p className="text-2xl font-bold text-card-foreground">{filteredSignals.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Buy Signals</p>
          <p className="text-2xl font-bold text-success">
            {filteredSignals.filter((s) => s.signal === 'BUY').length}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground mb-1">Sell Signals</p>
          <p className="text-2xl font-bold text-error">
            {filteredSignals.filter((s) => s.signal === 'SELL').length}
          </p>
        </div>
      </div>

      {/* Signals List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading signals...</p>
        </div>
      ) : filteredSignals.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-border bg-card">
          <p className="text-muted-foreground">No signals found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSignals.map((signal) => {
            const strategy = strategies.find((s) => s.id === signal.strategyId);
            return (
              <div
                key={signal.id}
                className={`rounded-lg border p-4 ${getSignalColor(signal.signal)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-card p-2">
                      {getSignalIcon(signal.signal)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{signal.signal}</span>
                        <span className="text-sm opacity-75">
                          Confidence: {(signal.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                      <p className="text-sm opacity-75">
                        {strategy?.strategyType || 'Unknown Strategy'} •{' '}
                        {strategy?.tokenPair || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {new Date(signal.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm opacity-75">
                      {new Date(signal.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {signal.indicators && Object.keys(signal.indicators).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-current/20">
                    <p className="text-xs font-medium mb-1">Indicators:</p>
                    <pre className="text-xs opacity-75 overflow-auto">
                      {JSON.stringify(signal.indicators, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
