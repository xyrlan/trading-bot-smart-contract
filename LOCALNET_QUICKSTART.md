# 🚀 Localnet Quick Start

Guia rápido para começar a testar no localnet em 5 minutos!

## Por que localnet?

❌ **Devnet**: Instável, lento (10-30s por transação), frequentemente offline  
✅ **Localnet**: Rápido (400ms), confiável, 100% local, gratuito

---

## Setup em 3 Comandos

```bash
# 1. Iniciar validator local
yarn localnet:start

# 2. Deploy programa e setup completo
yarn localnet:deploy

# 3. Iniciar frontend
cd frontend && yarn dev
```

**Pronto!** Acesse: http://localhost:3000

---

## Configurar Wallet (2 minutos)

### 1. Adicionar RPC Customizado

**Phantom:**
1. Settings → Developer Settings → Change Network
2. Adicionar: `http://127.0.0.1:8899`

**Solflare:**
1. Settings → Network → Add Custom RPC
2. URL: `http://127.0.0.1:8899`

### 2. Importar Wallet de Teste

```bash
# Ver a chave privada
cat test-wallets/user-wallet.json
```

**Importar no Phantom:**
1. Add/Connect Wallet → Import Private Key
2. Colar o array JSON completo
3. Trocar para rede "Localnet"

**Você tem:**
- 💰 100 SOL
- 💵 1,000,000 USDC
- 🎫 1,000,000 Test Tokens

---

## Testar no Frontend

1. **Conectar Wallet** → Phantom/Solflare (Localnet)
2. **Initialize Bot** → Configurar limites e backend authority
3. **Create Strategy** → RSI, MACD, Bollinger Bands
4. **Execute Trade** → Testar swap manual
5. **View Performance** → Ver resultados

---

## Comandos Úteis

```bash
# Ver saldo
solana balance -u localhost

# Ver logs em tempo real
solana logs -u localhost

# Reset completo (começar do zero)
yarn localnet:reset
yarn localnet:start
yarn localnet:deploy

# Verificar se está funcionando
bash scripts/test-setup.sh
```

---

## Troubleshooting

### Validator não inicia

```bash
pkill -9 solana-test-val
yarn localnet:start
```

### Transação falha

```bash
# Ver o erro
solana logs -u localhost

# Common issues:
# - Bot não inicializado? → Initialize Bot no frontend
# - Saldo insuficiente? → solana airdrop 10 <ADDRESS> -u localhost
```

### Frontend não conecta

```bash
# Verificar .env.local
cat frontend/.env.local

# Deve ter NEXT_PUBLIC_NETWORK=localnet
```

---

## Documentação Completa

Para guia detalhado com troubleshooting avançado:

📖 **[docs/LOCALNET_TESTING.md](docs/LOCALNET_TESTING.md)**

---

## Desenvolvendo com Localnet

### Modificar Smart Contract

```bash
# 1. Editar programs/trading-bot/src/lib.rs
# 2. Rebuild e redeploy
anchor build
anchor deploy
```

### Modificar Frontend/Backend

Apenas salve os arquivos - hot reload está ativo! ♻️

### Reset para Testar Edge Cases

```bash
yarn localnet:reset      # Limpa tudo
yarn localnet:start      # Restart validator
yarn localnet:deploy     # Novo deploy
```

---

## Vantagens do Localnet

| Aspecto | Localnet | Devnet |
|---------|----------|--------|
| **Velocidade** | ~400ms | 10-30s |
| **Disponibilidade** | 100% ✅ | 70-90% ⚠️ |
| **Reset** | Instantâneo | Impossível |
| **Debug** | Fácil | Difícil |
| **Custo** | Gratuito | Gratuito |

---

**Pronto para começar?** Execute: `yarn localnet:start` 🚀
