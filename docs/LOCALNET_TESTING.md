# Guia Completo de Testes no Localnet

## 📋 Índice

- [Por que Localnet?](#por-que-localnet)
- [Requisitos](#requisitos)
- [Setup Inicial](#setup-inicial)
- [Workflow de Desenvolvimento](#workflow-de-desenvolvimento)
- [Testando Manualmente](#testando-manualmente)
- [Troubleshooting](#troubleshooting)
- [Diferenças Localnet vs Devnet](#diferenças-localnet-vs-devnet)
- [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## Por que Localnet?

O **devnet** da Solana frequentemente fica instável ou fora do ar, tornando o desenvolvimento frustrante. O **localnet** resolve isso rodando um validador Solana completo na sua máquina local.

### Vantagens do Localnet

✅ **100% Local** - Não depende de serviços externos  
✅ **Rápido** - Confirmação de transações em ~400ms  
✅ **Confiável** - Nunca fica "fora do ar"  
✅ **Gratuito** - Sem custos de RPC ou SOL  
✅ **Realista** - Usa o programa real compilado  
✅ **Reset Rápido** - Teste edge cases facilmente

---

## Requisitos

### Software Necessário

- **Solana CLI** (v1.18+)
  ```bash
  solana --version
  ```
- **Anchor CLI** (v0.32+)

  ```bash
  anchor --version
  ```

- **Node.js** (v18+)

  ```bash
  node --version
  ```

- **Yarn**
  ```bash
  yarn --version
  ```

### Verificar Instalações

```bash
# Verificar se solana-test-validator está disponível
which solana-test-validator

# Verificar se Anchor está configurado
anchor --version
```

---

## Setup Inicial

### 1. Clonar e Instalar Dependências

```bash
# Na raiz do projeto
yarn install

# No frontend
cd frontend && yarn install

# No backend
cd backend && yarn install
```

### 2. Iniciar o Localnet

```bash
# Voltar para a raiz
cd ../..

# Iniciar validator local
yarn localnet:start
```

**Saída esperada:**

```
🚀 Starting Solana Test Validator (Localnet)...
✅ Validator iniciado com sucesso!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Localnet está rodando!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📡 RPC Endpoint: http://127.0.0.1:8899
💰 Faucet: http://127.0.0.1:9900
```

### 3. Deploy do Programa e Setup Completo

```bash
yarn localnet:deploy
```

Este comando irá:

1. ✅ Compilar o programa Rust
2. ✅ Fazer deploy no localnet
3. ✅ Criar wallets de teste (user + backend)
4. ✅ Criar tokens de teste (USDC + Test Token)
5. ✅ Mintar tokens para as wallets
6. ✅ Gerar arquivos `.env.local` para frontend e backend
7. ✅ Salvar configuração em `localnet-config.json`

**Saída esperada:**

```
✅ Setup Completo!

📋 Resumo:
  Program ID: 6Bo9tLqXg1SdDyDG6ZFV39NF32GRYEw1aPaE66nTrUH1
  RPC: http://127.0.0.1:8899
  User Wallet: <endereço>
  Backend Wallet: <endereço>
  USDC Mint: <endereço>
  Test Token Mint: <endereço>

📝 Próximos Passos:
  1. Importar wallet no Phantom/Solflare
  2. Iniciar frontend: cd frontend && yarn dev
  3. Iniciar backend: cd backend && yarn dev
```

### 4. Configurar Wallet (Phantom/Solflare)

#### Adicionar Custom RPC

1. Abrir Phantom/Solflare
2. Ir em **Configurações** → **Rede**
3. Adicionar custom RPC:
   - **Nome:** Localnet
   - **RPC URL:** `http://127.0.0.1:8899`

#### Importar Wallet de Teste

A wallet de teste foi criada em `test-wallets/user-wallet.json`.

**Ver a chave privada:**

```bash
cat test-wallets/user-wallet.json
```

**Importar no Phantom:**

1. Configurações → Add/Connect Wallet
2. Import Private Key
3. Colar o array de números do arquivo JSON
4. Selecionar rede "Localnet"

**Verificar saldo:**

```bash
solana balance <WALLET_ADDRESS> -u localhost
```

Você deve ter ~100 SOL + tokens de teste.

---

## Workflow de Desenvolvimento

### Fluxo Diário

```bash
# 1. Verificar se validator está rodando
solana cluster-version

# Se não estiver, iniciar:
yarn localnet:start

# 2. Iniciar frontend (terminal 1)
cd frontend
yarn dev
# Acessar: http://localhost:3000

# 3. Iniciar backend (terminal 2 - opcional)
cd backend
yarn dev
# API: http://localhost:3001

# 4. Testar no browser
# - Abrir http://localhost:3000
# - Conectar wallet (Localnet)
# - Testar funcionalidades
```

### Reset Completo

Quando precisar começar do zero:

```bash
# Para tudo e limpa dados
yarn localnet:reset

# Reinicia e faz deploy novamente
yarn localnet:start
yarn localnet:deploy
```

### Apenas Redeployar Programa

Se você modificou apenas o programa Rust:

```bash
anchor build
anchor deploy
```

### Modificações no Frontend/Backend

Basta salvar os arquivos - hot reload está ativo.

---

## Testando Manualmente

### 1. Inicializar Bot

1. Conectar wallet no frontend
2. Ir para **Dashboard**
3. Clicar em "Initialize Bot"
4. Configurar:
   - Max Trade Amount: 1 SOL (ou menos)
   - Max Slippage: 5%
   - Backend Authority: (copiar do `.env.local` do backend)

### 2. Criar Estratégia

1. Ir para **Strategies**
2. Clicar em "Create Strategy"
3. Selecionar indicadores (RSI, MACD, Bollinger Bands)
4. Configurar parâmetros
5. Salvar

### 3. Executar Trade Manual

1. Ir para **Dashboard** → **Execute Trade**
2. Selecionar par (TEST/USDC)
3. Definir quantidade
4. Confirmar transação

### 4. Ver Resultados

1. **Transactions:** `solana logs -u localhost`
2. **Explorer:** https://explorer.solana.com/?cluster=custom&customUrl=http://127.0.0.1:8899
3. **Program Logs:** Aparecem no terminal onde o frontend está rodando

---

## Troubleshooting

### Validator não inicia

**Erro:** `Address already in use`

**Solução:**

```bash
# Parar processos antigos
pkill -9 solana-test-val

# Tentar novamente
yarn localnet:start
```

---

### "Failed to connect to validator"

**Problema:** Validator pode estar demorando para iniciar.

**Solução:**

```bash
# Aguardar alguns segundos e testar
solana cluster-version

# Se ainda não funcionar, verificar logs
tail -f test-ledger/validator.log
```

---

### Wallet sem saldo

**Problema:** Depois de reset, wallet fica sem SOL.

**Solução:**

```bash
# Fazer airdrop manual
solana airdrop 10 <WALLET_ADDRESS> -u localhost

# Ou fazer novo deploy que recria tudo
yarn localnet:deploy
```

---

### "Transaction simulation failed"

**Causas comuns:**

1. **Bot não inicializado** - Execute `initialize_bot` primeiro
2. **Saldo insuficiente** - Verificar saldo de SOL e tokens
3. **Programa desatualizado** - Fazer redeploy: `anchor deploy`

**Debug:**

```bash
# Ver logs em tempo real
solana logs -u localhost

# Ver transação específica
solana confirm <TX_SIGNATURE> -u localhost -v
```

---

### Frontend não conecta ao localnet

**Problema:** Frontend continua tentando conectar ao devnet.

**Verificar:**

```bash
# Verificar se .env.local existe
cat frontend/.env.local

# Deve conter:
NEXT_PUBLIC_NETWORK=localnet
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8899
```

**Solução:**

```bash
# Recriar arquivo
yarn localnet:deploy

# Reiniciar Next.js
cd frontend
yarn dev
```

---

### Backend não consegue autorizar trades

**Problema:** "UnauthorizedBackend" error.

**Verificar:**

```bash
# Backend wallet no .env.local deve corresponder ao configurado no bot
cat backend/.env.local | grep BACKEND_PRIVATE_KEY
```

**Solução:**

1. Pegar a `WALLET_PUBLIC_KEY` do `backend/.env.local`
2. Usar esse endereço como `backend_authority` ao inicializar o bot

---

## Diferenças Localnet vs Devnet

| Aspecto                | Localnet   | Devnet          |
| ---------------------- | ---------- | --------------- |
| **Velocidade**         | ~400ms     | 10-30s          |
| **Disponibilidade**    | 100%       | 70-90%          |
| **Reset**              | Instant    | Impossível      |
| **Custo**              | Gratuito   | Gratuito        |
| **Realismo**           | Alto       | Alto            |
| **Dados Persistentes** | Não        | Sim (até reset) |
| **Acesso Externo**     | Não        | Sim             |
| **Raydium Pools**      | Clone/Mock | Pools reais     |

### Quando usar cada um?

**Use Localnet para:**

- ✅ Desenvolvimento diário
- ✅ Testes rápidos e iteração
- ✅ Debug de contratos
- ✅ CI/CD pipelines
- ✅ Testar edge cases

**Use Devnet para:**

- ✅ Testes de integração final
- ✅ Demo para stakeholders
- ✅ Validar com pools Raydium reais
- ✅ Testar com RPC providers
- ✅ QA antes de mainnet

---

## Dicas e Boas Práticas

### 1. Use Scripts do package.json

```bash
# Setup completo em um comando
yarn localnet:full

# Testes Anchor sem iniciar validator
yarn test:localnet
```

### 2. Mantenha Múltiplas Wallets

Crie wallets diferentes para cenários:

- User wallet (testes normais)
- Admin wallet (operações especiais)
- Backend wallet (autorização)

```bash
# Gerar nova wallet
solana-keygen new -o test-wallets/admin-wallet.json

# Airdrop
solana airdrop 10 <ADDRESS> -u localhost
```

### 3. Use Aliases

Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
alias localnet-start='yarn localnet:start'
alias localnet-reset='yarn localnet:reset'
alias localnet-logs='solana logs -u localhost'
alias localnet-balance='solana balance -u localhost'
```

### 4. Salve Configurações Úteis

Mantenha `localnet-config.json` versionado (exceto chaves privadas):

```json
{
  "programId": "...",
  "tokens": {
    "usdc": "...",
    "testToken": "..."
  }
}
```

### 5. Limpe Regularmente

```bash
# Limpar ledger antigo (libera espaço)
yarn localnet:reset

# Limpar cache de build
rm -rf target/

# Rebuild completo
anchor build
```

### 6. Monitor de Performance

```bash
# Ver performance do validator
solana validator-info -u localhost

# Ver TPS (transactions per second)
solana transaction-count -u localhost
```

### 7. Snapshots para Testes Avançados

Se você tem um setup complexo que demora:

```bash
# Salvar snapshot
cp -r test-ledger test-ledger-backup

# Restaurar snapshot
rm -rf test-ledger
cp -r test-ledger-backup test-ledger
```

---

## Comandos Úteis

### Solana CLI

```bash
# Ver configuração atual
solana config get

# Mudar para localnet
solana config set --url localhost

# Ver saldo
solana balance -u localhost

# Ver transações recentes
solana transaction-history <WALLET> -u localhost

# Airdrop
solana airdrop 10 <WALLET> -u localhost
```

### Anchor

```bash
# Build
anchor build

# Deploy
anchor deploy

# Testes (com validator rodando)
anchor test --skip-local-validator

# Ver Program ID
anchor keys list
```

### Logs e Debug

```bash
# Logs em tempo real
solana logs -u localhost

# Logs do programa específico
solana logs -u localhost | grep "<PROGRAM_ID>"

# Verificar conta
solana account <ADDRESS> -u localhost

# Verificar programa
solana program show <PROGRAM_ID> -u localhost
```

---

## Recursos Adicionais

### Documentação Oficial

- [Solana Docs - Local Development](https://docs.solana.com/developing/test-validator)
- [Anchor Book](https://book.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)

### Scripts do Projeto

- `scripts/localnet-setup.sh` - Inicia validator
- `scripts/localnet-deploy.ts` - Deploy e setup completo
- `scripts/localnet-reset.sh` - Reset completo
- `scripts/localnet-setup-raydium.sh` - Clone Raydium (opcional)

### Arquivos de Configuração

- `Anchor.toml` - Configuração do Anchor
- `localnet-config.json` - Config gerada automaticamente
- `frontend/.env.local` - Variáveis de ambiente do frontend
- `backend/.env.local` - Variáveis de ambiente do backend

---

## Suporte

Se encontrar problemas não cobertos neste guia:

1. Verificar logs: `tail -f test-ledger/validator.log`
2. Resetar ambiente: `yarn localnet:reset && yarn localnet:start`
3. Verificar issues no GitHub do projeto
4. Consultar [Solana Stack Exchange](https://solana.stackexchange.com/)

---

**Última atualização:** Janeiro 2026  
**Versão do guia:** 1.0
