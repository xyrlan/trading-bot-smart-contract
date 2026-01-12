import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { db } from '../config/database';
import { CreateStrategyDto, UpdateStrategyDto, StrategyPerformance } from '../models/strategy-config.model';
import { SignalFilter } from '../models/trade-signal.model';

export async function strategyRoutes(fastify: FastifyInstance) {
  // Create new strategy
  fastify.post('/strategies', async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as CreateStrategyDto;
    
    try {
      const strategy = await db.strategyConfig.create({
        data: {
          userId: data.userId,
          walletAddress: data.walletAddress,
          tokenPair: data.tokenPair,
          strategyType: data.strategyType,
          config: data.config,
          status: 'ACTIVE',
        },
      });
      
      // Emit event to reload strategy in engine
      fastify.strategyEngine?.reloadStrategy(strategy.id);
      
      return reply.code(201).send(strategy);
    } catch (error) {
      console.error('Error creating strategy:', error);
      return reply.code(500).send({ error: 'Failed to create strategy' });
    }
  });
  
  // List user strategies
  fastify.get('/strategies/user/:userId', async (request: FastifyRequest<{
    Params: { userId: string };
    Querystring: { status?: string; tokenPair?: string };
  }>, reply: FastifyReply) => {
    const { userId } = request.params;
    const { status, tokenPair } = request.query;
    
    try {
      const strategies = await db.strategyConfig.findMany({
        where: {
          userId,
          ...(status && { status }),
          ...(tokenPair && { tokenPair }),
        },
        orderBy: { createdAt: 'desc' },
      });
      
      return reply.send(strategies);
    } catch (error) {
      console.error('Error fetching strategies:', error);
      return reply.code(500).send({ error: 'Failed to fetch strategies' });
    }
  });
  
  // Get strategy by ID
  fastify.get('/strategies/:id', async (request: FastifyRequest<{
    Params: { id: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    
    try {
      const strategy = await db.strategyConfig.findUnique({
        where: { id },
        include: {
          signals: {
            orderBy: { createdAt: 'desc' },
            take: 10,
          },
        },
      });
      
      if (!strategy) {
        return reply.code(404).send({ error: 'Strategy not found' });
      }
      
      return reply.send(strategy);
    } catch (error) {
      console.error('Error fetching strategy:', error);
      return reply.code(500).send({ error: 'Failed to fetch strategy' });
    }
  });
  
  // Update strategy
  fastify.put('/strategies/:id', async (request: FastifyRequest<{
    Params: { id: string };
    Body: UpdateStrategyDto;
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    const data = request.body;
    
    try {
      const strategy = await db.strategyConfig.update({
        where: { id },
        data: {
          ...(data.strategyType && { strategyType: data.strategyType }),
          ...(data.config && { config: data.config }),
          ...(data.status && { status: data.status }),
        },
      });
      
      // Reload strategy in engine
      fastify.strategyEngine?.reloadStrategy(id);
      
      return reply.send(strategy);
    } catch (error) {
      console.error('Error updating strategy:', error);
      return reply.code(500).send({ error: 'Failed to update strategy' });
    }
  });
  
  // Delete strategy
  fastify.delete('/strategies/:id', async (request: FastifyRequest<{
    Params: { id: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    
    try {
      await db.strategyConfig.update({
        where: { id },
        data: { status: 'DELETED' },
      });
      
      // Remove from active strategies
      fastify.strategyEngine?.pauseStrategy(id);
      
      return reply.send({ success: true });
    } catch (error) {
      console.error('Error deleting strategy:', error);
      return reply.code(500).send({ error: 'Failed to delete strategy' });
    }
  });
  
  // Pause strategy
  fastify.post('/strategies/:id/pause', async (request: FastifyRequest<{
    Params: { id: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    
    try {
      await fastify.strategyEngine?.pauseStrategy(id);
      return reply.send({ success: true, status: 'PAUSED' });
    } catch (error) {
      console.error('Error pausing strategy:', error);
      return reply.code(500).send({ error: 'Failed to pause strategy' });
    }
  });
  
  // Resume strategy
  fastify.post('/strategies/:id/resume', async (request: FastifyRequest<{
    Params: { id: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    
    try {
      await fastify.strategyEngine?.resumeStrategy(id);
      return reply.send({ success: true, status: 'ACTIVE' });
    } catch (error) {
      console.error('Error resuming strategy:', error);
      return reply.code(500).send({ error: 'Failed to resume strategy' });
    }
  });
  
  // Get strategy performance
  fastify.get('/strategies/:id/performance', async (request: FastifyRequest<{
    Params: { id: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    
    try {
      const trades = await db.trade.findMany({
        where: { strategyId: id },
      });
      
      const performance: StrategyPerformance = {
        strategyId: id,
        totalTrades: trades.length,
        successfulTrades: trades.filter((t: any) => t.status === 'CONFIRMED').length,
        failedTrades: trades.filter((t: any) => t.status === 'FAILED').length,
        totalProfit: 0,
        totalLoss: 0,
        winRate: 0,
        averageReturn: 0,
      };
      
      let totalReturn = 0;
      
      for (const trade of trades) {
        const pnl = trade.amountOut - trade.amountIn;
        if (pnl > 0) {
          performance.totalProfit += pnl;
        } else {
          performance.totalLoss += Math.abs(pnl);
        }
        totalReturn += pnl;
      }
      
      if (trades.length > 0) {
        performance.winRate = (performance.successfulTrades / trades.length) * 100;
        performance.averageReturn = totalReturn / trades.length;
      }
      
      return reply.send(performance);
    } catch (error) {
      console.error('Error calculating performance:', error);
      return reply.code(500).send({ error: 'Failed to calculate performance' });
    }
  });
  
  // Get signals for a strategy
  fastify.get('/strategies/:id/signals', async (request: FastifyRequest<{
    Params: { id: string };
    Querystring: { limit?: number; executed?: string };
  }>, reply: FastifyReply) => {
    const { id } = request.params;
    const { limit = 50, executed } = request.query;
    
    try {
      const signals = await db.tradeSignal.findMany({
        where: {
          strategyId: id,
          ...(executed !== undefined && { executed: executed === 'true' }),
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      
      return reply.send(signals);
    } catch (error) {
      console.error('Error fetching signals:', error);
      return reply.code(500).send({ error: 'Failed to fetch signals' });
    }
  });
}
