import Fastify from 'fastify';
import { connectDatabase, disconnectDatabase } from './config/database';
import { MarketDataService } from './services/market-data.service';
import { StrategyEngineService } from './services/strategy-engine.service';
import { ExecutionService } from './services/execution.service';
import { TradingQueue } from './queues/trading.queue';
import { strategyRoutes } from './api/strategies.controller';

// Extend Fastify instance type
declare module 'fastify' {
  interface FastifyInstance {
    strategyEngine?: StrategyEngineService;
  }
}

async function bootstrap() {
  console.log('🚀 Starting Trading Bot Backend...\n');
  
  try {
    // 1. Connect to database
    await connectDatabase();
    
    // 2. Initialize services
    console.log('\n📦 Initializing services...');
    
    const executionService = new ExecutionService();
    await executionService.initialize();
    
    const strategyEngine = new StrategyEngineService();
    await strategyEngine.initialize();
    
    const tradingQueue = new TradingQueue(executionService);
    
    const marketDataService = new MarketDataService({
      wsUrl: process.env.BIRDEYE_WS_URL || 'wss://public-api.birdeye.so/socket/solana',
      pairs: (process.env.TRADING_PAIRS || 'SOL/USDC').split(','),
      candleSize: (process.env.CANDLE_SIZE as any) || '5m',
      reconnectInterval: 5000,
      apiKey: process.env.BIRDEYE_API_KEY,
    });
    
    // 3. Setup event handlers
    console.log('\n🔗 Setting up event handlers...');
    
    // When strategy engine generates a signal, add to queue
    strategyEngine.on('signal', async (signalData) => {
      console.log(`\n📨 Received signal from strategy engine`);
      await tradingQueue.addTradeJob(signalData);
    });
    
    // When market data updates, process signals
    marketDataService.on('candle', async ({ pair, candles }) => {
      await strategyEngine.processSignal(pair, candles);
    });
    
    // When execution service completes a trade
    executionService.on('trade-executed', (data) => {
      console.log(`\n✅ Trade executed successfully: ${data.signature}`);
    });
    
    executionService.on('trade-failed', (data) => {
      console.error(`\n❌ Trade failed: ${data.error}`);
    });
    
    // 4. Start Fastify API server
    console.log('\n🌐 Starting API server...');
    
    const fastify = Fastify({
      logger: {
        level: process.env.LOG_LEVEL || 'info',
      },
    });
    
    // Register plugins and routes
    fastify.decorate('strategyEngine', strategyEngine);
    
    // Enable CORS
    fastify.register(require('@fastify/cors'), {
      origin: true,
    });
    
    // Register routes
    fastify.register(strategyRoutes, { prefix: '/api' });
    
    // Health check
    fastify.get('/health', async () => {
      const queueStats = await tradingQueue.getQueueStats();
      
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
          marketData: marketDataService.isConnectedToMarket() ? 'connected' : 'disconnected',
          strategyEngine: `${strategyEngine.getActiveStrategyCount()} active strategies`,
          queue: queueStats,
        },
      };
    });
    
    // Queue management endpoints
    fastify.get('/api/queue/stats', async () => {
      return await tradingQueue.getQueueStats();
    });
    
    fastify.post('/api/queue/pause', async () => {
      await tradingQueue.pauseQueue();
      return { success: true };
    });
    
    fastify.post('/api/queue/resume', async () => {
      await tradingQueue.resumeQueue();
      return { success: true };
    });
    
    const port = parseInt(process.env.API_PORT || '3001');
    const host = process.env.API_HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    
    console.log(`\n✅ API server listening on http://${host}:${port}`);
    
    // 5. Start market data service
    console.log('\n📡 Starting market data service...');
    marketDataService.start();
    
    console.log('\n✅ Trading Bot Backend is running!\n');
    console.log('═══════════════════════════════════════');
    console.log('  📊 Strategy Engine: Active');
    console.log('  ⚡ Execution Service: Ready');
    console.log('  📨 Trading Queue: Running');
    console.log('  📡 Market Data: Streaming');
    console.log('  🌐 API Server: http://localhost:' + port);
    console.log('═══════════════════════════════════════\n');
    
    // Graceful shutdown
    const shutdown = async () => {
      console.log('\n\n🛑 Shutting down gracefully...');
      
      marketDataService.stop();
      await tradingQueue.close();
      await fastify.close();
      await disconnectDatabase();
      
      console.log('✅ Shutdown complete');
      process.exit(0);
    };
    
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    
  } catch (error) {
    console.error('❌ Failed to start backend:', error);
    process.exit(1);
  }
}

// Start the application
bootstrap().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
