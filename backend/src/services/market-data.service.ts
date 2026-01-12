import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { CandleData } from '../strategies/base.strategy';

export interface MarketDataConfig {
  wsUrl: string;
  pairs: string[];
  candleSize: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  reconnectInterval?: number;
}

export interface PriceUpdate {
  pair: string;
  price: number;
  timestamp: number;
  volume?: number;
}

export class MarketDataService extends EventEmitter {
  private ws: WebSocket | null = null;
  private candles: Map<string, CandleData[]> = new Map();
  private currentCandle: Map<string, Partial<CandleData>> = new Map();
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnected = false;
  
  constructor(private config: MarketDataConfig) {
    super();
  }
  
  start(): void {
    console.log(`🚀 Starting market data service for pairs: ${this.config.pairs.join(', ')}`);
    this.connect();
  }
  
  stop(): void {
    console.log('🛑 Stopping market data service');
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.ws) {
      this.ws.close();
    }
    this.isConnected = false;
  }
  
  private connect(): void {
    try {
      this.ws = new WebSocket(this.config.wsUrl);
      
      this.ws.on('open', () => {
        console.log('✅ WebSocket connected');
        this.isConnected = true;
        this.emit('connected');
        this.subscribe();
      });
      
      this.ws.on('message', (data: WebSocket.Data) => {
        try {
          const message = this.parseMessage(data);
          if (message) {
            this.handlePriceUpdate(message);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      });
      
      this.ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        this.emit('error', error);
      });
      
      this.ws.on('close', () => {
        console.log('🔌 WebSocket disconnected');
        this.isConnected = false;
        this.emit('disconnected');
        this.reconnect();
      });
    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.reconnect();
    }
  }
  
  private reconnect(): void {
    const interval = this.config.reconnectInterval || 5000;
    console.log(`🔄 Reconnecting in ${interval}ms...`);
    
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, interval);
  }
  
  private subscribe(): void {
    if (!this.ws || !this.isConnected) return;
    
    // Subscribe to price updates for configured pairs
    // The exact format depends on the WebSocket provider (Birdeye, Helius, etc.)
    const subscribeMessage = {
      type: 'subscribe',
      pairs: this.config.pairs,
      interval: this.config.candleSize,
    };
    
    this.ws.send(JSON.stringify(subscribeMessage));
    console.log(`📡 Subscribed to: ${this.config.pairs.join(', ')}`);
  }
  
  private parseMessage(data: WebSocket.Data): PriceUpdate | null {
    try {
      const text = data.toString();
      const parsed = JSON.parse(text);
      
      // Adapt this based on your WebSocket provider's message format
      // This is a generic example
      if (parsed.type === 'price' || parsed.event === 'priceUpdate') {
        return {
          pair: parsed.pair || parsed.symbol,
          price: parsed.price || parsed.close,
          timestamp: parsed.timestamp || Date.now(),
          volume: parsed.volume,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing message:', error);
      return null;
    }
  }
  
  private handlePriceUpdate(update: PriceUpdate): void {
    this.updateCandles(update);
    this.emit('price', update);
    
    // Emit candle update if a new candle is complete
    const candles = this.candles.get(update.pair);
    if (candles && candles.length > 0) {
      this.emit('candle', {
        pair: update.pair,
        candles: candles.slice(-100), // Last 100 candles
      });
    }
  }
  
  private updateCandles(update: PriceUpdate): void {
    const { pair, price, timestamp, volume } = update;
    
    if (!this.candles.has(pair)) {
      this.candles.set(pair, []);
    }
    
    const candles = this.candles.get(pair)!;
    const candleTimestamp = this.getCandleTimestamp(timestamp);
    
    let currentCandle = this.currentCandle.get(pair);
    
    // Check if we need to start a new candle
    if (!currentCandle || currentCandle.timestamp !== candleTimestamp) {
      // Close the current candle if it exists
      if (currentCandle && this.isCompleteCandleData(currentCandle)) {
        candles.push(currentCandle as CandleData);
        
        // Keep only the last 1000 candles in memory
        if (candles.length > 1000) {
          candles.shift();
        }
      }
      
      // Start a new candle
      currentCandle = {
        timestamp: candleTimestamp,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: volume || 0,
      };
      this.currentCandle.set(pair, currentCandle);
    } else {
      // Update the current candle
      currentCandle.high = Math.max(currentCandle.high || price, price);
      currentCandle.low = Math.min(currentCandle.low || price, price);
      currentCandle.close = price;
      currentCandle.volume = (currentCandle.volume || 0) + (volume || 0);
    }
  }
  
  private getCandleTimestamp(timestamp: number): number {
    const intervals: Record<string, number> = {
      '1m': 60 * 1000,
      '5m': 5 * 60 * 1000,
      '15m': 15 * 60 * 1000,
      '1h': 60 * 60 * 1000,
      '4h': 4 * 60 * 60 * 1000,
      '1d': 24 * 60 * 60 * 1000,
    };
    
    const interval = intervals[this.config.candleSize];
    return Math.floor(timestamp / interval) * interval;
  }
  
  private isCompleteCandleData(candle: Partial<CandleData>): candle is CandleData {
    return (
      candle.timestamp !== undefined &&
      candle.open !== undefined &&
      candle.high !== undefined &&
      candle.low !== undefined &&
      candle.close !== undefined &&
      candle.volume !== undefined
    );
  }
  
  getCandles(pair: string, count: number = 100): CandleData[] {
    const candles = this.candles.get(pair) || [];
    return candles.slice(-count);
  }
  
  getCurrentPrice(pair: string): number | null {
    const currentCandle = this.currentCandle.get(pair);
    return currentCandle?.close || null;
  }
  
  isConnectedToMarket(): boolean {
    return this.isConnected;
  }
  
  // Method to manually add historical candles (useful for backtesting)
  addHistoricalCandles(pair: string, candles: CandleData[]): void {
    if (!this.candles.has(pair)) {
      this.candles.set(pair, []);
    }
    
    const existingCandles = this.candles.get(pair)!;
    existingCandles.push(...candles);
    
    // Sort by timestamp
    existingCandles.sort((a, b) => a.timestamp - b.timestamp);
    
    console.log(`📊 Added ${candles.length} historical candles for ${pair}`);
  }
}
