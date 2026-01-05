import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";
import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { PROGRAM_ID } from "./constants";

// IDL será gerado pelo Anchor build
// Por enquanto, exportamos o tipo para uso posterior
export type TradingBot = Idl;  

/**
 * Cria um provider Anchor para interagir com o programa
 */
export function getProvider(connection: Connection, wallet: AnchorWallet) {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  return provider;
}

/**
 * Obtém o endereço PDA da configuração do bot para um usuário
 */
export function getBotConfigPDA(owner: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), owner.toBuffer()],
    programId
  );
}

/**
 * Cria uma instância do programa Anchor
 * Nota: Requer o IDL gerado pelo build do Anchor
 */
export async function getProgram(
  connection: Connection,
  wallet: AnchorWallet,
  idl: Idl
): Promise<Program<TradingBot>> {
  const provider = getProvider(connection, wallet);
  const program = new Program(idl, provider);
  return program as Program<TradingBot>;
}

