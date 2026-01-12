'use client';

import { useState } from 'react';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { TrendingUp, DollarSign, Activity, Target } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

export default function PerformancePage() {
  // Mock data for demonstration
  const performanceData = Array.from({ length: 90 }, (_, i) => ({
    timestamp: Date.now() - (89 - i) * 24 * 60 * 60 * 1000,
    value: 1000 + Math.sin(i / 10) * 200 + Math.random() * 100,
  }));

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const getFilteredData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return performanceData.slice(-days);
  };

  const stats = {
    totalPnL: '+$234.56',
    winRate: '68%',
    totalTrades: 42,
    avgProfit: '+$5.58',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Performance Analytics</h1>
        <p className="text-muted-foreground">
          Track your trading performance over time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total P&L"
          value={stats.totalPnL}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Win Rate"
          value={stats.winRate}
          icon={Target}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Total Trades"
          value={stats.totalTrades}
          icon={Activity}
        />
        <StatsCard
          title="Avg Profit/Trade"
          value={stats.avgProfit}
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
      </div>

      {/* Performance Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Portfolio Value</h2>
          <div className="flex gap-2">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-card-foreground hover:bg-muted/80'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <PerformanceChart data={getFilteredData()} />
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 text-card-foreground">Risk Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sharpe Ratio</span>
              <span className="font-medium text-card-foreground">1.85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Drawdown</span>
              <span className="font-medium text-error">-8.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Volatility</span>
              <span className="font-medium text-card-foreground">12.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Risk/Reward</span>
              <span className="font-medium text-card-foreground">2.1</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-4 text-card-foreground">Trading Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Winning Trades</span>
              <span className="font-medium text-success">29</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Losing Trades</span>
              <span className="font-medium text-error">13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Win</span>
              <span className="font-medium text-success">+$12.34</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg Loss</span>
              <span className="font-medium text-error">-$6.21</span>
            </div>
          </div>
        </div>
      </div>

      {/* Note about mock data */}
      <div className="rounded-lg bg-muted border border-border p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-card-foreground">Note:</strong> This page displays mock data for demonstration purposes.
          Real performance data will be available once you start executing trades with your strategies.
        </p>
      </div>
    </div>
  );
}
