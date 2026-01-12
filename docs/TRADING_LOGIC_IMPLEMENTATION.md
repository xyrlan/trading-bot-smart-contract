# Trading Logic Implementation - Complete Guide

## Overview

This document explains the complete implementation of the trading bot system with technical indicators, strategy engine, and atomic transaction execution.

## Architecture

### High-Level Flow

```
User Creates Strategy → Strategy Engine Loads Config → Market Data Streams
                                                              ↓
                                                    Indicators Calculate
                                                              ↓
                                                    Signals Generated
                                                              ↓
                                                    Queue Job Created
                                                              ↓
                                            Atomic Transaction Built
                                                              ↓
                                    Smart Contract Authorization ← Raydium Swap
                                                              ↓
                                                    Trade Executed
                                                              ↓
                                                    Results Stored
```

### Component Breakdown

#### 1. Strategy Pattern (Modular Indicators)

**Files:**
- `backend/src/strategies/base.strategy.ts` - Interface and base class
- `backend/src/strategies/rsi.strategy.ts` - RSI implementation
- `backend/src/strategies/macd.strategy.ts` - MACD implementation
- `backend/src/strategies/bollinger.strategy.ts` - Bollinger Bands implementation
- `backend/src/strategies/composite.strategy.ts` - Combines multiple strategies

**How it works:**
```typescript
// Each strategy implements the TradingStrategy interface
interface TradingStrategy {
  name: string;
  analyze(candles: CandleData[]): Promise<StrategyResult>;
}

// Results include signal, confidence, and reason
interface StrategyResult {
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number; // 0-100
  indicators: Record<string, number>;
  reason: string;
}
```

**Example:**
```typescript
const rsiStrategy = new RsiStrategy({
  period: 14,
  oversold: 30,
  overbought: 70
});

const result = await rsiStrategy.analyze(candles);
// result.signal = 'BUY'
// result.confidence = 85
// result.reason = 'RSI(14): 25.43 - Oversold'
```

#### 2. Composite Strategy (Cross-Indicator Logic)

**File:** `backend/src/strategies/composite.strategy.ts`

**Three Modes:**

**Unanimous Mode:**
- ALL indicators must agree
- Most conservative
- Example: RSI says BUY AND MACD says BUY → Execute trade

**Majority Mode:**
- More than 50% of indicators must agree
- Balanced approach
- Example: 2 out of 3 indicators say BUY → Execute trade

**Weighted Mode:**
- Each indicator has a weight
- Score-based decision
- Example: MACD (weight 2) + RSI (weight 1) = weighted score

**Example Configuration:**
```typescript
const composite = new CompositeStrategy('weighted');

composite.addStrategy(new RsiStrategy(...), 1);   // Weight: 1
composite.addStrategy(new MacdStrategy(...), 2);  // Weight: 2 (more important)
composite.addStrategy(new BollingerStrategy(...), 1); // Weight: 1

const result = await composite.analyze(candles);
// Calculates weighted score and returns final decision
```

#### 3. Market Data Service

**File:** `backend/src/services/market-data.service.ts`

**Responsibilities:**
- Connect to WebSocket (Birdeye, Helius)
- Aggregate price updates into candles
- Emit candle events for strategy processing
- Maintain historical data in memory

**Flow:**
1. WebSocket receives price update
2. Update current candle (OHLCV)
3. On candle close, save to history
4. Emit event to Strategy Engine

#### 4. Strategy Engine

**File:** `backend/src/services/strategy-engine.service.ts`

**Responsibilities:**
- Load active strategies from database
- Process candle updates
- Run strategy analysis
- Generate trade signals
- Emit signals to execution queue

**Flow:**
```
New Candle → Load Strategies for Pair → Run Analysis → Check Confidence
                                                              ↓
                                                    Confidence > Threshold?
                                                              ↓
                                                    Yes → Emit Signal
                                                    No → Log and Skip
```

#### 5. Trading Queue (BullMQ)

**File:** `backend/src/queues/trading.queue.ts`

**Why use a queue?**
- Prevents overwhelming the execution service
- Retry failed trades automatically
- Priority-based execution (high confidence first)
- Rate limiting (max trades per second)

**Features:**
- Exponential backoff on failures
- Job deduplication (prevent duplicate signals)
- Persistent storage in Redis
- Concurrency control

#### 6. Execution Service (Atomic Transactions)

**File:** `backend/src/services/execution.service.ts`

**The Critical Part - Atomic Transactions:**

```typescript
async executeAtomicTrade(signal) {
  // 1. Get Raydium quote
  const quote = await raydium.getQuote(...)
  
  // 2. Build Raydium swap instructions
  const raydiumIxs = await raydium.getSwapInstructions(...)
  
  // 3. Create Smart Contract authorization
  const authorizeIx = await program.methods
    .authorizeSwap(amountIn, minAmountOut)
    .instruction()
  
  // 4. Build ATOMIC transaction
  const tx = new Transaction()
  tx.add(authorizeIx)      // ← FIRST: Check limits
  tx.add(...raydiumIxs)    // ← SECOND: Execute swap
  
  // 5. Sign and send
  // If authorize fails, Raydium swap never executes!
  return await connection.sendTransaction(tx)
}
```

**Why this is secure:**
- Smart contract checks limits BEFORE swap executes
- If backend is compromised, attacker can't bypass limits
- Single transaction = all-or-nothing execution
- No race conditions

#### 7. REST API

**File:** `backend/src/api/strategies.controller.ts`

**Endpoints:**
- `POST /api/strategies` - Create strategy
- `GET /api/strategies/user/:userId` - List strategies
- `GET /api/strategies/:id` - Get details
- `PUT /api/strategies/:id` - Update strategy
- `POST /api/strategies/:id/pause` - Pause trading
- `POST /api/strategies/:id/resume` - Resume trading
- `GET /api/strategies/:id/performance` - View metrics
- `GET /api/strategies/:id/signals` - View signals

#### 8. Database Schema

**File:** `backend/prisma/schema.prisma`

**Key Tables:**
- `StrategyConfig` - User strategy definitions
- `TradeSignal` - Generated signals with indicators
- `Trade` - Executed trades with results
- `CandleData` - Historical price data
- `BotConfig` - Per-user bot settings

#### 9. Backtesting Service

**File:** `backend/src/services/backtesting.service.ts`

**Purpose:**
- Test strategies on historical data
- Calculate performance metrics
- Compare different configurations
- Optimize parameters

**Metrics Provided:**
- Total Return (% and $)
- Win Rate
- Sharpe Ratio
- Max Drawdown
- Profit Factor
- Average Win/Loss
- Largest Win/Loss

## How to Register Trading Logic Rules

### Option 1: Predefined Strategies

Create a JSON configuration:

```json
{
  "strategyType": "rsi_macd_combo",
  "config": {
    "mode": "unanimous",
    "strategies": [
      {
        "type": "rsi",
        "weight": 1,
        "params": {
          "period": 14,
          "oversold": 30,
          "overbought": 70
        }
      },
      {
        "type": "macd",
        "weight": 1,
        "params": {
          "fastPeriod": 12,
          "slowPeriod": 26,
          "signalPeriod": 9
        }
      }
    ]
  }
}
```

### Option 2: Custom Indicator

Extend the base strategy:

```typescript
// backend/src/strategies/custom.strategy.ts
import { BaseStrategy, CandleData, StrategyResult } from './base.strategy';

export class CustomStrategy extends BaseStrategy {
  name = 'Custom Indicator';
  
  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    // Your custom logic here
    const signal = this.calculateCustomIndicator(candles);
    
    return {
      signal,
      confidence: 75,
      indicators: { customValue: signal },
      reason: 'Custom condition met'
    };
  }
  
  private calculateCustomIndicator(candles: CandleData[]) {
    // Implement your logic
  }
}
```

### Option 3: Dynamic Rules Engine

For more complex rules, you can create a rule builder:

```typescript
// backend/src/strategies/rules-engine.ts
export class RulesEngine {
  private rules: Rule[] = [];
  
  addRule(rule: Rule) {
    this.rules.push(rule);
  }
  
  evaluate(candles: CandleData[]): StrategyResult {
    const matches = this.rules.filter(r => r.condition(candles));
    
    if (matches.length > 0) {
      return {
        signal: matches[0].action,
        confidence: matches[0].confidence,
        indicators: {},
        reason: matches[0].reason
      };
    }
    
    return { signal: 'NEUTRAL', ... };
  }
}

// Usage
const engine = new RulesEngine();

engine.addRule({
  condition: (candles) => {
    const rsi = calculateRSI(candles);
    const macd = calculateMACD(candles);
    return rsi < 30 && macd.histogram > 0;
  },
  action: 'BUY',
  confidence: 80,
  reason: 'RSI oversold + MACD bullish'
});
```

## Cross-Indicator Logic Examples

### Example 1: RSI + MACD Confluence

```typescript
const composite = new CompositeStrategy('unanimous');

composite.addStrategy(new RsiStrategy({
  period: 14,
  oversold: 30,
  overbought: 70
}), 1);

composite.addStrategy(new MacdStrategy({
  fastPeriod: 12,
  slowPeriod: 26,
  signalPeriod: 9
}), 1);

// Only trades when BOTH RSI and MACD agree
```

### Example 2: Triple Confirmation

```typescript
const composite = new CompositeStrategy('majority');

composite.addStrategy(new RsiStrategy(...), 1);
composite.addStrategy(new MacdStrategy(...), 1);
composite.addStrategy(new BollingerStrategy(...), 1);

// Trades when at least 2 out of 3 agree
```

### Example 3: Weighted Decision

```typescript
const composite = new CompositeStrategy('weighted');

composite.addStrategy(new RsiStrategy(...), 1);
composite.addStrategy(new MacdStrategy(...), 3);  // 3x more important
composite.addStrategy(new BollingerStrategy(...), 1);

// MACD has more influence on final decision
```

### Example 4: Custom Complex Logic

```typescript
class AdvancedStrategy extends BaseStrategy {
  async analyze(candles: CandleData[]): Promise<StrategyResult> {
    const rsi = await this.rsiStrategy.analyze(candles);
    const macd = await this.macdStrategy.analyze(candles);
    const bb = await this.bollingerStrategy.analyze(candles);
    
    // Custom logic: Buy only if RSI oversold AND (MACD bullish OR BB lower band)
    if (rsi.signal === 'BUY' && 
        (macd.signal === 'BUY' || bb.signal === 'BUY')) {
      return {
        signal: 'BUY',
        confidence: (rsi.confidence + macd.confidence + bb.confidence) / 3,
        indicators: {
          ...rsi.indicators,
          ...macd.indicators,
          ...bb.indicators
        },
        reason: `Custom: ${rsi.reason} + ${macd.reason} + ${bb.reason}`
      };
    }
    
    return { signal: 'NEUTRAL', ... };
  }
}
```

## Production Deployment

### Prerequisites

1. PostgreSQL database
2. Redis server
3. Solana RPC (preferably private/paid for reliability)
4. Market data subscription (Birdeye, Helius)

### Steps

1. **Build the project:**
   ```bash
   yarn build
   ```

2. **Setup environment:**
   ```bash
   cp env.template .env
   # Edit .env with production values
   ```

3. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

5. **Monitor:**
   ```bash
   pm2 logs
   pm2 monit
   ```

## Testing

### Unit Tests

```bash
yarn test
```

### Backtesting

```bash
cd backend
npx ts-node examples/run-backtest.ts
```

### Integration Tests

```bash
# Start backend
yarn dev

# In another terminal, run strategy creation
npx ts-node examples/create-strategy.ts
```

## Monitoring and Alerts

### Metrics to Monitor

- Queue depth (waiting jobs)
- Failed trade ratio
- Strategy win rate
- Response times
- Error rates

### Logs

All services log to console. In production:
- Stdout/stderr captured by PM2
- Logs stored in `logs/` directory
- Consider centralized logging (Datadog, LogDNA)

## FAQ

**Q: How do I add a new indicator?**
A: Create a new file in `backend/src/strategies/`, extend `BaseStrategy`, implement `analyze()` method.

**Q: Can I use multiple strategies per token pair?**
A: Yes! Create multiple `StrategyConfig` entries with the same `tokenPair`.

**Q: How do I prevent duplicate trades?**
A: The queue uses `signalId` as job ID, preventing duplicates automatically.

**Q: What happens if the backend crashes mid-trade?**
A: BullMQ stores jobs in Redis. On restart, pending jobs resume automatically.

**Q: Can I update a strategy without stopping the bot?**
A: Yes! Use `PUT /api/strategies/:id`. The engine reloads automatically.

**Q: How do I test a strategy without risking real money?**
A: Use the backtesting service with historical data first.

## Next Steps

1. Integrate real market data (Birdeye subscription)
2. Add more indicators (Stochastic, ATR, Volume Profile)
3. Implement stop-loss and take-profit tracking
4. Add email/Telegram notifications
5. Build frontend dashboard
6. Add machine learning for parameter optimization

## Support

For issues or questions:
- Check logs: `pm2 logs trading-bot-backend`
- Check queue: `curl http://localhost:3001/api/queue/stats`
- Check health: `curl http://localhost:3001/health`
