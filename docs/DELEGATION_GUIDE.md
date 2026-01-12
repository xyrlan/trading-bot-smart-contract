# Guia de Implementação: Delegation (Approve) para Trading Bot Automatizado

## 🎯 Objetivo

Permitir que o backend execute trades automaticamente **SEM** necessitar da assinatura do usuário a cada transação, mantendo os fundos na carteira do usuário (non-custodial).

## 🏗️ Arquitetura Implementada

### Antes (Manual)

```
Usuário (Frontend) → Assina Tx → Smart Contract → Move Tokens
```

### Agora (Automático)

```
Backend (Rust) → Assina Tx → Smart Contract (PDA assina) → Move Tokens do Usuário
```

## 🔐 Como Funciona a Segurança?

1. **Inicialização**: O usuário chama `initialize_bot` uma vez no frontend, salvando:

   - Sua própria public key (owner)
   - A public key do backend autorizado (`backend_authority`)
   - Configurações do bot (max_trade_amount, max_slippage, etc.)

2. **Autorização (Approve)**: O usuário executa uma transação SPL Token `approve`:

   - Autoriza a PDA (bot_config) a gastar até X tokens
   - Isso é feito UMA VEZ ou pode ser renovado periodicamente

3. **Execução Automática**: Quando o backend executa um trade:
   - Backend assina a transação (paga o gás)
   - Smart Contract valida: "A chave que está assinando é a `backend_authority` autorizada?"
   - PDA usa seeds para assinar a transferência dos tokens do usuário
   - Tokens movem da carteira do usuário → Pool → De volta ao usuário

## 📋 Checklist de Implementação

### ✅ Smart Contract (Concluído)

- [x] Adicionar campo `backend_authority` na struct `TradeBotConfig`
- [x] Atualizar `initialize_bot` para receber `backend_authority`
- [x] Refatorar `ExecuteSwap`:
  - `owner` mudou de `Signer` para `UncheckedAccount` (não precisa assinar)
  - `backend_signer` adicionado como `Signer` (paga gás)
  - Constraint validando `backend_authority == backend_signer.key()`
- [x] Implementar transferência com PDA signer usando seeds
- [x] Adicionar contas de token tipadas (`Account<'info, TokenAccount>`)
- [x] Adicionar `pool_token_account` para receber tokens

### 🔜 Frontend (A Fazer)

#### 1. Atualizar a Inicialização

Adicionar parâmetro `backend_authority` ao chamar `initialize_bot`:

```typescript
// Gere ou carregue a chave pública do backend
const backendAuthority = new PublicKey("SUA_BACKEND_PUBLIC_KEY_AQUI");

await program.methods
  .initializeBot(
    backendAuthority, // NOVO: Public key do backend
    new BN(maxTradeAmount),
    maxSlippageBps
  )
  .accounts({
    botConfig,
    owner: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  })
  .rpc();
```

#### 2. Implementar a Função de Approve

**CRÍTICO**: O usuário deve executar isso ANTES do bot começar a operar.

```typescript
import {
  createApproveInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

async function approveTokensForBot(
  connection: Connection,
  wallet: any,
  tokenMint: PublicKey,
  amount: number // Quantidade máxima que o bot pode gastar
) {
  // 1. Calcular o endereço da PDA (bot_config)
  const [botConfigPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("bot_config"), wallet.publicKey.toBuffer()],
    program.programId
  );

  // 2. Obter a conta de token do usuário (ATA)
  const userTokenAccount = await getAssociatedTokenAddress(
    tokenMint,
    wallet.publicKey
  );

  // 3. Criar instrução de approve
  const approveIx = createApproveInstruction(
    userTokenAccount, // Conta do usuário
    botConfigPDA, // Delegate (a PDA do bot)
    wallet.publicKey, // Owner (usuário assina)
    amount, // Quantidade autorizada
    [], // Signers adicionais (nenhum)
    TOKEN_PROGRAM_ID
  );

  // 4. Enviar transação
  const tx = new Transaction().add(approveIx);
  const signature = await wallet.sendTransaction(tx, connection);
  await connection.confirmTransaction(signature);

  console.log(`✅ Approved ${amount} tokens for bot. Signature: ${signature}`);
}
```

#### 3. Fluxo Completo no Frontend

```typescript
// Passo 1: Inicializar o bot
await initializeBot(backendAuthority, maxAmount, slippage);

// Passo 2: Aprovar tokens para o bot (input token)
await approveTokensForBot(
  connection,
  wallet,
  TOKEN_MINT_IN, // Ex: USDC
  1_000_000_000 // Ex: 1000 USDC (com 6 decimais)
);

// Passo 3: (Opcional) Revogar aprovação depois
async function revokeApproval() {
  const revokeIx = createRevokeInstruction(
    userTokenAccount,
    wallet.publicKey,
    [],
    TOKEN_PROGRAM_ID
  );
  // ... enviar transação
}
```

### 🤖 Backend (A Fazer)

#### 1. Gerar o Keypair do Backend

```bash
# Gerar nova chave para o backend
solana-keygen new -o bot-keypair.json

# Ver a public key
solana-keygen pubkey bot-keypair.json
```

**⚠️ IMPORTANTE**: Essa chave é a que você usará como `backend_authority` no frontend.

#### 2. Implementar o Script Rust

```rust
use anchor_client::solana_sdk::{
    signature::{Keypair, read_keypair_file},
    signer::Signer,
    pubkey::Pubkey,
};
use anchor_client::{Client, Cluster};
use std::rc::Rc;

fn main() -> Result<()> {
    // 1. Carregar o keypair do backend
    let backend_keypair = read_keypair_file("bot-keypair.json")
        .expect("Failed to read bot keypair");

    // 2. Conectar à blockchain
    let client = Client::new(
        Cluster::Devnet,
        Rc::new(backend_keypair)
    );

    let program = client.program(PROGRAM_ID)?;

    // 3. Calcular a PDA do bot para o usuário
    let user_pubkey = Pubkey::from_str("USER_PUBLIC_KEY")?;
    let (bot_config_pda, _) = Pubkey::find_program_address(
        &[b"bot_config", user_pubkey.as_ref()],
        &program.id()
    );

    // 4. Executar o swap
    let tx = program
        .request()
        .accounts(trading_bot_smart_contract::accounts::ExecuteSwap {
            bot_config: bot_config_pda,
            owner: user_pubkey,              // Não assina
            backend_signer: backend_keypair.pubkey(), // Assina e paga gás
            user_token_in: user_token_in_account,
            user_token_out: user_token_out_account,
            pool_token_account: pool_account,
            token_program: TOKEN_PROGRAM_ID,
        })
        .args(trading_bot_smart_contract::instruction::ExecuteSwap {
            amount_in: 1_000_000,      // 1 USDC (6 decimais)
            minimum_amount_out: 50_000, // Slippage protection
        })
        .send()?;

    println!("Swap executed! Signature: {}", tx);
    Ok(())
}
```

## 🔄 Fluxo de Uso Completo

```
┌─────────────────┐
│  1. Frontend    │ → initialize_bot(backend_authority)
│  (Uma vez)      │ → approve(bot_pda, amount)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  2. Backend     │ → Monitora mercado 24/7
│  (Loop)         │ → Detecta oportunidade
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  3. Backend     │ → execute_swap()
│  (Automático)   │   • Backend assina (paga gás)
│                 │   • PDA move tokens do usuário
│                 │   • Swap na Raydium
│                 │   • Retorna tokens ao usuário
└─────────────────┘
```

## 🛡️ Considerações de Segurança

### ✅ Seguro

- Usuário mantém custódia dos fundos (non-custodial)
- Approve pode ser limitado a um valor máximo
- Approve pode ser revogado a qualquer momento
- Backend só pode executar trades dentro dos limites (`max_trade_amount`, `max_slippage`)
- PDA valida que apenas o `backend_authority` autorizado pode executar trades

### ⚠️ Atenção

- Guarde o `bot-keypair.json` com segurança (use `.env`, nunca commite no git)
- Monitore o saldo do backend_signer (precisa de SOL para pagar gás)
- Considere implementar rate limiting no backend
- Implemente logs e alertas para trades executados

## 📝 Próximos Passos

1. **Frontend**: Implementar a função de approve no UI
2. **Backend**: Criar o projeto Rust com `anchor-client`
3. **Testes**: Testar o fluxo completo em devnet:
   - Initialize → Approve → Execute Swap
4. **Integração Raydium**: Adicionar as contas e CPI real da Raydium
5. **Monitoramento**: Implementar lógica de detecção de oportunidades
6. **Produção**: Deploy em mainnet com testes extensivos

## 🔗 Recursos Úteis

- [SPL Token - Approve Documentation](https://spl.solana.com/token#authority-delegation)
- [Anchor - Cross-Program Invocations](https://www.anchor-lang.com/docs/cross-program-invocations)
- [Raydium SDK](https://github.com/raydium-io/raydium-sdk)
- [Anchor Client Rust](https://docs.rs/anchor-client/latest/anchor_client/)

---

**Status**: ✅ Smart Contract implementado e pronto para deploy
**Próximo**: 🔜 Implementar approve no frontend
