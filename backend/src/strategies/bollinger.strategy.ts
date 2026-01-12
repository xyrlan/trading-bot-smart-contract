import { BollingerBands } from 'technicalindicators';
import { BaseStrategy, CandleData, Signal, StrategyResult } from './base.strategy';

export interface BollingerConfig {
  period: number;
  stdDev: number;
}

export class BollingerStrategy extends BaseStrategy {
  name = 'Bollinger Bands';
  
  constructor(private config: BollingerConfig) {
    super();
  }

  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    this.validateCandles(candles, this.config.period);
    
    const closes = candles.map(c => c.close);
    
    const bbValues = BollingerBands.calculate({
      values: closes,
      period: this.config.period,
      stdDev: this.config.stdDev,
    });
    
    if (bbValues.length === 0) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: { upper: 0, middle: 0, lower: 0, pb: 0 },
        reason: 'Insufficient data to calculate Bollinger Bands',
      };
    }
    
    const current = bbValues[bbValues.length - 1];
    const currentPrice = closes[closes.length - 1];
    
    if (!current) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: { upper: 0, middle: 0, lower: 0, pb: 0 },
        reason: 'Invalid Bollinger Bands data',
      };
    }
    
    let signal: Signal = 'NEUTRAL';
    let confidence = 0;
    let reason = '';
    
    // Calculate %B (Percent Bandwidth)
    const pb =
      (currentPrice - current.lower) / (current.upper - current.lower);
    
    // Price touching or below lower band = oversold = BUY
    if (pb <= 0.1) {
      signal = 'BUY';
      confidence = Math.min(100, (0.1 - pb) * 500 + 60);
      reason = 'Price at lower band (oversold)';
    }
    // Price touching or above upper band = overbought = SELL
    else if (pb >= 0.9) {
      signal = 'SELL';
      confidence = Math.min(100, (pb - 0.9) * 500 + 60);
      reason = 'Price at upper band (overbought)';
    }
    // Price near middle band
    else if (pb >= 0.4 && pb <= 0.6) {
      signal = 'NEUTRAL';
      confidence = 0;
      reason = 'Price near middle band';
    }
    
    return {
      signal,
      confidence,
      indicators: {
        upper: current.upper,
        middle: current.middle,
        lower: current.lower,
        pb: pb,
      },
      reason: `Bollinger Bands: ${reason} (%B: ${pb.toFixed(2)})`,
    };
  }
}
