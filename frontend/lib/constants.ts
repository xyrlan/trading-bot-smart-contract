import { PublicKey } from "@solana/web3.js";

// Configuração de rede
export const NETWORK = process.env.NEXT_PUBLIC_NETWORK || "localnet";
export const RPC_ENDPOINT = (() => {
  // Se RPC_URL personalizado estiver definido, usar ele (melhor performance)
  if (process.env.NEXT_PUBLIC_RPC_URL) {
    console.log('🚀 Using custom RPC endpoint');
    return process.env.NEXT_PUBLIC_RPC_URL;
  }

  // Caso contrário, usar endpoints padrão
  switch (NETWORK) {
    case "mainnet-beta":
      return "https://api.mainnet-beta.solana.com";
    case "devnet":
      console.log('⚠️  Using public devnet RPC (may be slow). Consider using a custom RPC endpoint.');
      return "https://api.devnet.solana.com";
    case "localnet":
    default:
      return "http://127.0.0.1:8899"; // Endereço do seu validador local
  }
})();
// Program IDs
export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID!
);

export const RAYDIUM_PROGRAM_ID = new PublicKey(
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"
);

// Token addresses conhecidos (devnet)
export const DEVNET_TOKENS = {
  USDC: NETWORK === "localnet" 
    ? new PublicKey("6yg6vou2kF7f2C7jC1TmVfkWTRUWTeCiP1xJ1Rw3zv4e") 
    : new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
  SOL: new PublicKey("So11111111111111111111111111111111111111112"), // Wrapped SOL
};

// Configurações padrão
export const DEFAULT_MAX_TRADE_AMOUNT = 1_000_000_000; // 1 SOL ou token (9 decimals)
export const DEFAULT_MAX_SLIPPAGE_BPS = 500; // 5%
export const MAX_SLIPPAGE_BPS_LIMIT = 10000; // 100%

