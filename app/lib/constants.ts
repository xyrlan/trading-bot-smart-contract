import { PublicKey } from "@solana/web3.js";

// Configuração de rede
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "localnet";
export const RPC_ENDPOINT = (() => {
  switch (NETWORK) {
    case "mainnet-beta":
      return "https://api.mainnet-beta.solana.com";
    case "devnet":
      return "https://api.devnet.solana.com";
    case "localnet":
    default:
      return "http://127.0.0.1:8899"; // Endereço do seu validador local
  }
})();
// Program IDs
export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || "AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ"
);

export const RAYDIUM_PROGRAM_ID = new PublicKey(
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
);

// Token addresses conhecidos (devnet)
export const DEVNET_TOKENS = {
  USDC: NETWORK === "localnet" 
    ? new PublicKey("WiuGG9t4JXVM4fncwhNRJArMQBqfxbrhmiuoid1w76D") 
    : new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
  SOL: new PublicKey("So11111111111111111111111111111111111111112"), // Wrapped SOL
};

// Configurações padrão
export const DEFAULT_MAX_TRADE_AMOUNT = 1_000_000_000; // 1 SOL ou token (9 decimals)
export const DEFAULT_MAX_SLIPPAGE_BPS = 500; // 5%
export const MAX_SLIPPAGE_BPS_LIMIT = 10000; // 100%

