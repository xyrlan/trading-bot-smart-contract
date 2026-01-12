# Trading Bot Backend

Professional trading bot backend with technical indicators, strategy engine, and atomic transaction execution for Solana/Raydium.

## Features

- ✅ **Strategy Pattern Implementation**: Modular trading strategies (RSI, MACD, Bollinger Bands)
- ✅ **Composite Strategies**: Combine multiple indicators with confluence logic (unanimous, majority, weighted)
- ✅ **Market Data Service**: Real-time price streaming via WebSocket
- ✅ **Strategy Engine**: Automatic signal processing and execution
- ✅ **Atomic Transactions**: Smart contract authorization + Raydium swap in single transaction
- ✅ **BullMQ Queue System**: Reliable trade execution with retry logic
- ✅ **REST API**: Full CRUD for strategy management
- ✅ **Backtesting**: Test strategies on historical data
- ✅ **PostgreSQL Database**: Persistent storage for strategies and trades
- ✅ **Redis**: Queue management and caching

## Architecture

```
┌─────────────────┐
│  WebSocket API  │ (Birdeye/Helius)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Market Data    │
│    Service      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Strategy       │ ◄──────── PostgreSQL
│    Engine       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   BullMQ        │ ◄──────── Redis
│   Queue         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Execution      │ ────────► Solana
│   Service       │           (Smart Contract + Raydium)
└─────────────────┘
         │
         ▼
┌─────────────────┐
│   REST API      │ ◄──────► Frontend
└─────────────────┘
```

## Installation

```bash
# Install dependencies
yarn install

# Setup environment variables
cp env.template .env
# Edit .env with your configuration

# Setup database
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## Environment Variables

```env
# Solana Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
BACKEND_WALLET_PRIVATE_KEY=[your_backend_wallet_private_key_array]
PROGRAM_ID=your_program_id_here

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/trading_bot?schema=public"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# Market Data
BIRDEYE_API_KEY=your_api_key
BIRDEYE_WS_URL=wss://public-api.birdeye.so/socket

# API Server
API_PORT=3001
API_HOST=0.0.0.0

# Trading
DEFAULT_SLIPPAGE=0.01
MIN_CONFIDENCE_THRESHOLD=70
TRADING_PAIRS=SOL/USDC
CANDLE_SIZE=5m
```

## Usage

### Development

```bash
# Run in development mode
yarn dev
```

### Production

```bash
# Build
yarn build

# Start
yarn start

# Or use PM2
yarn start:pm2
```

## API Endpoints

### Strategy Management

- `POST /api/strategies` - Create new strategy
- `GET /api/strategies/user/:userId` - List user strategies
- `GET /api/strategies/:id` - Get strategy details
- `PUT /api/strategies/:id` - Update strategy
- `DELETE /api/strategies/:id` - Delete strategy
- `POST /api/strategies/:id/pause` - Pause strategy
- `POST /api/strategies/:id/resume` - Resume strategy
- `GET /api/strategies/:id/performance` - Get performance metrics
- `GET /api/strategies/:id/signals` - Get trade signals

### System

- `GET /health` - Health check
- `GET /api/queue/stats` - Queue statistics
- `POST /api/queue/pause` - Pause queue
- `POST /api/queue/resume` - Resume queue

## Strategy Configuration Example

```json
{
  "userId": "user123",
  "walletAddress": "3KkQ...",
  "tokenPair": "SOL/USDC",
  "strategyType": "composite",
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
        "weight": 2,
        "params": {
          "fastPeriod": 12,
          "slowPeriod": 26,
          "signalPeriod": 9
        }
      }
    ],
    "riskManagement": {
      "maxTradeSize": 0.1,
      "stopLoss": 0.05,
      "takeProfit": 0.15
    }
  }
}
```

## Backtesting

```typescript
import { BacktestingService } from './services/backtesting.service';

const backtester = new BacktestingService();

const result = await backtester.runBacktest({
  strategyConfig: myStrategyConfig,
  historicalData: candleData,
  initialBalance: 1000,
  tradeFee: 0.003,
  slippage: 0.001,
});

console.log('Total Return:', result.metrics.totalReturnPercentage);
console.log('Win Rate:', result.metrics.winRate);
console.log('Sharpe Ratio:', result.metrics.sharpeRatio);
```

## Database Schema

The system uses PostgreSQL with Prisma ORM. Main tables:

- `StrategyConfig` - User strategy configurations
- `TradeSignal` - Generated trading signals
- `Trade` - Executed trades
- `CandleData` - Historical price data
- `BotConfig` - Bot configuration per user

## Security

- Backend wallet signs transactions with delegated authority
- Smart contract validates all trades against configured limits
- Atomic transactions ensure swap authorization and execution happen together
- No private keys exposed to frontend

## Monitoring

- Real-time queue statistics
- Trade execution logs
- Strategy performance metrics
- System health endpoint

## License

MIT
