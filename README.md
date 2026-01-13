# Trading Bot Smart Contract

Um trading bot automatizado para Solana com integração Raydium CPMM, estratégias personalizáveis e autorização via smart contract.

## 🚀 Quick Start - Localnet Testing

O devnet da Solana frequentemente fica instável. Use o **localnet** para desenvolvimento rápido e confiável!

### Setup Completo (5 minutos)

```bash
# 1. Instalar dependências
yarn install

# 2. Iniciar validator local
yarn localnet:start

# 3. Deploy programa e setup completo
yarn localnet:deploy

# 4. Iniciar frontend (novo terminal)
cd frontend && yarn dev
# Acessar: http://localhost:3000

# 5. Iniciar backend (novo terminal - opcional)
cd backend && yarn dev
```

### Configurar Wallet

1. Abrir Phantom/Solflare
2. Adicionar Custom RPC: `http://127.0.0.1:8899`
3. Importar wallet de teste: `cat test-wallets/user-wallet.json`

**Pronto!** Você tem:
- ✅ 100 SOL
- ✅ 1M USDC
- ✅ 1M Test Tokens
- ✅ Programa deployed
- ✅ Frontend rodando

## 📖 Documentação Completa

Para guia detalhado de testes locais, veja:
- **[docs/LOCALNET_TESTING.md](docs/LOCALNET_TESTING.md)** - Guia completo de testes no localnet

Para outros guias:
- **[docs/QUICKSTART.md](docs/QUICKSTART.md)** - Setup rápido
- **[docs/DEPLOY.md](docs/DEPLOY.md)** - Deploy em devnet/mainnet
- **[docs/PROJECT_SUMMARY.md](docs/PROJECT_SUMMARY.md)** - Visão geral do projeto

## 🛠️ Scripts Disponíveis

### Localnet

```bash
yarn localnet:start          # Inicia validator local
yarn localnet:deploy         # Deploy + setup completo
yarn localnet:reset          # Reset completo (limpa tudo)
yarn localnet:full           # Reset + Start + Deploy (tudo de uma vez)
yarn localnet:start-raydium  # Inicia com Raydium clonado (opcional)
```

### Testes

```bash
yarn test:localnet           # Testes Anchor (requer validator rodando)
anchor test                  # Testes com novo validator (mais lento)
```

### Build & Deploy

```bash
anchor build                 # Compilar programa
anchor deploy                # Deploy programa
```

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                    │
│  - Dashboard, Strategies, Backtesting, Performance          │
│  - Conecta via Wallet Adapter (Phantom/Solflare)            │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ├─────────────┐
                  ▼             ▼
        ┌─────────────────┐  ┌──────────────────┐
        │  Smart Contract │  │  Backend (Node)   │
        │  (Rust/Anchor)  │  │  - Strategies     │
        │                 │  │  - Market Data    │
        │  - Bot Config   │  │  - Execution      │
        │  - Authorize    │  │  - Queue          │
        │  - Validate     │  └──────────────────┘
        └─────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │  Raydium CPMM   │
        │  - Swaps        │
        │  - Pools        │
        └─────────────────┘
```

## 🔑 Funcionalidades

### Smart Contract (Rust)
- ✅ Inicialização de bot por usuário
- ✅ Configuração de limites e slippage
- ✅ Autorização de swaps pelo backend
- ✅ Validação de parâmetros
- ✅ Contador de trades

### Backend (TypeScript)
- ✅ Motor de estratégias (RSI, MACD, Bollinger Bands)
- ✅ Market data streaming (BirdEye + Mock mode)
- ✅ Fila de execução de trades
- ✅ Backtesting engine
- ✅ API REST para gestão

### Frontend (Next.js)
- ✅ Dashboard com métricas em tempo real
- ✅ Criação e gestão de estratégias
- ✅ Backtesting visual
- ✅ Histórico de performance
- ✅ Integração com wallets Solana

## 📂 Estrutura do Projeto

```
trading-bot-smart-contract/
├── programs/
│   └── trading-bot/          # Smart contract Rust/Anchor
│       └── src/lib.rs
├── frontend/                 # Frontend Next.js
│   ├── app/                  # Pages (App Router)
│   ├── components/           # React components
│   ├── hooks/                # Custom hooks
│   └── lib/                  # Utils, API clients, stores
├── backend/                  # Backend Node.js
│   ├── src/
│   │   ├── services/         # Strategy Engine, Market Data, Execution
│   │   ├── strategies/       # Trading strategies
│   │   ├── queues/           # Job queues
│   │   └── api/              # API controllers
│   └── prisma/               # Database schema
├── scripts/                  # Utility scripts
│   ├── localnet-setup.sh     # Start local validator
│   ├── localnet-deploy.ts    # Deploy & setup
│   └── localnet-reset.sh     # Reset environment
├── tests/                    # Anchor tests
└── docs/                     # Documentation
```

## 🧪 Testes

### Testes Unitários (Anchor)

```bash
# Com validator rodando
yarn test:localnet

# Inicia novo validator automaticamente
anchor test
```

### Testes Manuais (Frontend)

1. Iniciar localnet: `yarn localnet:start`
2. Deploy: `yarn localnet:deploy`
3. Abrir frontend: `cd frontend && yarn dev`
4. Conectar wallet e testar fluxos

## 🔧 Configuração

### Localnet (Desenvolvimento)

Arquivos `.env.local` são gerados automaticamente pelo `yarn localnet:deploy`.

### Devnet/Mainnet

Copie e configure os templates:

```bash
# Frontend
cp frontend/env.local.template frontend/.env.local

# Backend
cp backend/env.template backend/.env
```

Edite com seus valores:
- RPC URL
- Program ID
- Wallets
- API Keys

## 🚨 Troubleshooting

### Validator não inicia

```bash
pkill -9 solana-test-val
yarn localnet:start
```

### Frontend não conecta

```bash
# Verificar .env.local
cat frontend/.env.local

# Recriar se necessário
yarn localnet:deploy
```

### Erros de transação

```bash
# Ver logs em tempo real
solana logs -u localhost

# Reset e retry
yarn localnet:reset
yarn localnet:start
yarn localnet:deploy
```

## 📚 Recursos

- [Documentação Completa](docs/)
- [Solana Docs](https://docs.solana.com/)
- [Anchor Book](https://book.anchor-lang.com/)
- [Raydium SDK](https://github.com/raydium-io/raydium-sdk-v2)

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](docs/CONTRIBUTING.md) para detalhes.

## 📝 Licença

ISC

---

**Status do Projeto:** ✅ Pronto para desenvolvimento local  
**Última atualização:** Janeiro 2026
