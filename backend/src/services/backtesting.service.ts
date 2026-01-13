import 'dotenv/config';
import { CandleData, StrategyResult } from '../strategies/base.strategy';
import { CompositeStrategy } from '../strategies/composite.strategy';
import { RsiStrategy } from '../strategies/rsi.strategy';
import { MacdStrategy } from '../strategies/macd.strategy';
import { BollingerStrategy } from '../strategies/bollinger.strategy';

interface BacktestConfig {
  strategyConfig: any;
  historicalData: CandleData[];
  initialBalance: number;
  tradeFee: number; // Percentage (e.g., 0.003 for 0.3%)
  slippage: number; // Percentage
}

interface Trade {
  timestamp: number;
  type: 'BUY' | 'SELL';
  price: number;
  amount: number;
  balance: number;
  position: number;
  pnl: number;
  confidence: number;
  reason: string;
}

interface BacktestResult {
  trades: Trade[];
  metrics: {
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalReturn: number;
    totalReturnPercentage: number;
    maxDrawdown: number;
    sharpeRatio: number;
    profitFactor: number;
    averageWin: number;
    averageLoss: number;
    largestWin: number;
    largestLoss: number;
  };
  equity: Array<{ timestamp: number; value: number }>;
}

export class BacktestingService {
  async runBacktest(config: BacktestConfig): Promise<BacktestResult> {
    console.log('📊 Starting backtest...');
    console.log(`   Historical data points: ${config.historicalData.length}`);
    console.log(`   Initial balance: $${config.initialBalance}`);
    
    const strategy = this.buildStrategy(config.strategyConfig);
    
    const trades: Trade[] = [];
    const equity: Array<{ timestamp: number; value: number }> = [];
    
    let balance = config.initialBalance;
    let position = 0; // Amount of tokens held
    let lastTradeType: 'BUY' | 'SELL' | null = null;
    
    // Iterate through historical data with a sliding window
    const windowSize = 100; // Number of candles to analyze at once
    
    for (let i = windowSize; i < config.historicalData.length; i++) {
      const candles = config.historicalData.slice(i - windowSize, i);
      const currentCandle = config.historicalData[i];
      
      try {
        const result = await strategy.analyze(candles);
        
        // Only execute trades if confidence is high enough
        const minConfidence = 70;
        if (result.confidence < minConfidence) {
          // Track equity even without trading
          const currentValue = balance + position * currentCandle.close;
          equity.push({
            timestamp: currentCandle.timestamp,
            value: currentValue,
          });
          continue;
        }
        
        // Execute trade based on signal
        if (result.signal === 'BUY' && lastTradeType !== 'BUY' && balance > 0) {
          // Buy with all available balance
          const effectivePrice = currentCandle.close * (1 + config.slippage);
          const fee = balance * config.tradeFee;
          const amountToBuy = (balance - fee) / effectivePrice;
          
          position += amountToBuy;
          balance = 0;
          lastTradeType = 'BUY';
          
          trades.push({
            timestamp: currentCandle.timestamp,
            type: 'BUY',
            price: effectivePrice,
            amount: amountToBuy,
            balance,
            position,
            pnl: 0,
            confidence: result.confidence,
            reason: result.reason,
          });
        } else if (result.signal === 'SELL' && lastTradeType !== 'SELL' && position > 0) {
          // Sell all position
          const effectivePrice = currentCandle.close * (1 - config.slippage);
          const saleValue = position * effectivePrice;
          const fee = saleValue * config.tradeFee;
          
          // Calculate PnL from last BUY
          const lastBuyTrade = [...trades].reverse().find(t => t.type === 'BUY');
          const pnl = lastBuyTrade
            ? saleValue - fee - lastBuyTrade.amount * lastBuyTrade.price
            : 0;
          
          balance = saleValue - fee;
          position = 0;
          lastTradeType = 'SELL';
          
          trades.push({
            timestamp: currentCandle.timestamp,
            type: 'SELL',
            price: effectivePrice,
            amount: position,
            balance,
            position: 0,
            pnl,
            confidence: result.confidence,
            reason: result.reason,
          });
        }
        
        // Track equity
        const currentValue = balance + position * currentCandle.close;
        equity.push({
          timestamp: currentCandle.timestamp,
          value: currentValue,
        });
      } catch (error) {
        console.error(`Error at candle ${i}:`, error);
      }
    }
    
    // Calculate metrics
    const metrics = this.calculateMetrics(trades, equity, config.initialBalance);
    
    console.log('\n📈 Backtest Results:');
    console.log(`   Total trades: ${metrics.totalTrades}`);
    console.log(`   Win rate: ${metrics.winRate.toFixed(2)}%`);
    console.log(`   Total return: ${metrics.totalReturnPercentage.toFixed(2)}%`);
    console.log(`   Sharpe ratio: ${metrics.sharpeRatio.toFixed(2)}`);
    console.log(`   Max drawdown: ${metrics.maxDrawdown.toFixed(2)}%`);
    
    return {
      trades,
      metrics,
      equity,
    };
  }
  
  private buildStrategy(config: any): CompositeStrategy {
    const mode = config.mode || 'unanimous';
    const composite = new CompositeStrategy(mode);
    
    if (config.strategies && Array.isArray(config.strategies)) {
      for (const stratConfig of config.strategies) {
        const strategy = this.createStrategy(stratConfig.type, stratConfig.params);
        if (strategy) {
          composite.addStrategy(strategy, stratConfig.weight || 1);
        }
      }
    }
    
    return composite;
  }
  
  private createStrategy(type: string, params: any): any {
    switch (type) {
      case 'rsi':
        return new RsiStrategy(params);
      case 'macd':
        return new MacdStrategy(params);
      case 'bollinger':
        return new BollingerStrategy(params);
      default:
        return null;
    }
  }
  
  private calculateMetrics(
    trades: Trade[],
    equity: Array<{ timestamp: number; value: number }>,
    initialBalance: number
  ) {
    const winningTrades = trades.filter(t => t.pnl > 0);
    const losingTrades = trades.filter(t => t.pnl < 0);
    
    const totalReturn = equity.length > 0
      ? equity[equity.length - 1].value - initialBalance
      : 0;
    
    const totalReturnPercentage = (totalReturn / initialBalance) * 100;
    
    // Calculate max drawdown
    let maxDrawdown = 0;
    let peak = initialBalance;
    
    for (const point of equity) {
      if (point.value > peak) {
        peak = point.value;
      }
      const drawdown = ((peak - point.value) / peak) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    }
    
    // Calculate Sharpe Ratio (simplified)
    const returns: number[] = [];
    for (let i = 1; i < equity.length; i++) {
      const dailyReturn = (equity[i].value - equity[i - 1].value) / equity[i - 1].value;
      returns.push(dailyReturn);
    }
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const stdDev = Math.sqrt(
      returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length
    );
    const sharpeRatio = stdDev > 0 ? (avgReturn / stdDev) * Math.sqrt(252) : 0; // Annualized
    
    // Profit factor
    const totalProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
    const totalLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = totalLoss > 0 ? totalProfit / totalLoss : 0;
    
    return {
      totalTrades: trades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: trades.length > 0 ? (winningTrades.length / trades.length) * 100 : 0,
      totalReturn,
      totalReturnPercentage,
      maxDrawdown,
      sharpeRatio,
      profitFactor,
      averageWin: winningTrades.length > 0
        ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
        : 0,
      averageLoss: losingTrades.length > 0
        ? losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length
        : 0,
      largestWin: winningTrades.length > 0
        ? Math.max(...winningTrades.map(t => t.pnl))
        : 0,
      largestLoss: losingTrades.length > 0
        ? Math.min(...losingTrades.map(t => t.pnl))
        : 0,
    };
  }
}
