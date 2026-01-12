'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Plus, Search, Play, Pause, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import strategiesApi from '@/lib/api/strategies';
import type { StrategyConfig } from '@/lib/types/strategy';

export default function StrategiesPage() {
  const { publicKey } = useWallet();
  const router = useRouter();
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [filteredStrategies, setFilteredStrategies] = useState<StrategyConfig[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStrategies();
  }, [publicKey]);

  useEffect(() => {
    let filtered = strategies;

    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.strategyType.toLowerCase().includes(search.toLowerCase()) ||
          s.tokenPair.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    setFilteredStrategies(filtered);
  }, [strategies, search, statusFilter]);

  const loadStrategies = async () => {
    if (!publicKey) {
      setIsLoading(false);
      return;
    }

    try {
      const data = await strategiesApi.list(publicKey.toBase58());
      setStrategies(data);
      setFilteredStrategies(data);
    } catch (error) {
      toast.error('Failed to load strategies');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = async (id: string) => {
    try {
      await strategiesApi.pause(id);
      toast.success('Strategy paused');
      loadStrategies();
    } catch (error) {
      toast.error('Failed to pause strategy');
    }
  };

  const handleResume = async (id: string) => {
    try {
      await strategiesApi.resume(id);
      toast.success('Strategy resumed');
      loadStrategies();
    } catch (error) {
      toast.error('Failed to resume strategy');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this strategy?')) return;

    try {
      await strategiesApi.delete(id);
      toast.success('Strategy deleted');
      loadStrategies();
    } catch (error) {
      toast.error('Failed to delete strategy');
    }
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Connect your wallet to view strategies</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Trading Strategies</h1>
          <p className="text-muted-foreground">
            Manage your automated trading strategies
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/strategies/create')}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Create Strategy
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search strategies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-border bg-card text-card-foreground pl-10 pr-4 py-2"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md border border-border bg-card text-card-foreground px-4 py-2"
        >
          <option value="all">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
        </select>
      </div>

      {/* Strategies List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading strategies...</p>
        </div>
      ) : filteredStrategies.length === 0 ? (
        <div className="text-center py-12 rounded-lg border border-border bg-card">
          <p className="text-muted-foreground mb-4">No strategies found</p>
          <button
            onClick={() => router.push('/dashboard/strategies/create')}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Create Your First Strategy
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{strategy.strategyType}</h3>
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

                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Token Pair: {strategy.tokenPair}</p>
                    <p>
                      Indicators: {strategy.config.strategies.map((s) => s.type).join(', ')}
                    </p>
                    <p>Mode: {strategy.config.mode}</p>
                    <p>Max Trade Size: {strategy.config.riskManagement?.maxTradeSize} SOL</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {strategy.status === 'ACTIVE' ? (
                    <button
                      onClick={() => handlePause(strategy.id)}
                      className="rounded-md border border-border p-2 hover:bg-muted"
                      title="Pause strategy"
                    >
                      <Pause className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleResume(strategy.id)}
                      className="rounded-md border border-border p-2 hover:bg-muted"
                      title="Resume strategy"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => router.push(`/dashboard/strategies/${strategy.id}`)}
                    className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleDelete(strategy.id)}
                    className="rounded-md border border-border p-2 text-error hover:bg-error-muted"
                    title="Delete strategy"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
