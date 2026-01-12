# 🛠️ Comandos Úteis - Trading Bot Solana

Referência rápida de comandos para desenvolvimento.

## 🚀 Setup Inicial

```bash
# Setup automático
./scripts/setup.sh

# Configurar Solana
solana config set --url devnet
solana-keygen new
solana airdrop 2
```

## 🔨 Build & Deploy

### Smart Contract

```bash
# Build
anchor build

# Testes
anchor test

# Testes sem validador local (usa devnet)
anchor test --skip-local-validator

# Deploy
anchor deploy

# Deploy para cluster específico
anchor deploy --provider.cluster devnet

# Ver chaves do programa
anchor keys list

# Verificar programa deployado
solana program show <PROGRAM_ID>

# Ver logs em tempo real
solana logs <PROGRAM_ID>
```

### Frontend

```bash
# Entrar no diretório
cd app

# Instalar dependências
yarn install

# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Start produção (após build)
yarn start

# Lint
yarn lint

# Lint com fix
yarn lint --fix
```

## 🧪 Testes

### Smart Contract

```bash
# Todos os testes
anchor test

# Testes com logs detalhados
anchor test -- --nocapture

# Teste específico
anchor test -- test_name

# Testes em devnet
anchor test --skip-local-validator
```

### Frontend

```bash
cd app

# Type check
yarn tsc --noEmit

# Build (verifica erros)
yarn build
```

## 🔍 Debug & Inspeção

### Solana

```bash
# Ver configuração atual
solana config get

# Ver saldo
solana balance

# Ver endereço da carteira
solana address

# Airdrop (devnet only)
solana airdrop 2

# Ver transação
solana confirm <TX_SIGNATURE>

# Ver conta
solana account <ACCOUNT_ADDRESS>

# Ver programa
solana program show <PROGRAM_ID>

# Logs em tempo real
solana logs

# Logs de programa específico
solana logs <PROGRAM_ID>
```

### Anchor

```bash
# Ver IDL
cat target/idl/trading_bot_smart_contract.json

# Tamanho do programa
ls -lh target/deploy/*.so

# Ver contas do programa
anchor account tradeBotConfig <ACCOUNT_ADDRESS>
```

## 📦 Dependências

### Adicionar Dependências

```bash
# Rust (Cargo.toml)
# Edite manualmente e rode:
cargo build

# Frontend
cd app
yarn add <package-name>
yarn add -D <dev-package-name>
```

### Atualizar Dependências

```bash
# Rust
cargo update

# Frontend
cd app
yarn upgrade
yarn upgrade-interactive
```

## 🔐 Gestão de Keys

### Solana Keys

```bash
# Criar nova keypair
solana-keygen new -o ~/.config/solana/my-keypair.json

# Definir keypair
solana config set --keypair ~/.config/solana/my-keypair.json

# Ver pubkey de arquivo
solana-keygen pubkey ~/.config/solana/my-keypair.json

# Recuperar de seed phrase
solana-keygen recover
```

### Anchor Keys

```bash
# Gerar novo Program ID
anchor keys sync

# Ver Program IDs
anchor keys list
```

## 🌐 Network Management

```bash
# Mudar para devnet
solana config set --url devnet

# Mudar para mainnet (CUIDADO!)
solana config set --url mainnet-beta

# Usar RPC customizado
solana config set --url https://api.devnet.solana.com

# Ver cluster atual
solana config get
```

## 🚢 Deploy & Upgrade

```bash
# Deploy inicial
anchor deploy

# Upgrade programa existente
anchor upgrade target/deploy/trading_bot_smart_contract.so \
  --program-id <PROGRAM_ID>

# Definir upgrade authority
solana program set-upgrade-authority <PROGRAM_ID> \
  --new-upgrade-authority <NEW_AUTHORITY>

# Tornar programa imutável (IRREVERSÍVEL!)
solana program set-upgrade-authority <PROGRAM_ID> \
  --final

# Fechar programa (recuperar rent)
solana program close <PROGRAM_ID>
```

## 📊 Monitoring

```bash
# Ver todas transações de uma conta
solana transaction-history <ADDRESS>

# Monitorar logs continuamente
solana logs | grep <PROGRAM_ID>

# Ver performance da rede
solana ping

# Ver status do cluster
solana cluster-version

# Ver validators
solana validators
```

## 🧹 Limpeza

```bash
# Limpar build artifacts
anchor clean

# Limpar cache do cargo
cargo clean

# Limpar node_modules
cd app
rm -rf node_modules .next
yarn install
```

## 🔄 Git Workflow

```bash
# Status
git status

# Adicionar mudanças
git add .

# Commit
git commit -m "feat: descrição da mudança"

# Push
git push origin main

# Criar branch
git checkout -b feature/minha-feature

# Ver branches
git branch -a

# Merge branch
git checkout main
git merge feature/minha-feature

# Tag de release
git tag -a v0.1.0 -m "MVP Release"
git push origin v0.1.0
```

## 🐛 Troubleshooting

```bash
# Programa não encontrado
solana program show <PROGRAM_ID>
# Se não existir, faça deploy novamente

# Saldo insuficiente
solana balance
solana airdrop 2

# Erro de build
anchor clean
anchor build

# Porta em uso (frontend)
lsof -ti:3000 | xargs kill -9
yarn dev

# Cache corrompido
rm -rf target .anchor node_modules
anchor build
cd app && yarn install
```

## 🔬 Advanced Commands

### Benchmarking

```bash
# Ver compute units usados
anchor test --detach -- --nocapture | grep "consumed"

# Profile do programa
cargo flamegraph --bin trading_bot_smart_contract
```

### Verificação

```bash
# Verificar build reproduzível
anchor build --verifiable

# Verificar programa deployado
solana-verify verify-from-repo \
  <PROGRAM_ID> \
  https://github.com/seu-usuario/trading-bot-smart-contract
```

### Análise de Segurança

```bash
# Audit de dependências Rust
cargo audit

# Soteria (Solana security analyzer)
soteria -analyzeAll .

# NPM audit
cd app && npm audit
```

## 📝 Scripts Customizados

Adicione ao `package.json`:

```json
{
  "scripts": {
    "setup": "./scripts/setup.sh",
    "build:contract": "anchor build",
    "test:contract": "anchor test",
    "deploy:devnet": "anchor deploy",
    "dev:frontend": "cd app && yarn dev",
    "build:frontend": "cd app && yarn build",
    "logs": "solana logs",
    "airdrop": "solana airdrop 2"
  }
}
```

Uso:
```bash
yarn setup
yarn build:contract
yarn test:contract
yarn dev:frontend
```

## 🆘 Links Úteis

- [Solana CLI Docs](https://docs.solana.com/cli)
- [Anchor CLI Docs](https://www.anchor-lang.com/docs/cli)
- [Solana Explorer (Devnet)](https://explorer.solana.com/?cluster=devnet)
- [Faucet Devnet](https://faucet.solana.com/)

---

**💡 Dica**: Adicione estes comandos como aliases no seu `.bashrc` ou `.zshrc`:

```bash
# Aliases úteis
alias sol-devnet='solana config set --url devnet'
alias sol-mainnet='solana config set --url mainnet-beta'
alias sol-balance='solana balance'
alias sol-airdrop='solana airdrop 2'
alias sol-logs='solana logs'
alias anchor-build='anchor build'
alias anchor-test='anchor test'
alias anchor-deploy='anchor deploy'
```

Recarregue: `source ~/.bashrc` ou `source ~/.zshrc`

