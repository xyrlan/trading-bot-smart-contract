'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Activity, TrendingUp, DollarSign, Target } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { OnboardingCard } from '@/components/dashboard/OnboardingCard';
import { LiveStrategyStatus } from '@/components/dashboard/LiveStrategyStatus';
import { SwapTest } from '@/components/dashboard/SwapTest';
import { useBotConfig } from '@/hooks/useBotConfig';
import strategiesApi from '@/lib/api/strategies';
import healthApi from '@/lib/api/health';
import type { StrategyConfig, BackendStatus } from '@/lib/types/strategy';
import idl from '@/lib/idl.json';
import { Idl } from '@coral-xyz/anchor';
import Link from 'next/link';

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const programIdl = idl as Idl;
  const { exists, loading: botLoading } = useBotConfig(programIdl);
  const [strategies, setStrategies] = useState<StrategyConfig[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

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

  // Atualizar showOnboarding baseado no estado do bot
  useEffect(() => {
    console.log('🔄 Bot status changed:', { botLoading, exists, publicKey: publicKey?.toBase58() });
    if (!botLoading && publicKey) {
      setTimeout(() => {
        setShowOnboarding(!exists);
      }, 0);
    }
  }, [exists, botLoading, publicKey]);

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <span className="text-4xl">👋</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            Bem-vindo ao Trading Bot
          </h2>
          <p className="text-muted-foreground mb-6">
            Conecte sua carteira para começar a configurar seu bot de trading automatizado
          </p>
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium mb-2">O que você pode fazer:</p>
            <ul className="space-y-1 text-left">
              <li>• Configurar estratégias de trading</li>
              <li>• Executar trades automatizados</li>
              <li>• Monitorar performance em tempo real</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar loading enquanto verifica o bot (com timeout de 5 segundos)
  if (botLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verificando configuração do bot...</p>
          <p className="text-xs text-muted-foreground mt-2">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  // Mostrar onboarding se bot não está inicializado
  if (showOnboarding) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <OnboardingCard onComplete={() => {
          console.log('✅ Onboarding complete, reloading page...');
          setShowOnboarding(false);
          // Forçar reload após completar onboarding
          setTimeout(() => window.location.reload(), 1000);
        }} />
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

      {/* Live Status Widget */}
      <LiveStrategyStatus />

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

      {/* Swap Test Component */}
      {exists && !showOnboarding && (
        <SwapTest />
      )}

      {/* Recent Strategies */}
      <div className="rounded-lg bg-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Your Strategies</h3>
          <Link
            href="/dashboard/strategies"
            className="text-sm text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {strategies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You haven&apos;t created any strategies yet
            </p>
            <Link
              href="/dashboard/strategies/create"
              className="inline-block rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
            >
              Create Your First Strategy
            </Link>
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
