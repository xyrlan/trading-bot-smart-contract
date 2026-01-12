import { MACD } from 'technicalindicators';
import { BaseStrategy, CandleData, Signal, StrategyResult } from './base.strategy';

export interface MacdConfig {
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
  SimpleMAOscillator?: boolean;
  SimpleMASignal?: boolean;
}

export class MacdStrategy extends BaseStrategy {
  name = 'MACD';
  
  constructor(private config: MacdConfig) {
    super();
  }

  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    const minRequired = this.config.slowPeriod + this.config.signalPeriod;
    this.validateCandles(candles, minRequired);
    
    const closes = candles.map(c => c.close);
    
    const macdValues = MACD.calculate({
      values: closes,
      fastPeriod: this.config.fastPeriod,
      slowPeriod: this.config.slowPeriod,
      signalPeriod: this.config.signalPeriod,
      SimpleMAOscillator: this.config.SimpleMAOscillator || false,
      SimpleMASignal: this.config.SimpleMASignal || false,
    });
    
    if (macdValues.length < 2) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: { macd: 0, signal: 0, histogram: 0 },
        reason: 'Insufficient data to calculate MACD',
      };
    }
    
    const current = macdValues[macdValues.length - 1];
    const previous = macdValues[macdValues.length - 2];
    
    if (!current || !previous) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: { macd: 0, signal: 0, histogram: 0 },
        reason: 'Invalid MACD data',
      };
    }
    
    let signal: Signal = 'NEUTRAL';
    let confidence = 0;
    let reason = '';
    
    // Bullish crossover: MACD crosses above signal line
    if (
      previous.MACD !== undefined &&
      previous.signal !== undefined &&
      current.MACD !== undefined &&
      current.signal !== undefined
    ) {
      const bullishCrossover = previous.MACD < previous.signal && current.MACD > current.signal;
      const bearishCrossover = previous.MACD > previous.signal && current.MACD < current.signal;
      
      if (bullishCrossover) {
        signal = 'BUY';
        confidence = Math.min(
          100,
          Math.abs(current.MACD - current.signal) * 1000 + 50
        );
        reason = 'Bullish MACD crossover';
      } else if (bearishCrossover) {
        signal = 'SELL';
        confidence = Math.min(
          100,
          Math.abs(current.MACD - current.signal) * 1000 + 50
        );
        reason = 'Bearish MACD crossover';
      } else if (current.MACD > current.signal && current.histogram && current.histogram > 0) {
        signal = 'BUY';
        confidence = Math.min(100, Math.abs(current.histogram) * 500);
        reason = 'MACD above signal line';
      } else if (current.MACD < current.signal && current.histogram && current.histogram < 0) {
        signal = 'SELL';
        confidence = Math.min(100, Math.abs(current.histogram) * 500);
        reason = 'MACD below signal line';
      }
    }
    
    return {
      signal,
      confidence,
      indicators: {
        macd: current.MACD || 0,
        signal: current.signal || 0,
        histogram: current.histogram || 0,
      },
      reason: `MACD: ${reason} (${current.MACD?.toFixed(4)} / ${current.signal?.toFixed(4)})`,
    };
  }
}
