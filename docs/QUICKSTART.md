# ⚡ Quick Start Guide

Comece a usar o Trading Bot em 5 minutos!

## 🚀 Setup Rápido

### 1. Clone e Instale

```bash
# Clone o repositório
git clone <seu-repo>
cd trading-bot-smart-contract

# Execute o script de setup automático
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### 2. Configure Solana

```bash
# Configure para devnet
solana config set --url devnet

# Crie uma keypair (se não tiver)
solana-keygen new

# Obtenha SOL de teste
solana airdrop 2
```

### 3. Deploy Smart Contract

```bash
# Build
anchor build

# Deploy
anchor deploy

# Anote o Program ID exibido!
```

### 4. Configure Frontend

```bash
# Copie o IDL
cp target/idl/trading_bot_smart_contract.json app/lib/idl.json

# Atualize o Program ID em app/lib/constants.ts
# PROGRAM_ID = "<seu-program-id>"

# Instale dependências
cd app
yarn install
```

### 5. Execute

```bash
# Inicie o frontend
yarn dev
```

Acesse: **http://localhost:3000**

## 📱 Como Usar

### Primeira Vez

1. **Instale Phantom Wallet** (extensão do navegador)
2. **Conecte a carteira** clicando em "Select Wallet"
3. **Obtenha SOL devnet** se necessário
4. **Inicialize seu bot**:
   - Defina limite máximo por trade (ex: 1.0 tokens)
   - Defina slippage máximo (ex: 5%)
   - Clique em "Inicializar Bot"
   - Aprove a transação

### Gerenciar Bot

- **Ver Status**: Painel "Status do Bot"
- **Editar Config**: Botão "Editar" no painel de configuração
- **Ativar/Desativar**: Botão de toggle no painel
- **Ver Histórico**: Painel "Histórico de Transações"

## 🧪 Executar Testes

```bash
# Testes do smart contract
anchor test

# Build do frontend (verifica erros)
cd app && yarn build
```

## 🐛 Problemas Comuns

### "Program ID não encontrado"
```bash
# Certifique-se de fazer deploy primeiro
anchor deploy

# Atualize o ID em todos os arquivos:
# - Anchor.toml
# - lib.rs (declare_id!)
# - app/lib/constants.ts
```

### "Insufficient funds"
```bash
# Obtenha mais SOL
solana airdrop 2

# Verifique saldo
solana balance
```

### "Wallet not connected"
```bash
# Instale Phantom
# Recarregue a página
# Clique em "Select Wallet"
```

### Erro ao conectar carteira
```bash
# Limpe o cache do navegador
# Verifique se Phantom está instalado
# Tente mudar de rede em Phantom (Devnet)
```

## 📚 Próximos Passos

1. ✅ **Leia o README.md** para documentação completa
2. ✅ **Veja SECURITY.md** para entender limitações
3. ✅ **Explore o código** em `programs/` e `app/`
4. ✅ **Contribua** seguindo CONTRIBUTING.md

## ⚠️ Lembre-se

- **APENAS DEVNET** - Não use em mainnet
- **FUNDOS DE TESTE** - Use apenas SOL devnet
- **MVP EDUCACIONAL** - Não é production-ready
- **SEM GARANTIAS** - Use por sua conta e risco

## 🆘 Precisa de Ajuda?

- 📖 **Documentação Completa**: [README.md](README.md)
- 🚀 **Deploy Guide**: [DEPLOY.md](DEPLOY.md)
- 🔒 **Segurança**: [SECURITY.md](SECURITY.md)
- 🤝 **Contribuir**: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🐛 **Issues**: [GitHub Issues](../../issues)

---

**Pronto para começar! 🎉**

Para documentação detalhada, veja [README.md](README.md)

