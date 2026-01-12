'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Activity, TrendingUp, DollarSign, Target } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import strategiesApi from '@/lib/api/strategies';
import healthApi from '@/lib/api/health';
import type { StrategyConfig, BackendStatus } from '@/lib/types/strategy';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!publicKey) {
        return;
      }

      try {
        const [strategiesData, healthData] = await Promise.all([
          strategiesApi.list(publicKey.toBase58()),
          healthApi.check().catch(() => null),
        ]);

        setStrategies(strategiesData);
        setBackendStatus(healthData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 10000); // Refresh every 10s

    return () => clearInterval(interval);
  }, [publicKey]);

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-foreground">Welcome to Trading Bot Dashboard</h2>
          <p className="text-muted-foreground mb-4">
            Connect your wallet to get started
          </p>
        </div>
      </div>
    );
  }

  const activeStrategies = strategies.filter((s) => s.status === 'ACTIVE').length;
  const pausedStrategies = strategies.filter((s) => s.status === 'PAUSED').length;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Strategies"
          value={activeStrategies}
          icon={TrendingUp}
        />
        <StatsCard
          title="Paused Strategies"
          value={pausedStrategies}
          icon={Target}
        />
        <StatsCard
          title="Backend Status"
          value={backendStatus?.status === 'ok' ? 'Online' : 'Offline'}
          icon={Activity}
        />
        <StatsCard
          title="Queue Status"
          value={`${backendStatus?.services.queue.active || 0} active`}
          icon={DollarSign}
        />
      </div>

      {/* Backend Status */}
      {backendStatus && (
        <div className="rounded-lg bg-card border border-border p-6">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">System Status</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Database</p>
              <p className="font-medium text-card-foreground capitalize">
                {backendStatus.services.database}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Data</p>
              <p className="font-medium text-card-foreground capitalize">
                {backendStatus.services.marketData}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Strategy Engine</p>
              <p className="font-medium text-card-foreground">{backendStatus.services.strategyEngine}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Queue</p>
              <p className="font-medium text-card-foreground">
                {backendStatus.services.queue.waiting} waiting,{' '}
                {backendStatus.services.queue.active} active
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Strategies */}
      <div className="rounded-lg bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Your Strategies</h3>
          <a
            href="/dashboard/strategies"
            className="text-sm text-primary hover:underline"
          >
            View all
          </a>
        </div>

        {strategies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven&apos;t created any strategies yet
            </p>
            <a
              href="/dashboard/strategies/create"
              className="inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Create Your First Strategy
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {strategies.slice(0, 5).map((strategy) => (
              <div
                key={strategy.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 bg-card"
              >
                <div>
                  <p className="font-medium text-card-foreground">{strategy.strategyType}</p>
                  <p className="text-sm text-muted-foreground">
                    {strategy.tokenPair} • {strategy.config.strategies.length}{' '}
                    indicators
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      strategy.status === 'ACTIVE'
                        ? 'bg-success-muted text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {strategy.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
