import * as anchor from "@coral-xyz/anchor";
import { Program, BN } from "@coral-xyz/anchor";
import { PublicKey, Keypair, SystemProgram } from "@solana/web3.js";
import { 
  TOKEN_PROGRAM_ID,
  createMint,
  createAccount,
  mintTo,
  getAccount,
} from "@solana/spl-token";
import { assert } from "chai";
import { TradingBotSmartContract } from "../target/types/trading_bot_smart_contract";

describe("trading-bot", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.tradingBotSmartContract as Program<TradingBotSmartContract>;
  
  // Test accounts
  let owner: Keypair;
  let botConfigPDA: PublicKey;
  let botConfigBump: number;
  
  // SPL Token accounts for testing
  let tokenMintA: PublicKey;
  let tokenMintB: PublicKey;
  let userTokenAccountA: PublicKey;
  let userTokenAccountB: PublicKey;

  before(async () => {
    // Setup owner
    owner = Keypair.generate();
    
    // Airdrop SOL to owner
    const airdropSig = await provider.connection.requestAirdrop(
      owner.publicKey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropSig);

    // Derive bot config PDA
    [botConfigPDA, botConfigBump] = PublicKey.findProgramAddressSync(
      [Buffer.from("bot_config"), owner.publicKey.toBuffer()],
      program.programId
    );

    // Create token mints for testing
    tokenMintA = await createMint(
      provider.connection,
      owner,
      owner.publicKey,
      null,
      9 // 9 decimals
    );

    tokenMintB = await createMint(
      provider.connection,
      owner,
      owner.publicKey,
      null,
      9
    );

    // Create token accounts for owner
    userTokenAccountA = await createAccount(
      provider.connection,
      owner,
      tokenMintA,
      owner.publicKey
    );

    userTokenAccountB = await createAccount(
      provider.connection,
      owner,
      tokenMintB,
      owner.publicKey
    );

    // Mint tokens to owner's account
    await mintTo(
      provider.connection,
      owner,
      tokenMintA,
      userTokenAccountA,
      owner,
      1_000_000_000_000 // 1000 tokens with 9 decimals
    );

    console.log("Setup complete:");
    console.log("  Owner:", owner.publicKey.toString());
    console.log("  Bot Config PDA:", botConfigPDA.toString());
    console.log("  Token Mint A:", tokenMintA.toString());
    console.log("  Token Mint B:", tokenMintB.toString());
  });

  describe("initialize_bot", () => {
    it("Inicializa o bot com configurações corretas", async () => {
      const maxTradeAmount = new BN(100_000_000_000); // 100 tokens
      const maxSlippageBps = 500; // 5%

      const tx = await program.methods
        .initializeBot(maxTradeAmount, maxSlippageBps)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([owner])
        .rpc();

      console.log("Initialize bot transaction signature:", tx);

      // Fetch and verify the bot config account
      const botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      
      assert.ok(botConfig.owner.equals(owner.publicKey));
      assert.ok(botConfig.maxTradeAmount.eq(maxTradeAmount));
      assert.equal(botConfig.maxSlippageBps, maxSlippageBps);
      assert.equal(botConfig.isActive, true);
      assert.ok(botConfig.tradesExecuted.eq(new BN(0)));
      assert.equal(botConfig.bump, botConfigBump);

      console.log("Bot config criado com sucesso:", {
        owner: botConfig.owner.toString(),
        maxTradeAmount: botConfig.maxTradeAmount.toString(),
        maxSlippageBps: botConfig.maxSlippageBps,
        isActive: botConfig.isActive,
        tradesExecuted: botConfig.tradesExecuted.toString(),
      });
    });

    it("Falha ao tentar inicializar novamente para o mesmo owner", async () => {
      const maxTradeAmount = new BN(50_000_000_000);
      const maxSlippageBps = 300;

      try {
        await program.methods
          .initializeBot(maxTradeAmount, maxSlippageBps)
          .accounts({
            botConfig: botConfigPDA,
            owner: owner.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([owner])
          .rpc();
        
        assert.fail("Deveria ter falhado ao tentar inicializar novamente");
      } catch (error) {
        // Esperamos que falhe porque a conta já existe
        assert.ok(error.toString().includes("already in use"));
      }
    });
  });

  describe("update_config", () => {
    it("Atualiza max_trade_amount", async () => {
      const newMaxTradeAmount = new BN(200_000_000_000); // 200 tokens

      await program.methods
        .updateConfig(newMaxTradeAmount, null, null)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();

      const botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.ok(botConfig.maxTradeAmount.eq(newMaxTradeAmount));
      console.log("Max trade amount atualizado para:", botConfig.maxTradeAmount.toString());
    });

    it("Atualiza max_slippage_bps", async () => {
      const newSlippage = 1000; // 10%

      await program.methods
        .updateConfig(null, newSlippage, null)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();

      const botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.equal(botConfig.maxSlippageBps, newSlippage);
      console.log("Max slippage atualizado para:", botConfig.maxSlippageBps);
    });

    it("Atualiza is_active", async () => {
      await program.methods
        .updateConfig(null, null, false)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();

      let botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.equal(botConfig.isActive, false);
      console.log("Bot desativado");

      // Reativa o bot para os próximos testes
      await program.methods
        .updateConfig(null, null, true)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();

      botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.equal(botConfig.isActive, true);
      console.log("Bot reativado");
    });

    it("Falha ao tentar atualizar com slippage inválido", async () => {
      const invalidSlippage = 20000; // 200% (> 10000 bps)

      try {
        await program.methods
          .updateConfig(null, invalidSlippage, null)
          .accounts({
            botConfig: botConfigPDA,
            owner: owner.publicKey,
          })
          .signers([owner])
          .rpc();
        
        assert.fail("Deveria ter falhado com slippage inválido");
      } catch (error) {
        assert.ok(error.toString().includes("InvalidSlippage"));
      }
    });
  });

  describe("execute_swap", () => {
    it("Executa um swap com parâmetros válidos", async () => {
      const amountIn = new BN(10_000_000_000); // 10 tokens
      const minimumAmountOut = new BN(9_500_000_000); // 9.5 tokens (5% slippage)

      // Verifica saldo inicial
      const accountInfoBefore = await getAccount(provider.connection, userTokenAccountA);
      console.log("Saldo inicial token A:", accountInfoBefore.amount.toString());

      const tx = await program.methods
        .executeSwap(amountIn, minimumAmountOut)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
          userTokenIn: userTokenAccountA,
          userTokenOut: userTokenAccountB,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .signers([owner])
        .rpc();

      console.log("Execute swap transaction signature:", tx);

      // Verifica que o contador de trades foi incrementado
      const botConfig = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.ok(botConfig.tradesExecuted.eq(new BN(1)));
      console.log("Trades executados:", botConfig.tradesExecuted.toString());
    });

    it("Falha quando o bot está inativo", async () => {
      // Desativa o bot
      await program.methods
        .updateConfig(null, null, false)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();

      const amountIn = new BN(10_000_000_000);
      const minimumAmountOut = new BN(9_500_000_000);

      try {
        await program.methods
          .executeSwap(amountIn, minimumAmountOut)
          .accounts({
            botConfig: botConfigPDA,
            owner: owner.publicKey,
            userTokenIn: userTokenAccountA,
            userTokenOut: userTokenAccountB,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([owner])
          .rpc();
        
        assert.fail("Deveria ter falhado com bot inativo");
      } catch (error) {
        assert.ok(error.toString().includes("BotNotActive"));
      }

      // Reativa o bot
      await program.methods
        .updateConfig(null, null, true)
        .accounts({
          botConfig: botConfigPDA,
          owner: owner.publicKey,
        })
        .signers([owner])
        .rpc();
    });

    it("Falha quando a quantidade excede o limite", async () => {
      const amountIn = new BN(300_000_000_000); // 300 tokens (excede limite de 200)
      const minimumAmountOut = new BN(285_000_000_000);

      try {
        await program.methods
          .executeSwap(amountIn, minimumAmountOut)
          .accounts({
            botConfig: botConfigPDA,
            owner: owner.publicKey,
            userTokenIn: userTokenAccountA,
            userTokenOut: userTokenAccountB,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([owner])
          .rpc();
        
        assert.fail("Deveria ter falhado ao exceder o limite");
      } catch (error) {
        assert.ok(error.toString().includes("AmountExceedsLimit"));
      }
    });

    it("Executa múltiplos swaps e incrementa o contador", async () => {
      const amountIn = new BN(5_000_000_000); // 5 tokens
      const minimumAmountOut = new BN(4_750_000_000);

      let botConfigBefore = await program.account.tradeBotConfig.fetch(botConfigPDA);
      const tradesBefore = botConfigBefore.tradesExecuted;

      // Executa 3 swaps
      for (let i = 0; i < 3; i++) {
        await program.methods
          .executeSwap(amountIn, minimumAmountOut)
          .accounts({
            botConfig: botConfigPDA,
            owner: owner.publicKey,
            userTokenIn: userTokenAccountA,
            userTokenOut: userTokenAccountB,
            tokenProgram: TOKEN_PROGRAM_ID,
          })
          .signers([owner])
          .rpc();
      }

      const botConfigAfter = await program.account.tradeBotConfig.fetch(botConfigPDA);
      assert.ok(botConfigAfter.tradesExecuted.eq(tradesBefore.add(new BN(3))));
      console.log("Total de trades após múltiplos swaps:", botConfigAfter.tradesExecuted.toString());
    });
  });
});
