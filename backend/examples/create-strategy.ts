/**
 * Example script to create a trading strategy via API
 * 
 * This demonstrates how to programmatically create strategies
 * that combine multiple indicators.
 */

import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:3001/api';

async function createRsiOnlyStrategy() {
  console.log('\n📊 Creating RSI-only strategy...\n');
  
  const strategy = {
    userId: 'demo-user',
    walletAddress: process.env.WALLET_ADDRESS || 'YOUR_WALLET_ADDRESS',
    tokenPair: 'SOL/USDC',
    strategyType: 'rsi_only',
    config: {
      mode: 'unanimous',
      strategies: [
        {
          type: 'rsi',
          weight: 1,
          params: {
            period: 14,
            oversold: 30,
            overbought: 70,
          },
        },
      ],
      riskManagement: {
        maxTradeSize: 0.01, // 0.01 SOL per trade
        stopLoss: 0.05,     // 5% stop loss
        takeProfit: 0.10,   // 10% take profit
      },
    },
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}/strategies`, strategy);
    console.log('✅ Strategy created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating strategy:', error.response?.data || error.message);
  }
}

async function createCompositeStrategy() {
  console.log('\n📊 Creating Composite strategy (RSI + MACD + Bollinger)...\n');
  
  const strategy = {
    userId: 'demo-user',
    walletAddress: process.env.WALLET_ADDRESS || 'YOUR_WALLET_ADDRESS',
    tokenPair: 'SOL/USDC',
    strategyType: 'composite',
    config: {
      mode: 'weighted', // unanimous, majority, or weighted
      strategies: [
        {
          type: 'rsi',
          weight: 1,
          params: {
            period: 14,
            oversold: 30,
            overbought: 70,
          },
        },
        {
          type: 'macd',
          weight: 2, // Higher weight = more important
          params: {
            fastPeriod: 12,
            slowPeriod: 26,
            signalPeriod: 9,
          },
        },
        {
          type: 'bollinger',
          weight: 1,
          params: {
            period: 20,
            stdDev: 2,
          },
        },
      ],
      riskManagement: {
        maxTradeSize: 0.05,
        stopLoss: 0.03,
        takeProfit: 0.08,
      },
    },
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}/strategies`, strategy);
    console.log('✅ Strategy created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating strategy:', error.response?.data || error.message);
  }
}

async function createAggressiveStrategy() {
  console.log('\n📊 Creating Aggressive strategy (Majority mode)...\n');
  
  const strategy = {
    userId: 'demo-user',
    walletAddress: process.env.WALLET_ADDRESS || 'YOUR_WALLET_ADDRESS',
    tokenPair: 'SOL/USDC',
    strategyType: 'aggressive',
    config: {
      mode: 'majority', // Trade if majority of indicators agree
      strategies: [
        {
          type: 'rsi',
          weight: 1,
          params: {
            period: 7, // Shorter period = more sensitive
            oversold: 35,
            overbought: 65,
          },
        },
        {
          type: 'macd',
          weight: 1,
          params: {
            fastPeriod: 8,
            slowPeriod: 17,
            signalPeriod: 9,
          },
        },
        {
          type: 'bollinger',
          weight: 1,
          params: {
            period: 15,
            stdDev: 1.5,
          },
        },
      ],
      riskManagement: {
        maxTradeSize: 0.1,
        stopLoss: 0.07,
        takeProfit: 0.15,
      },
    },
  };
  
  try {
    const response = await axios.post(`${API_BASE_URL}/strategies`, strategy);
    console.log('✅ Strategy created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating strategy:', error.response?.data || error.message);
  }
}

async function main() {
  console.log('═══════════════════════════════════════');
  console.log('  Strategy Creation Examples');
  console.log('═══════════════════════════════════════');
  
  // Uncomment the strategies you want to create:
  
  // 1. Conservative: RSI only
  await createRsiOnlyStrategy();
  
  // 2. Balanced: Multiple indicators with weighted voting
  // await createCompositeStrategy();
  
  // 3. Aggressive: Majority voting with sensitive parameters
  // await createAggressiveStrategy();
  
  console.log('\n✅ Done!\n');
}

main().catch(console.error);
