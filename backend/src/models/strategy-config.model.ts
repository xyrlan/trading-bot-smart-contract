export interface CreateStrategyDto {
  userId: string;
  walletAddress: string;
  tokenPair: string;
  strategyType: string;
  config: {
    mode?: 'unanimous' | 'majority' | 'weighted';
    strategies: Array<{
      type: 'rsi' | 'macd' | 'bollinger';
      weight: number;
      params: any;
    }>;
    riskManagement?: {
      maxTradeSize?: number;
      stopLoss?: number;
      takeProfit?: number;
    };
  };
}

export interface UpdateStrategyDto {
  strategyType?: string;
  config?: any;
  status?: 'ACTIVE' | 'PAUSED' | 'DELETED';
}

export interface StrategyPerformance {
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
