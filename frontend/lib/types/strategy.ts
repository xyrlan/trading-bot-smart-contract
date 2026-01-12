export interface StrategyConfig {
  id: string;
  userId: string;
  walletAddress: string;
  tokenPair: string;
  strategyType: string;
  config: {
    mode: 'unanimous' | 'majority' | 'weighted';
    strategies: Array<{
      type: 'rsi' | 'macd' | 'bollinger';
      weight: number;
      params: any;
    }>;
    riskManagement?: {
      maxTradeSize: number;
      stopLoss?: number;
      takeProfit?: number;
    };
  };
  status: 'ACTIVE' | 'PAUSED' | 'DELETED';
  createdAt: string;
  updatedAt: string;
}

export interface TradeSignal {
  id: string;
  strategyId: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  price: number;
  confidence: number;
  indicators: Record<string, number>;
  reason: string;
  executed: boolean;
  txSignature?: string | null;
  executedAt?: string | null;
  amountIn?: number | null;
  amountOut?: number | null;
  slippage?: number | null;
  createdAt: string;
}

export interface PerformanceMetrics {
  strategyId: string;
  totalTrades: number;
  successfulTrades: number;
  failedTrades: number;
  totalProfit: number;
  totalLoss: number;
  winRate: number;
  averageReturn: number;
  sharpeRatio?: number;
}

export interface Trade {
  id: string;
  walletAddress: string;
  tokenPair: string;
  type: 'BUY' | 'SELL';
  amountIn: number;
  amountOut: number;
  price: number;
  slippage: number;
  txSignature: string;
  blockTime?: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  strategyId?: string | null;
  signalId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BackendStatus {
  status: string;
  timestamp: string;
  services: {
    database: string;
    marketData: string;
    strategyEngine: string;
    queue: {
      waiting: number;
      active: number;
      completed: number;
      failed: number;
    };
  };
}

// DTOs
export interface CreateStrategyDto {
  userId: string;
  walletAddress: string;
  tokenPair: string;
  strategyType: string;
  config: StrategyConfig['config'];
}

export interface UpdateStrategyDto {
  strategyType?: string;
  config?: any;
  status?: 'ACTIVE' | 'PAUSED' | 'DELETED';
}

// Indicator Types
export interface RsiConfig {
  period: number;
  oversold: number;
  overbought: number;
}

export interface MacdConfig {
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
}

export interface BollingerConfig {
  period: number;
  stdDev: number;
}

export type IndicatorType = 'rsi' | 'macd' | 'bollinger';

export interface IndicatorConfig {
  type: IndicatorType;
  weight: number;
  params: RsiConfig | MacdConfig | BollingerConfig;
}
