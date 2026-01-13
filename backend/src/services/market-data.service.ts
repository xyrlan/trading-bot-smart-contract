import 'dotenv/config';
import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { CandleData } from '../strategies/base.strategy';

export interface MarketDataConfig {
  wsUrl: string;
  pairs: string[];
  candleSize: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  reconnectInterval?: number;
  apiKey?: string;
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
  private mockMode = false;
  private mockInterval: NodeJS.Timeout | null = null;
  private mockPrices: Map<string, number> = new Map();
  
  constructor(private config: MarketDataConfig) {
    super();
    // Detectar modo mock
    this.mockMode = config.wsUrl.startsWith('mock://');
    if (this.mockMode) {
      console.log('🎭 Mock mode enabled - generating synthetic market data');
    }
  }
  
  start(): void {
    console.log(`🚀 Starting market data service for pairs: ${this.config.pairs.join(', ')}`);
    if (this.mockMode) {
      this.startMockMode();
    } else {
      this.connect();
    }
  }
  
  stop(): void {
    console.log('🛑 Stopping market data service');
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
    }
    if (this.ws) {
      this.ws.close();
    }
    this.isConnected = false;
  }
  
  private startMockMode(): void {
    console.log('🎭 Starting mock market data generator...');
    
    // Inicializar preços base para cada par
    this.config.pairs.forEach(pair => {
      const basePrice = this.getBasePriceForPair(pair);
      this.mockPrices.set(pair, basePrice);
      console.log(`  ${pair}: Starting at $${basePrice}`);
    });
    
    this.isConnected = true;
    this.emit('connected');
    
    // Gerar atualizações de preço a cada 1 segundo
    this.mockInterval = setInterval(() => {
      this.generateMockPriceUpdates();
    }, 1000);
    
    console.log('✅ Mock market data generator started');
    console.log('📊 Generating price updates every 1 second');
  }
  
  private getBasePriceForPair(pair: string): number {
    // Preços base realistas para diferentes pares
    const basePrices: Record<string, number> = {
      'SOL/USDC': 100,
      'SOL-USDC': 100,
      'TEST/USDC': 1.5,
      'TEST-USDC': 1.5,
      'BTC/USDC': 45000,
      'ETH/USDC': 2500,
    };
    
    return basePrices[pair] || 100;
  }
  
  private generateMockPriceUpdates(): void {
    this.config.pairs.forEach(pair => {
      const currentPrice = this.mockPrices.get(pair) || 100;
      
      // Gerar variação de preço realista (-1% a +1%)
      const volatility = 0.01; // 1% de volatilidade
      const randomChange = (Math.random() - 0.5) * 2 * volatility;
      const newPrice = currentPrice * (1 + randomChange);
      
      this.mockPrices.set(pair, newPrice);
      
      // Gerar volume aleatório
      const baseVolume = 1000;
      const volume = baseVolume * (0.5 + Math.random());
      
      const priceUpdate: PriceUpdate = {
        pair,
        price: newPrice,
        timestamp: Date.now(),
        volume,
      };
      
      this.handlePriceUpdate(priceUpdate);
    });
  }
  
  private connect(): void {
    try {
      // Build WebSocket URL with API key as query parameter
      let wsUrl = this.config.wsUrl;
      
      if (this.config.apiKey) {
        const separator = wsUrl.includes('?') ? '&' : '?';
        wsUrl = `${wsUrl}${separator}x-api-key=${this.config.apiKey}`;
      }
      
      console.log(`🔗 Connecting to: ${wsUrl.replace(this.config.apiKey || '', '***')}`);
      
      this.ws = new WebSocket(wsUrl);
      
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
      
      this.ws.on('error', (error: any) => {
        console.error('❌ WebSocket error:', error.message);
        
        // Check for authentication errors
        if (error.message?.includes('403')) {
          console.error('⚠️  WebSocket connection rejected (403 Forbidden)');
          console.error('💡 This usually means:');
          console.error('   - Missing or invalid API key');
          console.error('   - API key needs to be set in BIRDEYE_API_KEY environment variable');
          console.error('   - The WebSocket endpoint requires authentication');
        }
        
        // Don't emit error to prevent crash - just log it
        // this.emit('error', error);
      });
      
      this.ws.on('close', (code: number, reason: Buffer) => {
        const reasonStr = reason.toString();
        console.log(`🔌 WebSocket disconnected (code: ${code}${reasonStr ? `, reason: ${reasonStr}` : ''})`);
        this.isConnected = false;
        this.emit('disconnected');
        
        // Only reconnect if it wasn't an auth error
        if (code !== 1008 && code !== 1002) {
          this.reconnect();
        } else {
          console.error('⛔ Not reconnecting due to authentication error. Please check your API key.');
        }
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
    
    // Subscribe to price updates for configured pairs using Birdeye format
    // Note: This is a placeholder. You need to provide actual token addresses
    // For now, we'll just log that we're ready to receive data
    
    // Birdeye subscription format example:
    // {
    //   "type": "SUBSCRIBE_PRICE",
    //   "data": {
    //     "chartType": "1m",
    //     "currency": "pair",
    //     "address": "So11111111111111111111111111111111111111112"
    //   }
    // }
    
    // For multiple pairs, send multiple subscription messages
    for (const pair of this.config.pairs) {
      // You need to map pair names to token addresses
      // This is a placeholder - actual implementation needs token address mapping
      const subscribeMessage = {
        type: 'SUBSCRIBE_PRICE',
        data: {
          chartType: this.config.candleSize,
          currency: 'pair',
          address: this.getTokenAddressForPair(pair),
        },
      };
      
      this.ws.send(JSON.stringify(subscribeMessage));
      console.log(`📡 Subscribed to ${pair} (${this.config.candleSize})`);
    }
  }
  
  private getTokenAddressForPair(pair: string): string {
    // Map common pairs to their Solana token addresses
    const tokenMap: Record<string, string> = {
      'SOL/USDC': 'So11111111111111111111111111111111111111112', // SOL token address
      'SOL-USDC': 'So11111111111111111111111111111111111111112',
      'SOL': 'So11111111111111111111111111111111111111112',
      // Add more pairs as needed
    };
    
    return tokenMap[pair] || tokenMap['SOL'];
  }
  
  private parseMessage(data: WebSocket.Data): PriceUpdate | null {
    try {
      const text = data.toString();
      const parsed = JSON.parse(text);
      
      // Log first message to understand format
      if (!this.isConnected) {
        console.log('📥 Sample message:', JSON.stringify(parsed, null, 2));
      }
      
      // Birdeye WebSocket message format
      // Expected format: { type: 'PRICE_DATA', data: { ... } }
      if (parsed.type === 'PRICE_DATA' && parsed.data) {
        const data = parsed.data;
        return {
          pair: this.getPairFromAddress(data.address) || 'SOL/USDC',
          price: data.value || data.price,
          timestamp: data.unixTime ? data.unixTime * 1000 : Date.now(),
          volume: data.volume || data.v,
        };
      }
      
      // Generic format fallback
      if (parsed.type === 'price' || parsed.event === 'priceUpdate') {
        return {
          pair: parsed.pair || parsed.symbol || 'SOL/USDC',
          price: parsed.price || parsed.close || parsed.value,
          timestamp: parsed.timestamp || parsed.unixTime || Date.now(),
          volume: parsed.volume || parsed.v,
        };
      }
      
      // Ping/Pong or other system messages
      if (parsed.type === 'ping') {
        this.ws?.send(JSON.stringify({ type: 'pong' }));
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing message:', error);
      return null;
    }
  }
  
  private getPairFromAddress(address: string): string | null {
    // Reverse map from token address to pair name
    const addressMap: Record<string, string> = {
      'So11111111111111111111111111111111111111112': 'SOL/USDC',
      // Add more addresses as needed
    };
    
    return addressMap[address] || null;
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
