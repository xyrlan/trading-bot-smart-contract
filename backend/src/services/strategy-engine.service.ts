import 'dotenv/config';
import { EventEmitter } from 'events';
import { db } from '../config/database';
import { CandleData, StrategyResult } from '../strategies/base.strategy';
import { CompositeStrategy, ConflictResolution } from '../strategies/composite.strategy';
import { RsiStrategy, RsiConfig } from '../strategies/rsi.strategy';
import { MacdStrategy, MacdConfig } from '../strategies/macd.strategy';
import { BollingerStrategy, BollingerConfig } from '../strategies/bollinger.strategy';

interface StrategyConfigData {
  id: string;
  userId: string;
  walletAddress: string;
  tokenPair: string;
  strategyType: string;
  config: any;
  status: string;
}

export class StrategyEngineService extends EventEmitter {
  private activeStrategies = new Map<string, CompositeStrategy>();
  private lastProcessedTime = new Map<string, number>();
  private minProcessInterval = 5000; // Minimum 5 seconds between signals
  
  constructor() {
    super();
  }
  
  async initialize(): Promise<void> {
    console.log('🧠 Initializing Strategy Engine...');
    await this.loadUserStrategies();
    console.log(`✅ Loaded ${this.activeStrategies.size} active strategies`);
  }
  
  async loadUserStrategies(): Promise<void> {
    try {
      const configs = await db.strategyConfig.findMany({
        where: { status: 'ACTIVE' },
      });
      
      for (const config of configs) {
        try {
          const composite = this.buildCompositeFromConfig(config);
          this.activeStrategies.set(config.id, composite);
          console.log(`📊 Loaded strategy: ${config.strategyType} for ${config.tokenPair}`);
        } catch (error) {
          console.error(`Error building strategy ${config.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error loading user strategies:', error);
      throw error;
    }
  }
  
  private buildCompositeFromConfig(config: StrategyConfigData): CompositeStrategy {
    const strategyConfig = config.config;
    const mode = strategyConfig.mode as ConflictResolution || 'unanimous';
    const composite = new CompositeStrategy(mode);
    
    // Build individual strategies from config
    if (strategyConfig.strategies && Array.isArray(strategyConfig.strategies)) {
      for (const stratConfig of strategyConfig.strategies) {
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
        return new RsiStrategy(params as RsiConfig);
      case 'macd':
        return new MacdStrategy(params as MacdConfig);
      case 'bollinger':
        return new BollingerStrategy(params as BollingerConfig);
      default:
        console.warn(`Unknown strategy type: ${type}`);
        return null;
    }
  }
  
  async processSignal(pair: string, candles: CandleData[]): Promise<void> {
    const now = Date.now();
    
    // Find all strategies for this pair
    const strategiesForPair = await db.strategyConfig.findMany({
      where: {
        tokenPair: pair,
        status: 'ACTIVE',
      },
    });
    
    for (const strategyConfig of strategiesForPair) {
      const { id } = strategyConfig;
      
      // Throttle signal processing
      const lastProcessed = this.lastProcessedTime.get(id) || 0;
      if (now - lastProcessed < this.minProcessInterval) {
        continue;
      }
      
      const composite = this.activeStrategies.get(id);
      if (!composite) {
        console.warn(`Strategy ${id} not found in active strategies`);
        continue;
      }
      
      try {
        const result = await composite.analyze(candles);
        
        // Get minimum confidence threshold from config or use default
        const minConfidence = parseFloat(
          process.env.MIN_CONFIDENCE_THRESHOLD || '70'
        );
        
        if (result.signal !== 'NEUTRAL' && result.confidence >= minConfidence) {
          await this.handleSignal(id, strategyConfig, result, candles);
          this.lastProcessedTime.set(id, now);
        } else {
          console.log(
            `📊 ${pair} - ${result.signal} (confidence: ${result.confidence.toFixed(
              1
            )}%) - Below threshold`
          );
        }
      } catch (error) {
        console.error(`Error processing strategy ${id}:`, error);
      }
    }
  }
  
  private async handleSignal(
    strategyId: string,
    strategyConfig: StrategyConfigData,
    result: StrategyResult,
    candles: CandleData[]
  ): Promise<void> {
    const currentPrice = candles[candles.length - 1].close;
    
    console.log(
      `🎯 SIGNAL: ${result.signal} for ${strategyConfig.tokenPair} at $${currentPrice} (confidence: ${result.confidence.toFixed(1)}%)`
    );
    console.log(`   Reason: ${result.reason}`);
    
    // Save signal to database
    try {
      const signal = await db.tradeSignal.create({
        data: {
          strategyId,
          signal: result.signal,
          price: currentPrice,
          confidence: result.confidence,
          indicators: result.indicators,
          reason: result.reason,
          executed: false,
        },
      });
      
      // Emit event for execution service
      this.emit('signal', {
        signalId: signal.id,
        strategyId,
        strategyConfig,
        signal: result.signal,
        price: currentPrice,
        confidence: result.confidence,
        indicators: result.indicators,
        reason: result.reason,
      });
    } catch (error) {
      console.error('Error saving signal:', error);
    }
  }
  
  async reloadStrategy(strategyId: string): Promise<void> {
    try {
      const config = await db.strategyConfig.findUnique({
        where: { id: strategyId },
      });
      
      if (!config) {
        this.activeStrategies.delete(strategyId);
        console.log(`🗑️  Removed strategy ${strategyId}`);
        return;
      }
      
      if (config.status === 'ACTIVE') {
        const composite = this.buildCompositeFromConfig(config);
        this.activeStrategies.set(strategyId, composite);
        console.log(`🔄 Reloaded strategy ${strategyId}`);
      } else {
        this.activeStrategies.delete(strategyId);
        console.log(`⏸️  Paused strategy ${strategyId}`);
      }
    } catch (error) {
      console.error(`Error reloading strategy ${strategyId}:`, error);
    }
  }
  
  async pauseStrategy(strategyId: string): Promise<void> {
    this.activeStrategies.delete(strategyId);
    await db.strategyConfig.update({
      where: { id: strategyId },
      data: { status: 'PAUSED' },
    });
    console.log(`⏸️  Paused strategy ${strategyId}`);
  }
  
  async resumeStrategy(strategyId: string): Promise<void> {
    await db.strategyConfig.update({
      where: { id: strategyId },
      data: { status: 'ACTIVE' },
    });
    await this.reloadStrategy(strategyId);
    console.log(`▶️  Resumed strategy ${strategyId}`);
  }
  
  getActiveStrategyCount(): number {
    return this.activeStrategies.size;
  }
  
  getStrategyPairs(): string[] {
    const pairs = new Set<string>();
    this.activeStrategies.forEach((_, strategyId) => {
      // Would need to look up the pair from the config
      // This is a simplified version
    });
    return Array.from(pairs);
  }
}
