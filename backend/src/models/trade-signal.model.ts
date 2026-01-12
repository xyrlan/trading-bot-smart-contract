export interface TradeSignalDto {
  id: string;
  strategyId: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  price: number;
  confidence: number;
  indicators: Record<string, number>;
  reason: string;
  executed: boolean;
  txSignature?: string;
  executedAt?: Date;
  createdAt: Date;
}

export interface SignalFilter {
  strategyId?: string;
  signal?: 'BUY' | 'SELL' | 'NEUTRAL';
  executed?: boolean;
  fromDate?: Date;
  toDate?: Date;
}
