import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  VersionedTransaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedMessage,
  AddressLookupTableAccount,
} from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { Raydium, TxVersion, parseTokenAccountResp } from '@raydium-io/raydium-sdk-v2';
import { db } from '../config/database';
import { EventEmitter } from 'events';

interface TradeSignalData {
  signalId: string;
  strategyId: string;
  strategyConfig: any;
  signal: 'BUY' | 'SELL';
  price: number;
  confidence: number;
  indicators: any;
  reason: string;
}

interface RaydiumQuote {
  inputAmount: string;
  minOutputAmount: string;
  outputAmount: string;
  priceImpact: number;
  route: any;
}

export class ExecutionService extends EventEmitter {
  private connection: Connection;
  private backendKeypair: Keypair;
  private program: Program;
  private raydium!: Raydium;
  
  constructor() {
    super();
    
    // Initialize Solana connection
    this.connection = new Connection(
      process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
      'confirmed'
    );
    
    // Load backend wallet
    const privateKeyArray = JSON.parse(process.env.BACKEND_WALLET_PRIVATE_KEY || '[]');
    this.backendKeypair = Keypair.fromSecretKey(Uint8Array.from(privateKeyArray));
    
    // Initialize Anchor program
    const provider = new AnchorProvider(
      this.connection,
      new Wallet(this.backendKeypair),
      { commitment: 'confirmed' }
    );
    
    const programId = new PublicKey(process.env.PROGRAM_ID!);
    
    // Load IDL from the deployed program
    // You'll need to import the IDL type
    const idl = require('../../../app/idl/trading_bot_smart_contract.json');
    this.program = new Program(
      idl,
      provider
    );
  }
  
  async initialize(): Promise<void> {
    console.log('⚡ Initializing Execution Service...');
    console.log(`   Backend wallet: ${this.backendKeypair.publicKey.toBase58()}`);
    
    // Initialize Raydium SDK
    this.raydium = await Raydium.load({
      connection: this.connection,
      owner: this.backendKeypair,
      cluster: 'devnet',
      disableFeatureCheck: true,
      disableLoadToken: false,
    });
    
    console.log('✅ Execution Service initialized');
  }
  
  async executeAtomicTrade(signalData: TradeSignalData): Promise<string> {
    const { signalId, strategyConfig, signal, price } = signalData;
    
    console.log(`\n🔄 Executing atomic trade for signal ${signalId}`);
    console.log(`   Type: ${signal}`);
    console.log(`   Price: $${price}`);
    console.log(`   Pair: ${strategyConfig.tokenPair}`);
    
    try {
      // 1. Calculate trade amount based on strategy config
      const amountIn = this.calculateTradeAmount(strategyConfig, signal);
      
      // 2. Get Raydium quote
      const quote = await this.getRaydiumQuote(
        strategyConfig.tokenPair,
        signal,
        amountIn
      );
      
      console.log(`   Amount in: ${amountIn}`);
      console.log(`   Expected out: ${quote.outputAmount}`);
      console.log(`   Price impact: ${quote.priceImpact}%`);
      
      // 3. Build Raydium swap transaction
      const raydiumInstructions = await this.getRaydiumSwapInstructions(
        quote,
        strategyConfig.tokenPair
      );
      
      // 4. Create authorize_swap instruction
      const authorizeIx = await this.createAuthorizeInstruction(
        strategyConfig,
        parseFloat(amountIn),
        parseFloat(quote.minOutputAmount)
      );
      
      // 5. Build atomic transaction
      const signature = await this.sendAtomicTransaction(
        [authorizeIx, ...raydiumInstructions],
        strategyConfig.walletAddress
      );
      
      console.log(`✅ Trade executed: ${signature}`);
      
      // 6. Update signal in database
      await db.tradeSignal.update({
        where: { id: signalId },
        data: {
          executed: true,
          txSignature: signature,
          executedAt: new Date(),
          amountIn: parseFloat(amountIn),
          amountOut: parseFloat(quote.outputAmount),
          slippage: quote.priceImpact,
        },
      });
      
      // 7. Record trade
      await db.trade.create({
        data: {
          walletAddress: strategyConfig.walletAddress,
          tokenPair: strategyConfig.tokenPair,
          type: signal,
          amountIn: parseFloat(amountIn),
          amountOut: parseFloat(quote.outputAmount),
          price,
          slippage: quote.priceImpact,
          txSignature: signature,
          status: 'PENDING',
          strategyId: strategyConfig.id,
          signalId,
        },
      });
      
      this.emit('trade-executed', {
        signalId,
        signature,
        amountIn,
        amountOut: quote.outputAmount,
      });
      
      return signature;
    } catch (error) {
      console.error('❌ Error executing trade:', error);
      
      // Mark signal as failed
      await db.tradeSignal.update({
        where: { id: signalId },
        data: { executed: false },
      });
      
      this.emit('trade-failed', { signalId, error });
      throw error;
    }
  }
  
  private calculateTradeAmount(strategyConfig: any, signal: 'BUY' | 'SELL'): string {
    // Get amount from strategy config or use default
    const config = strategyConfig.config;
    const riskManagement = config.riskManagement || {};
    
    const maxTradeSize = riskManagement.maxTradeSize || 0.1; // Default 0.1 SOL
    
    // You can implement more sophisticated position sizing here
    // Based on confidence, available balance, etc.
    
    return maxTradeSize.toString();
  }
  
  private async getRaydiumQuote(
    tokenPair: string,
    signal: 'BUY' | 'SELL',
    amountIn: string
  ): Promise<RaydiumQuote> {
    // Parse token pair (e.g., "SOL/USDC")
    const [baseToken, quoteToken] = tokenPair.split('/');
    
    // Get pool information
    const poolId = process.env.POOL_ID || process.env[`${tokenPair.replace('/', '_')}_POOL_ID`];
    
    if (!poolId) {
      throw new Error(`Pool ID not found for ${tokenPair}`);
    }
    
    const poolInfo = await this.raydium.api.fetchPoolById({ ids: poolId });
    
    if (!poolInfo || poolInfo.length === 0) {
      throw new Error(`Pool not found: ${poolId}`);
    }
    
    // Simplified quote - in production, you'd use the actual Raydium API
    // The exact API depends on pool type (CPMM, AMM, CLMM)
    const amount = parseFloat(amountIn);
    const estimatedOutput = amount * 0.99; // Simplified calculation
    const minOutput = estimatedOutput * 0.98; // 2% slippage tolerance
    
    // Return quote info
    return {
      inputAmount: amountIn,
      minOutputAmount: minOutput.toString(),
      outputAmount: estimatedOutput.toString(),
      priceImpact: 1.0, // 1% impact estimate
      route: poolInfo[0],
    };
  }
  
  private async getRaydiumSwapInstructions(
    quote: RaydiumQuote,
    tokenPair: string
  ): Promise<TransactionInstruction[]> {
    // NOTE: This is a simplified placeholder implementation
    // In production, you would use the existing run_bot_hybrid.ts approach
    // which properly integrates with Raydium SDK V2 for CPMM pools
    
    // For now, return empty array as swap logic should be handled
    // by the existing hybrid bot implementation
    console.warn('⚠️  Raydium swap instructions not implemented in backend');
    console.warn('   Use the existing app/scripts/run_bot_hybrid.ts for actual swaps');
    
    // Return empty instructions - the authorize instruction will still run
    return [];
  }
  
  private async createAuthorizeInstruction(
    strategyConfig: any,
    amountIn: number,
    minAmountOut: number
  ): Promise<TransactionInstruction> {
    const ownerPubkey = new PublicKey(strategyConfig.walletAddress);
    
    // Derive bot_config PDA
    const [botConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from('bot_config'), ownerPubkey.toBuffer()],
      this.program.programId
    );
    
    const authorizeIx = await this.program.methods
      .authorizeSwap(
        new anchor.BN(amountIn * 1e9), // Convert to lamports
        new anchor.BN(minAmountOut)
      )
      .accounts({
        botConfig: botConfigPda,
        owner: ownerPubkey,
        backendSigner: this.backendKeypair.publicKey,
      })
      .instruction();
    
    return authorizeIx;
  }
  
  private async sendAtomicTransaction(
    instructions: TransactionInstruction[],
    ownerAddress: string
  ): Promise<string> {
    // Build transaction with all instructions
    const transaction = new Transaction();
    
    for (const ix of instructions) {
      transaction.add(ix);
    }
    
    // Get recent blockhash
    const { blockhash, lastValidBlockHeight } =
      await this.connection.getLatestBlockhash('confirmed');
    
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = this.backendKeypair.publicKey;
    
    // Sign with backend keypair
    transaction.sign(this.backendKeypair);
    
    // Note: In production, you'd also need the user's signature
    // This would require a multi-sig setup or delegated authority
    
    // Send transaction
    const signature = await this.connection.sendRawTransaction(
      transaction.serialize(),
      {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      }
    );
    
    // Confirm transaction
    await this.connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      'confirmed'
    );
    
    return signature;
  }
  
  async checkTransactionStatus(signature: string): Promise<string> {
    const status = await this.connection.getSignatureStatus(signature);
    
    if (status.value?.confirmationStatus === 'confirmed' || 
        status.value?.confirmationStatus === 'finalized') {
      return 'CONFIRMED';
    } else if (status.value?.err) {
      return 'FAILED';
    }
    
    return 'PENDING';
  }
}
