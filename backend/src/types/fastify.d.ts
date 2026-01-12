import 'fastify';
import { StrategyEngineService } from '../services/strategy-engine.service';

declare module 'fastify' {
  interface FastifyInstance {
    strategyEngine?: StrategyEngineService;
  }
}
