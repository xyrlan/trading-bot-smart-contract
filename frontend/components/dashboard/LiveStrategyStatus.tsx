'use client';

import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Activity, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import strategiesApi from '@/lib/api/strategies';
import healthApi from '@/lib/api/health';
import type { StrategyConfig, BackendStatus } from '@/lib/types/strategy';

export const LiveStrategyStatus: FC = () => {
  const { publicKey } = useWallet();
  const [activeStrategies, setActiveStrategies] = useState<StrategyConfig[]>([]);
  const [backendStatus, setBackendStatus] = useState<BackendStatus | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    if (!publicKey) return;

    const loadData = async () => {
      try {
        const [strategies, health] = await Promise.all([
          strategiesApi.list(publicKey.toBase58(), { status: 'ACTIVE' }),
          healthApi.check().catch(() => null),
        ]);

        setActiveStrategies(strategies);
        setBackendStatus(health);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error loading live status:', error);
      }
    };

    loadData();
    const interval = setInterval(loadData, 5000); // Update every 5s

    return () => clearInterval(interval);
  }, [publicKey]);

  if (!publicKey) return null;

  const isBackendOnline = backendStatus?.status === 'ok';
  const marketDataConnected = backendStatus?.services.marketData === 'connected';

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Activity className={`h-5 w-5 ${isBackendOnline ? 'text-success' : 'text-error'}`} />
          Status ao Vivo
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-success animate-pulse' : 'bg-error'}`} />
          {isBackendOnline ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="space-y-4">
        {/* Backend Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Backend</p>
            <p className={`text-sm font-medium ${isBackendOnline ? 'text-success' : 'text-error'}`}>
              {isBackendOnline ? 'Conectado' : 'Desconectado'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Market Data</p>
            <p className={`text-sm font-medium ${marketDataConnected ? 'text-success' : 'text-warning'}`}>
              {marketDataConnected ? 'Streaming' : 'Desconectado'}
            </p>
          </div>
        </div>

        {/* Active Strategies */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-card-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Estratégias Ativas
            </p>
            <span className="text-sm font-semibold text-primary">
              {activeStrategies.length}
            </span>
          </div>

          {activeStrategies.length === 0 ? (
            <div className="text-center py-6 bg-muted/50 rounded-lg">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Nenhuma estratégia ativa
              </p>
              <a
                href="/dashboard/strategies/create"
                className="text-sm text-primary hover:underline mt-1 inline-block"
              >
                Criar primeira estratégia
              </a>
            </div>
          ) : (
            <div className="space-y-2">
              {activeStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">
                      {strategy.strategyType}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {strategy.tokenPair}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-success font-medium">
                      Monitorando
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last Update */}
        <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Última atualização
          </div>
          <span>{lastUpdate.toLocaleTimeString('pt-BR')}</span>
        </div>

        {/* Queue Status */}
        {backendStatus?.services.queue && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">Fila de Execução</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Aguardando</p>
                <p className="text-lg font-semibold text-card-foreground">
                  {backendStatus.services.queue.waiting}
                </p>
              </div>
              <div className="bg-muted/30 rounded p-2">
                <p className="text-xs text-muted-foreground">Executando</p>
                <p className="text-lg font-semibold text-primary">
                  {backendStatus.services.queue.active}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
