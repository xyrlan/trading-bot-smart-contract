import { RSI } from 'technicalindicators';
import { BaseStrategy, CandleData, Signal, StrategyResult } from './base.strategy';

export interface RsiConfig {
  period: number;
  oversold: number;
  overbought: number;
}

export class RsiStrategy extends BaseStrategy {
  name = 'RSI';
  
  constructor(private config: RsiConfig) {
    super();
  }

  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    this.validateCandles(candles, this.config.period + 1);
    
    const closes = candles.map(c => c.close);
    
    const rsiValues = RSI.calculate({
      values: closes,
      period: this.config.period,
    });
    
    const currentRsi = rsiValues[rsiValues.length - 1];
    
    if (currentRsi === undefined) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: { rsi: 0 },
        reason: 'Insufficient data to calculate RSI',
      };
    }
    
    let signal: Signal = 'NEUTRAL';
    let confidence = 0;
    
    if (currentRsi < this.config.oversold) {
      signal = 'BUY';
      confidence = this.calculateConfidence(currentRsi, this.config.oversold, 3);
    } else if (currentRsi > this.config.overbought) {
      signal = 'SELL';
      confidence = this.calculateConfidence(currentRsi, this.config.overbought, 3);
    }
    
    return {
      signal,
      confidence,
      indicators: { rsi: currentRsi },
      reason: `RSI(${this.config.period}): ${currentRsi.toFixed(2)} - ${
        currentRsi < this.config.oversold
          ? 'Oversold'
          : currentRsi > this.config.overbought
          ? 'Overbought'
          : 'Neutral'
      }`,
    };
  }
}
