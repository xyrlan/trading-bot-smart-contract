# Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Redis 6+ installed and running
- Solana wallet with devnet SOL
- Trading bot smart contract deployed

## Step 1: Environment Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
yarn install

# Copy environment template
cp env.template .env
```

## Step 2: Configure Environment

Edit `.env` file with your configuration:

```env
# Get your backend wallet private key as JSON array
# Example: [123,45,67,...]
BACKEND_WALLET_PRIVATE_KEY=[your_private_key_array]

# Your deployed program ID
PROGRAM_ID=YourProgramIdHere

# Database connection
DATABASE_URL="postgresql://user:password@localhost:5432/trading_bot?schema=public"

# Redis connection
REDIS_HOST=localhost
REDIS_PORT=6379

# Solana RPC (use devnet for testing)
SOLANA_RPC_URL=https://api.devnet.solana.com

# Market data (optional, can use mock data for testing)
BIRDEYE_WS_URL=wss://public-api.birdeye.so/socket
TRADING_PAIRS=SOL/USDC
CANDLE_SIZE=5m
```

## Step 3: Database Setup

```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

## Step 4: Start the Backend

```bash
# Development mode
yarn dev

# Or production mode
yarn build
yarn start
```

## Step 5: Verify It's Running

Open your browser or use curl:

```bash
curl http://localhost:3001/health
```

You should see:

```json
{
  "status": "ok",
  "timestamp": "2026-01-12T...",
  "services": {
    "database": "connected",
    "marketData": "connected",
    "strategyEngine": "0 active strategies",
    "queue": {
      "waiting": 0,
      "active": 0,
      "completed": 0,
      "failed": 0
    }
  }
}
```

## Step 6: Create Your First Strategy

Using curl or Postman:

```bash
curl -X POST http://localhost:3001/api/strategies \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "your-user-id",
    "walletAddress": "YourWalletAddress",
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
        }
      ],
      "riskManagement": {
        "maxTradeSize": 0.01
      }
    }
  }'
```

## Step 7: Monitor Your Strategy

```bash
# Get strategy details
curl http://localhost:3001/api/strategies/YOUR_STRATEGY_ID

# Get signals
curl http://localhost:3001/api/strategies/YOUR_STRATEGY_ID/signals

# Get performance
curl http://localhost:3001/api/strategies/YOUR_STRATEGY_ID/performance
```

## Using Docker (Alternative)

If you prefer Docker:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

## Troubleshooting

### Database connection failed

```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Or on macOS
brew services list
```

### Redis connection failed

```bash
# Check if Redis is running
sudo systemctl status redis

# Or start Redis
sudo systemctl start redis
```

### WebSocket not connecting

- Check your BIRDEYE_WS_URL is correct
- For testing, you can disable market data and manually add candles

### No trades executing

1. Check queue stats: `curl http://localhost:3001/api/queue/stats`
2. Check logs for errors
3. Verify your bot_config PDA is initialized on-chain
4. Check wallet has enough SOL for transactions

## Next Steps

- Add more strategies (MACD, Bollinger Bands)
- Configure multiple token pairs
- Set up monitoring and alerts
- Deploy to production with PM2 or Docker
- Integrate with frontend dashboard

## Support

Check the main README.md for detailed documentation on:
- Strategy configuration
- Backtesting
- API endpoints
- Production deployment
