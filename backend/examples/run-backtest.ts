/**
 * Example script to run backtesting
 * 
 * This demonstrates how to test your strategies on historical data
 * before running them live.
 */

import { BacktestingService } from '../src/services/backtesting.service';
import { CandleData } from '../src/strategies/base.strategy';

// Mock historical data generator
// In production, you'd fetch this from Birdeye, CoinGecko, or another data provider
function generateMockHistoricalData(days: number = 30): CandleData[] {
  const candles: CandleData[] = [];
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  
  let price = 100; // Starting price
  
  for (let i = 0; i < days * 288; i++) { // 288 5-minute candles per day
    const timestamp = now - (days * 288 - i) * fiveMinutes;
    
    // Simulate price movement with some randomness and trend
    const trend = Math.sin(i / 100) * 5; // Cyclical trend
    const volatility = (Math.random() - 0.5) * 3;
    
    const open = price;
    const change = trend + volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    const volume = 1000 + Math.random() * 5000;
    
    candles.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    });
    
    price = close; // Update price for next candle
  }
  
  return candles;
}

async function runSimpleRsiBacktest() {
  console.log('\n📊 Running RSI Strategy Backtest...\n');
  
  const backtester = new BacktestingService();
  
  const strategyConfig = {
    mode: 'unanimous',
    strategies: [
      {
        type: 'rsi',
        weight: 1,
        params: {
          period: 14,
          oversold: 30,
          overbought: 70,
        },
      },
    ],
  };
  
  const historicalData = generateMockHistoricalData(30); // 30 days
  
  const result = await backtester.runBacktest({
    strategyConfig,
    historicalData,
    initialBalance: 1000, // Start with $1000
    tradeFee: 0.003,      // 0.3% fee
    slippage: 0.001,      // 0.1% slippage
  });
  
  console.log('═══════════════════════════════════════');
  console.log('  Backtest Results - RSI Strategy');
  console.log('═══════════════════════════════════════');
  console.log(`Total Trades:        ${result.metrics.totalTrades}`);
  console.log(`Winning Trades:      ${result.metrics.winningTrades}`);
  console.log(`Losing Trades:       ${result.metrics.losingTrades}`);
  console.log(`Win Rate:            ${result.metrics.winRate.toFixed(2)}%`);
  console.log(`Total Return:        $${result.metrics.totalReturn.toFixed(2)}`);
  console.log(`Return Percentage:   ${result.metrics.totalReturnPercentage.toFixed(2)}%`);
  console.log(`Max Drawdown:        ${result.metrics.maxDrawdown.toFixed(2)}%`);
  console.log(`Sharpe Ratio:        ${result.metrics.sharpeRatio.toFixed(2)}`);
  console.log(`Profit Factor:       ${result.metrics.profitFactor.toFixed(2)}`);
  console.log(`Average Win:         $${result.metrics.averageWin.toFixed(2)}`);
  console.log(`Average Loss:        $${result.metrics.averageLoss.toFixed(2)}`);
  console.log(`Largest Win:         $${result.metrics.largestWin.toFixed(2)}`);
  console.log(`Largest Loss:        $${result.metrics.largestLoss.toFixed(2)}`);
  console.log('═══════════════════════════════════════\n');
  
  return result;
}

async function runCompositeBacktest() {
  console.log('\n📊 Running Composite Strategy Backtest...\n');
  
  const backtester = new BacktestingService();
  
  const strategyConfig = {
    mode: 'weighted',
    strategies: [
      {
        type: 'rsi',
        weight: 1,
        params: {
          period: 14,
          oversold: 30,
          overbought: 70,
        },
      },
      {
        type: 'macd',
        weight: 2,
        params: {
          fastPeriod: 12,
          slowPeriod: 26,
          signalPeriod: 9,
        },
      },
      {
        type: 'bollinger',
        weight: 1,
        params: {
          period: 20,
          stdDev: 2,
        },
      },
    ],
  };
  
  const historicalData = generateMockHistoricalData(60); // 60 days
  
  const result = await backtester.runBacktest({
    strategyConfig,
    historicalData,
    initialBalance: 5000,
    tradeFee: 0.003,
    slippage: 0.001,
  });
  
  console.log('═══════════════════════════════════════');
  console.log('  Backtest Results - Composite Strategy');
  console.log('═══════════════════════════════════════');
  console.log(`Total Trades:        ${result.metrics.totalTrades}`);
  console.log(`Win Rate:            ${result.metrics.winRate.toFixed(2)}%`);
  console.log(`Total Return:        $${result.metrics.totalReturn.toFixed(2)}`);
  console.log(`Return Percentage:   ${result.metrics.totalReturnPercentage.toFixed(2)}%`);
  console.log(`Sharpe Ratio:        ${result.metrics.sharpeRatio.toFixed(2)}`);
  console.log('═══════════════════════════════════════\n');
  
  return result;
}

async function compareStrategies() {
  console.log('\n📊 Comparing Multiple Strategies...\n');
  
  const backtester = new BacktestingService();
  const historicalData = generateMockHistoricalData(30);
  
  const strategies = [
    {
      name: 'Conservative RSI',
      config: {
        mode: 'unanimous',
        strategies: [
          {
            type: 'rsi',
            weight: 1,
            params: { period: 14, oversold: 25, overbought: 75 },
          },
        ],
      },
    },
    {
      name: 'Aggressive RSI',
      config: {
        mode: 'unanimous',
        strategies: [
          {
            type: 'rsi',
            weight: 1,
            params: { period: 7, oversold: 35, overbought: 65 },
          },
        ],
      },
    },
    {
      name: 'MACD Only',
      config: {
        mode: 'unanimous',
        strategies: [
          {
            type: 'macd',
            weight: 1,
            params: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9 },
          },
        ],
      },
    },
  ];
  
  console.log('═══════════════════════════════════════');
  console.log('  Strategy Comparison');
  console.log('═══════════════════════════════════════\n');
  
  for (const strategy of strategies) {
    const result = await backtester.runBacktest({
      strategyConfig: strategy.config,
      historicalData,
      initialBalance: 1000,
      tradeFee: 0.003,
      slippage: 0.001,
    });
    
    console.log(`${strategy.name}:`);
    console.log(`  Return: ${result.metrics.totalReturnPercentage.toFixed(2)}%`);
    console.log(`  Win Rate: ${result.metrics.winRate.toFixed(2)}%`);
    console.log(`  Sharpe: ${result.metrics.sharpeRatio.toFixed(2)}`);
    console.log(`  Max DD: ${result.metrics.maxDrawdown.toFixed(2)}%`);
    console.log('');
  }
  
  console.log('═══════════════════════════════════════\n');
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Backtesting Examples');
  console.log('═══════════════════════════════════════');
  
  // Run different backtests
  await runSimpleRsiBacktest();
  // await runCompositeBacktest();
  // await compareStrategies();
  
  console.log('✅ Backtesting complete!\n');
  console.log('💡 Tip: Replace generateMockHistoricalData() with real');
  console.log('   historical data from Birdeye or CoinGecko API\n');
}

main().catch(console.error);
