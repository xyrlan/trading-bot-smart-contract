import { Queue, Worker, Job } from 'bullmq';
import { redisConnection } from '../config/redis';
import { ExecutionService } from '../services/execution.service';

interface TradeJob {
  signalId: string;
  strategyId: string;
  strategyConfig: any;
  signal: 'BUY' | 'SELL';
  price: number;
  confidence: number;
  indicators: any;
  reason: string;
}

export class TradingQueue {
  private queue: Queue<TradeJob>;
  private worker: Worker<TradeJob>;
  private executionService: ExecutionService;
  
  constructor(executionService: ExecutionService) {
    this.executionService = executionService;
    
    // Create queue
    this.queue = new Queue<TradeJob>('trading-signals', {
      connection: redisConnection,
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
        removeOnComplete: {
          age: 86400, // Keep completed jobs for 24 hours
          count: 1000, // Keep last 1000 completed jobs
        },
        removeOnFail: {
          age: 86400 * 7, // Keep failed jobs for 7 days
        },
      },
    });
    
    // Create worker
    this.worker = new Worker<TradeJob>(
      'trading-signals',
      async (job: Job<TradeJob>) => {
        return await this.processTradeJob(job);
      },
      {
        connection: redisConnection,
        concurrency: 5, // Process up to 5 trades simultaneously
        limiter: {
          max: 10, // Max 10 jobs
          duration: 1000, // Per second
        },
      }
    );
    
    this.setupEventHandlers();
  }
  
  private setupEventHandlers(): void {
    this.worker.on('completed', (job: Job<TradeJob>, result: any) => {
      console.log(`✅ Trade job ${job.id} completed: ${result.signature}`);
    });
    
    this.worker.on('failed', (job: Job<TradeJob> | undefined, error: Error) => {
      console.error(`❌ Trade job ${job?.id} failed:`, error.message);
    });
    
    this.worker.on('error', (error: Error) => {
      console.error('Worker error:', error);
    });
    
    this.queue.on('error', (error: Error) => {
      console.error('Queue error:', error);
    });
  }
  
  private async processTradeJob(job: Job<TradeJob>): Promise<any> {
    const { data } = job;
    
    console.log(`\n📊 Processing trade job ${job.id}`);
    console.log(`   Signal: ${data.signal} for ${data.strategyConfig.tokenPair}`);
    console.log(`   Confidence: ${data.confidence.toFixed(1)}%`);
    
    try {
      // Execute the atomic trade
      const signature = await this.executionService.executeAtomicTrade(data);
      
      return { success: true, signature };
    } catch (error: any) {
      console.error(`Error processing trade job ${job.id}:`, error);
      
      // Throw error to trigger retry mechanism
      throw new Error(`Trade execution failed: ${error.message}`);
    }
  }
  
  async addTradeJob(jobData: TradeJob): Promise<Job<TradeJob>> {
    console.log(`➕ Adding trade job to queue: ${jobData.signal} ${jobData.strategyConfig.tokenPair}`);
    
    const job = await this.queue.add('execute-trade', jobData, {
      priority: this.calculatePriority(jobData.confidence),
      jobId: `trade-${jobData.signalId}`, // Prevent duplicate jobs
    });
    
    return job;
  }
  
  private calculatePriority(confidence: number): number {
    // Higher confidence = higher priority (lower number)
    // Priority range: 1 (highest) to 10 (lowest)
    if (confidence >= 90) return 1;
    if (confidence >= 80) return 2;
    if (confidence >= 70) return 3;
    if (confidence >= 60) return 5;
    return 10;
  }
  
  async getQueueStats() {
    const [waiting, active, completed, failed] = await Promise.all([
      this.queue.getWaitingCount(),
      this.queue.getActiveCount(),
      this.queue.getCompletedCount(),
      this.queue.getFailedCount(),
    ]);
    
    return {
      waiting,
      active,
      completed,
      failed,
    };
  }
  
  async pauseQueue(): Promise<void> {
    await this.queue.pause();
    console.log('⏸️  Trading queue paused');
  }
  
  async resumeQueue(): Promise<void> {
    await this.queue.resume();
    console.log('▶️  Trading queue resumed');
  }
  
  async clearQueue(): Promise<void> {
    await this.queue.drain();
    console.log('🗑️  Trading queue cleared');
  }
  
  async close(): Promise<void> {
    await this.worker.close();
    await this.queue.close();
    console.log('🔌 Trading queue closed');
  }
}
