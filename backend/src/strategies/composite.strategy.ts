import { TradingStrategy, CandleData, Signal, StrategyResult } from './base.strategy';

export type ConflictResolution = 'unanimous' | 'majority' | 'weighted';

interface StrategyWeight {
  strategy: TradingStrategy;
  weight: number;
}

export class CompositeStrategy implements TradingStrategy {
  name = 'Composite Strategy';
  private strategies: StrategyWeight[] = [];
  
  constructor(private mode: ConflictResolution = 'unanimous') {}
  
  addStrategy(strategy: TradingStrategy, weight: number = 1): void {
    this.strategies.push({ strategy, weight });
  }
  
  removeStrategy(strategyName: string): void {
    this.strategies = this.strategies.filter(
      s => s.strategy.name !== strategyName
    );
  }
  
  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    if (this.strategies.length === 0) {
      return {
        signal: 'NEUTRAL',
        confidence: 0,
        indicators: {},
        reason: 'No strategies configured',
      };
    }
    
    const results = await Promise.all(
      this.strategies.map(s => s.strategy.analyze(candles))
    );
    
    switch (this.mode) {
      case 'unanimous':
        return this.unanimousDecision(results);
      case 'weighted':
        return this.weightedDecision(results);
      case 'majority':
        return this.majorityDecision(results);
      default:
        return this.unanimousDecision(results);
    }
  }
  
  private unanimousDecision(results: StrategyResult[]): StrategyResult {
    const allBuy = results.every(r => r.signal === 'BUY');
    const allSell = results.every(r => r.signal === 'SELL');
    
    if (allBuy) {
      return {
        signal: 'BUY',
        confidence: Math.min(...results.map(r => r.confidence)),
        indicators: this.mergeIndicators(results),
        reason: `Unanimous BUY: ${results.map(r => r.reason).join(' | ')}`,
      };
    }
    
    if (allSell) {
      return {
        signal: 'SELL',
        confidence: Math.min(...results.map(r => r.confidence)),
        indicators: this.mergeIndicators(results),
        reason: `Unanimous SELL: ${results.map(r => r.reason).join(' | ')}`,
      };
    }
    
    return {
      signal: 'NEUTRAL',
      confidence: 0,
      indicators: this.mergeIndicators(results),
      reason: `No unanimous decision: ${results
        .map(r => `${r.signal}`)
        .join(', ')}`,
    };
  }
  
  private majorityDecision(results: StrategyResult[]): StrategyResult {
    const buyCount = results.filter(r => r.signal === 'BUY').length;
    const sellCount = results.filter(r => r.signal === 'SELL').length;
    const neutralCount = results.filter(r => r.signal === 'NEUTRAL').length;
    
    const total = results.length;
    const majority = Math.ceil(total / 2);
    
    if (buyCount >= majority) {
      const buyResults = results.filter(r => r.signal === 'BUY');
      return {
        signal: 'BUY',
        confidence: this.averageConfidence(buyResults),
        indicators: this.mergeIndicators(results),
        reason: `Majority BUY (${buyCount}/${total}): ${buyResults
          .map(r => r.reason)
          .join(' | ')}`,
      };
    }
    
    if (sellCount >= majority) {
      const sellResults = results.filter(r => r.signal === 'SELL');
      return {
        signal: 'SELL',
        confidence: this.averageConfidence(sellResults),
        indicators: this.mergeIndicators(results),
        reason: `Majority SELL (${sellCount}/${total}): ${sellResults
          .map(r => r.reason)
          .join(' | ')}`,
      };
    }
    
    return {
      signal: 'NEUTRAL',
      confidence: 0,
      indicators: this.mergeIndicators(results),
      reason: `No majority (BUY: ${buyCount}, SELL: ${sellCount}, NEUTRAL: ${neutralCount})`,
    };
  }
  
  private weightedDecision(results: StrategyResult[]): StrategyResult {
    let buyScore = 0;
    let sellScore = 0;
    let totalWeight = 0;
    
    results.forEach((result, index) => {
      const weight = this.strategies[index].weight;
      totalWeight += weight;
      
      const weightedConfidence = (result.confidence / 100) * weight;
      
      if (result.signal === 'BUY') {
        buyScore += weightedConfidence;
      } else if (result.signal === 'SELL') {
        sellScore += weightedConfidence;
      }
    });
    
    // Normalize scores to 0-100 range
    const normalizedBuyScore = (buyScore / totalWeight) * 100;
    const normalizedSellScore = (sellScore / totalWeight) * 100;
    
    const threshold = 30; // Minimum score to trigger a signal
    
    if (normalizedBuyScore > normalizedSellScore && normalizedBuyScore > threshold) {
      const buyResults = results.filter(r => r.signal === 'BUY');
      return {
        signal: 'BUY',
        confidence: normalizedBuyScore,
        indicators: this.mergeIndicators(results),
        reason: `Weighted BUY (score: ${normalizedBuyScore.toFixed(
          1
        )}): ${buyResults.map(r => r.reason).join(' | ')}`,
      };
    }
    
    if (normalizedSellScore > normalizedBuyScore && normalizedSellScore > threshold) {
      const sellResults = results.filter(r => r.signal === 'SELL');
      return {
        signal: 'SELL',
        confidence: normalizedSellScore,
        indicators: this.mergeIndicators(results),
        reason: `Weighted SELL (score: ${normalizedSellScore.toFixed(
          1
        )}): ${sellResults.map(r => r.reason).join(' | ')}`,
      };
    }
    
    return {
      signal: 'NEUTRAL',
      confidence: 0,
      indicators: this.mergeIndicators(results),
      reason: `Weighted NEUTRAL (BUY: ${normalizedBuyScore.toFixed(
        1
      )}, SELL: ${normalizedSellScore.toFixed(1)})`,
    };
  }
  
  private mergeIndicators(results: StrategyResult[]): Record<string, number> {
    const merged: Record<string, number> = {};
    
    results.forEach((result, index) => {
      const strategyName = this.strategies[index].strategy.name;
      Object.entries(result.indicators).forEach(([key, value]) => {
        merged[`${strategyName}_${key}`] = value;
      });
    });
    
    return merged;
  }
  
  private averageConfidence(results: StrategyResult[]): number {
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, r) => acc + r.confidence, 0);
    return sum / results.length;
  }
}
