import { 
    Connection, 
    PublicKey 
  } from "@solana/web3.js";
  import { 
    Liquidity, 
    MAINNET_PROGRAM_ID, 
    DEVNET_PROGRAM_ID,
  } from "@raydium-io/raydium-sdk";
  
  // Mude para 'mainnet' quando for pra valer
  const NETWORK: 'mainnet' | 'devnet' = 'devnet'; 
  
  // Endereços conhecidos (Token Mints)
  // NOTA: Na Devnet, o USDC Mint muda frequentemente.
  const DEVNET_USDC_MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; 
  const DEVNET_WSOL_MINT = "So11111111111111111111111111111111111111112";
  
  async function getPoolKeys() {
    const connection = new Connection(
      NETWORK === 'mainnet' 
        ? "https://api.mainnet-beta.solana.com" 
        : "https://api.devnet.solana.com"
    );
  
    const raydiumProgramId = NETWORK === 'mainnet' 
      ? MAINNET_PROGRAM_ID.AmmV4 
      : DEVNET_PROGRAM_ID.AmmV4;
  
    console.log("🔍 Buscando pools na Raydium...");
  
    // CORREÇÃO 1: Bypass na tipagem estrita que exige a chave '5'
    const fetchConfig = {
        4: raydiumProgramId
    };
  
    // CORREÇÃO 2: fetchAllPoolKeys agora retorna o array direto (sem { data: pools })
    // Usamos 'as any' no config para evitar erro de tipagem da versão V5
    const pools = await Liquidity.fetchAllPoolKeys(
      connection, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchConfig as any 
    );
  
    // CORREÇÃO 3: Tipagem explícita 'any' no parâmetro do find para evitar erro TS7006
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const targetPool = pools.find((pool: any) => 
      (pool.baseMint.toString() === DEVNET_WSOL_MINT && pool.quoteMint.toString() === DEVNET_USDC_MINT) ||
      (pool.baseMint.toString() === DEVNET_USDC_MINT && pool.quoteMint.toString() === DEVNET_WSOL_MINT)
    );
  
    if (!targetPool) {
      console.error("❌ Pool não encontrado na Devnet para este par.");
      return;
    }
  
    console.log("\n✅ Pool Encontrado!");
    console.log("AMM ID:", targetPool.id.toBase58());
    console.log("Base Mint:", targetPool.baseMint.toBase58());
    console.log("Quote Mint:", targetPool.quoteMint.toBase58());
    
    console.log("\n📋 COPIE O JSON ABAIXO (OPCIONAL - O BOT JÁ FAZ ISSO SOZINHO):");
    // console.log(JSON.stringify(targetPool, null, 2)); // Descomente se quiser ver o JSON gigante
    
    return targetPool;
  }
  
  getPoolKeys();