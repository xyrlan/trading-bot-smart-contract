# 🤖 Trading Bot - Plataforma Não-Custodial Solana

Uma plataforma de trading algorítmico descentralizada construída na Solana, onde os usuários mantêm controle total de seus ativos através de carteiras não-custodiais.

## 🎯 Visão Geral

Este projeto implementa uma arquitetura híbrida que combina:
- **Smart Contract Anchor (Rust)**: Execução segura de trades na blockchain
- **Frontend Next.js**: Interface moderna e responsiva
- **Integração Raydium**: Swaps de tokens em DEX descentralizada

### Características Principais

✅ **Não-Custodial**: Seus fundos permanecem sempre em sua carteira  
✅ **Transparente**: Todas as operações registradas na blockchain  
✅ **Baixo Custo**: Taxas de ~$0.00025 por transação na Solana  
✅ **Seguro**: Smart contracts com validações robustas  
✅ **Moderno**: Interface construída com Next.js 15 + Tailwind CSS

## ⚠️ Avisos Importantes de Segurança

### 🚨 ESTE É UM MVP PARA DESENVOLVIMENTO
- Use **APENAS em DEVNET** com fundos de teste
- **NÃO use em mainnet** sem auditoria de segurança completa
- A integração com Raydium é um **placeholder** e requer implementação completa de CPI
- Este projeto é **apenas para fins educacionais**

### 🔒 Melhores Práticas de Segurança

1. **Nunca compartilhe suas chaves privadas**
2. **Revogue aprovações de tokens não utilizados** regularmente
3. **Verifique os endereços dos contratos** antes de assinar transações
4. **Comece com valores pequenos** ao testar
5. **Use carteiras separadas** para desenvolvimento e produção

### ⚖️ Considerações Legais (Brasil)

De acordo com a Lei nº 14.478/2022:
- Plataformas de trading podem ser classificadas como **VASP** (Virtual Asset Service Provider)
- Pode ser necessário **autorização do Banco Central** para operar
- Requisitos de **KYC/AML** podem ser aplicáveis
- **Consulte um advogado especializado** antes de usar em produção

## 🛠️ Arquitetura do Sistema

```
┌─────────────────┐
│   Usuário       │
│   (Carteira)    │
└────────┬────────┘
         │
         │ 1. Conecta
         ▼
┌─────────────────┐
│  Frontend       │
│  (Next.js)      │
└────────┬────────┘
         │
         │ 2. Configura Trade
         │ 3. Assina TX
         ▼
┌─────────────────┐
│ Smart Contract  │
│ (Anchor/Rust)   │
└────────┬────────┘
         │
         │ 4. Executa Swap
         ▼
┌─────────────────┐
│  Raydium DEX    │
└────────┬────────┘
         │
         │ 5. Tokens Trocados
         ▼
┌─────────────────┐
│   Usuário       │
│   (Carteira)    │
└─────────────────┘
```

## 📋 Pré-requisitos

### Ferramentas Necessárias

1. **Node.js** v18+ e **Yarn**
2. **Rust** (via rustup)
3. **Solana CLI** v1.18+
4. **Anchor Framework** v0.31+

### Instalação das Ferramentas

#### 1. Instalar Rust
```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env
```

#### 2. Instalar Solana CLI
```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

#### 3. Instalar Anchor
```bash
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli
```

#### 4. Verificar Instalações
```bash
rustc --version
solana --version
anchor --version
node --version
yarn --version
```

## 🚀 Guia de Instalação

### 1. Clone o Repositório
```bash
git clone <seu-repositorio>
cd trading-bot-smart-contract
```

### 2. Configurar Solana para Devnet
```bash
solana config set --url devnet
solana-keygen new  # Crie uma nova keypair se necessário
```

### 3. Obter SOL de Teste (Devnet)
```bash
solana airdrop 2
```

### 4. Build do Smart Contract
```bash
# Na raiz do projeto
anchor build
```

### 5. Deploy do Smart Contract
```bash
anchor deploy
```

**Importante**: Após o deploy, copie o **Program ID** exibido e atualize:
- `Anchor.toml` → `[programs.devnet]`
- `app/lib/constants.ts` → `PROGRAM_ID`
- `programs/trading-bot-smart-contract/src/lib.rs` → `declare_id!()`

### 6. Copiar o IDL para o Frontend
```bash
cp target/idl/trading_bot_smart_contract.json app/lib/idl.json
```

### 7. Instalar Dependências do Frontend
```bash
cd app
yarn install
```

### 8. Criar Arquivo de Ambiente
```bash
# Copie o exemplo
cp .env.local.example .env.local

# Edite e adicione seu Program ID
nano .env.local
```

### 9. Executar o Frontend
```bash
yarn dev
```

Acesse: http://localhost:3000

## 🧪 Executar Testes

### Testes do Smart Contract
```bash
# Na raiz do projeto
anchor test
```

Os testes cobrem:
- ✅ Inicialização do bot
- ✅ Atualização de configurações
- ✅ Execução de swaps (simulado)
- ✅ Validações de segurança
- ✅ Controle de limites

### Testes do Frontend
```bash
cd app
yarn build  # Verifica erros de TypeScript
```

## 📖 Como Usar

### 1. Conectar Carteira
- Clique em "Select Wallet" no header
- Escolha sua carteira (Phantom recomendado)
- Aprove a conexão

### 2. Inicializar o Bot
- Defina o **Limite Máximo por Trade** (ex: 1.0 tokens)
- Defina o **Slippage Máximo** (ex: 5%)
- Clique em "Inicializar Bot"
- Aprove a transação na sua carteira

### 3. Gerenciar Configurações
- Use o painel "Configuração do Bot"
- Clique em "Editar" para modificar limites
- Use o botão "Ativar/Desativar" para controlar o bot

### 4. Ver Histórico
- O painel "Histórico de Transações" mostra todas as operações
- Clique na assinatura para ver detalhes no Solana Explorer

## 📁 Estrutura do Projeto

```
trading-bot-smart-contract/
├── programs/
│   └── trading-bot-smart-contract/
│       ├── src/
│       │   └── lib.rs              # Smart contract principal
│       └── Cargo.toml
├── tests/
│   └── trading-bot-smart-contract.ts  # Testes Anchor
├── app/                            # Frontend Next.js
│   ├── app/
│   │   ├── layout.tsx              # Layout raiz com providers
│   │   └── page.tsx                # Página principal
│   ├── components/
│   │   ├── WalletContextProvider.tsx
│   │   ├── WalletConnect.tsx
│   │   ├── StatusDisplay.tsx
│   │   ├── TradeForm.tsx
│   │   └── TradeHistory.tsx
│   ├── hooks/
│   │   ├── useProgram.ts           # Hook para Anchor
│   │   ├── useBotConfig.ts         # Hook para configuração
│   │   └── useTrade.ts             # Hook para trades
│   └── lib/
│       ├── constants.ts            # Constantes e endereços
│       ├── anchor-client.ts        # Cliente Anchor
│       └── types.ts                # Tipos TypeScript
├── Anchor.toml                     # Configuração Anchor
└── README.md
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente (app/.env.local)

```env
# Rede Solana
NEXT_PUBLIC_NETWORK=devnet

# Program ID (atualizar após deploy)
NEXT_PUBLIC_PROGRAM_ID=<seu-program-id>
```

### Customizar RPC Endpoint

Edite `app/lib/constants.ts`:
```typescript
export const RPC_ENDPOINT = "https://seu-rpc-endpoint.com";
```

## 🐛 Troubleshooting

### Erro: "Program ID não encontrado"
- Certifique-se de fazer deploy do programa primeiro
- Atualize o Program ID em todos os locais mencionados

### Erro: "Insufficient funds"
- Obtenha mais SOL devnet: `solana airdrop 2`
- Verifique seu saldo: `solana balance`

### Erro: "Transaction simulation failed"
- Verifique se o bot está inicializado
- Confirme que o bot está ativo
- Verifique se a quantidade não excede o limite

### Erro de Wallet Adapter
- Instale a extensão Phantom
- Limpe o cache do navegador
- Tente recarregar a página

## 🔮 Roadmap e Próximos Passos

### Fase 1: MVP ✅ (Completo)
- [x] Smart contract básico
- [x] Interface frontend
- [x] Conexão de carteira
- [x] Testes unitários

### Fase 2: Integração Completa (Próxima)
- [ ] Implementar CPI real para Raydium
- [ ] Adicionar suporte a múltiplos pools
- [ ] Calcular slippage dinamicamente
- [ ] Integrar preços em tempo real

### Fase 3: Motor Off-chain
- [ ] Servidor Node.js para análise de mercado
- [ ] Integração com APIs de dados (TradingView, CoinGecko)
- [ ] Implementar indicadores técnicos (RSI, MACD, Médias Móveis)
- [ ] Sistema de webhooks para automação 24/7

### Fase 4: Funcionalidades Avançadas
- [ ] Suporte a múltiplas estratégias
- [ ] Backtesting de estratégias
- [ ] Dashboard de analytics
- [ ] Sistema de notificações
- [ ] Account Abstraction (Squads Protocol)

### Fase 5: Produção
- [ ] Auditoria de segurança completa
- [ ] Consultoria jurídica e compliance
- [ ] Deploy em mainnet
- [ ] Sistema de taxas (se aplicável)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é fornecido **"como está"** para fins educacionais.

## ⚠️ Disclaimer

**Este software é fornecido "como está", sem garantias de qualquer tipo.**

- Não nos responsabilizamos por perdas de fundos
- Use por sua própria conta e risco
- Teste extensivamente antes de usar com fundos reais
- Consulte profissionais antes de usar em produção
- Este projeto NÃO é aconselhamento financeiro

## 📞 Suporte

Para questões e suporte:
- Abra uma [Issue](../../issues)
- Consulte a [Documentação do Anchor](https://www.anchor-lang.com/)
- Visite a [Solana Docs](https://docs.solana.com/)

## 🙏 Agradecimentos

- [Anchor Framework](https://www.anchor-lang.com/)
- [Solana](https://solana.com/)
- [Raydium](https://raydium.io/)
- [Next.js](https://nextjs.org/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

---

**Construído com ❤️ para a comunidade Web3**

