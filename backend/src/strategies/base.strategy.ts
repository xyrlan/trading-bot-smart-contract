export interface CandleData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Signal = 'BUY' | 'SELL' | 'NEUTRAL';

export interface StrategyResult {
  signal: Signal;
  confidence: number; // 0-100
  indicators: Record<string, number>;
  reason: string;
}

export interface TradingStrategy {
  name: string;
  analyze(candles: CandleData[]): Promise<StrategyResult>;
}

export abstract class BaseStrategy implements TradingStrategy {
  abstract name: string;
  
  abstract analyze(candles: CandleData[]): Promise<StrategyResult>;
  
  protected validateCandles(candles: CandleData[], minRequired: number): void {
    if (!candles || candles.length < minRequired) {
      throw new Error(
        `Insufficient candle data. Required: ${minRequired}, Got: ${candles?.length || 0}`
      );
    }
  }
  
  protected calculateConfidence(value: number, threshold: number, multiplier: number = 3): number {
    return Math.min(100, Math.abs(value - threshold) * multiplier);
  }
}
