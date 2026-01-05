import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

/**
 * Configuração do bot de trading
 */
export interface BotConfig {
  owner: PublicKey;
  maxTradeAmount: BN;
  maxSlippageBps: number;
  isActive: boolean;
  tradesExecuted: BN;
  bump: number;
}

/**
 * Parâmetros para executar um trade
 */
export interface TradeParams {
  tokenIn: PublicKey;
  tokenOut: PublicKey;
  amountIn: BN;
  minimumAmountOut: BN;
}

/**
 * Informações de um token
 */
export interface TokenInfo {
  mint: PublicKey;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
}

/**
 * Histórico de transação
 */
export interface TransactionHistory {
  signature: string;
  timestamp: number;
  type: "initialize" | "swap" | "update_config";
  status: "success" | "error";
  details?: unknown;
}

