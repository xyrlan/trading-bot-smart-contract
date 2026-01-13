# ✅ Setup Localnet Completo!

Seu ambiente de testes local está 100% configurado e funcionando!

## 📊 Status Atual

```
✅ Validator rodando em: http://127.0.0.1:8899
✅ Programa deployed: q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS
✅ Wallets criadas com saldo
✅ Tokens USDC e TEST criados
✅ Arquivos .env.local gerados
```

## 🚀 Como Usar Agora

### 1. Ver Suas Credenciais

```bash
# Ver configuração completa
cat localnet-config.json

# Ver chave privada da wallet
cat test-wallets/user-wallet.json
```

**Suas credenciais:**
- **User Wallet:** `D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp`
- **Backend Wallet:** `GeNh46AyProQ6KP847BPprXRDQ8QcXs3Kc3R96vfuN8x`
- **Program ID:** `q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS`
- **USDC Mint:** `9V9Ag8buGizvZVyw23Y28pVETWPW3LumzipSs1F2fN5o`
- **TEST Token Mint:** `2oic95it7orjswW7KNzPDMFM2ubdWMNajJQvTjDoz1qt`

### 2. Configurar Phantom/Solflare

**Passo a Passo:**

1. **Adicionar RPC Customizado:**
   - Abrir Settings → Network
   - Adicionar Custom RPC
   - Nome: `Localnet`
   - URL: `http://127.0.0.1:8899`

2. **Importar Wallet:**
   ```bash
   cat test-wallets/user-wallet.json
   ```
   - Copiar o array completo
   - Phantom: Settings → Add/Connect Wallet → Import Private Key
   - Colar o array JSON
   - Trocar para rede "Localnet"

3. **Verificar Saldo:**
   - Você deve ver ~100 SOL
   - 1,000,000 USDC
   - 1,000,000 TEST tokens

### 3. Iniciar Frontend

```bash
cd frontend
yarn dev
```

Acessar: **http://localhost:3000**

### 4. Iniciar Backend (Opcional)

```bash
# Novo terminal
cd backend
yarn dev
```

API disponível em: **http://localhost:3001**

## 🧪 Testar Funcionalidades

### Initialize Bot

1. Conectar wallet no frontend
2. Ir para Dashboard
3. Clicar em "Initialize Bot"
4. Configurar:
   - Max Trade Amount: `1000000000` (1 token)
   - Max Slippage: `500` (5%)
   - Backend Authority: `GeNh46AyProQ6KP847BPprXRDQ8QcXs3Kc3R96vfuN8x`

### Create Strategy

1. Ir para Strategies
2. Create New Strategy
3. Selecionar indicadores (RSI, MACD, etc)
4. Salvar

### Execute Trade

1. Dashboard → Execute Trade
2. Selecionar par
3. Definir quantidade
4. Confirmar

## 🔧 Comandos Úteis

```bash
# Verificar status completo
bash scripts/test-setup.sh

# Ver logs do validator em tempo real
solana logs -u localhost

# Verificar saldo
solana balance D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp -u localhost

# Airdrop mais SOL (se necessário)
solana airdrop 10 D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp -u localhost

# Parar validator
pkill -9 solana-test-val

# Reset completo e reiniciar
yarn localnet:reset
yarn localnet:start
yarn localnet:deploy
```

## 📁 Arquivos Importantes

### Configuração
- `localnet-config.json` - Todas as configurações e endereços
- `frontend/.env.local` - Variáveis de ambiente do frontend
- `backend/.env.local` - Variáveis de ambiente do backend

### Wallets
- `test-wallets/user-wallet.json` - Wallet principal para testes
- `test-wallets/backend-wallet.json` - Wallet do backend para autorização

### Scripts
- `scripts/localnet-setup.sh` - Iniciar validator
- `scripts/localnet-deploy.cjs` - Deploy e setup completo
- `scripts/localnet-reset.sh` - Reset total
- `scripts/test-setup.sh` - Verificar configuração

## 📚 Documentação

- **Quick Start:** `LOCALNET_QUICKSTART.md`
- **Guia Completo:** `docs/LOCALNET_TESTING.md`
- **README:** `README.md`

## 🎯 Próximos Passos

1. **Testar no Frontend:**
   ```bash
   cd frontend && yarn dev
   ```

2. **Desenvolver Features:**
   - Modificar código
   - Salvar (hot reload automático)
   - Testar no browser

3. **Rebuild Programa (se necessário):**
   ```bash
   anchor build
   anchor deploy
   ```

4. **Reset para Testar Edge Cases:**
   ```bash
   yarn localnet:reset
   yarn localnet:start
   yarn localnet:deploy
   ```

## ⚡ Vantagens do Localnet

- **Rápido:** Transações confirmam em ~400ms
- **Confiável:** Nunca fica offline
- **Gratuito:** SOL e airdrops ilimitados
- **Iteração Rápida:** Reset instantâneo
- **Debug Fácil:** Logs locais completos

## 🆘 Troubleshooting

### Validator não inicia
```bash
pkill -9 solana-test-val
yarn localnet:start
```

### Transação falha
```bash
# Ver o erro completo
solana logs -u localhost

# Comum: Bot não inicializado
# Solução: Initialize Bot no frontend primeiro
```

### Frontend não conecta
```bash
# Verificar .env.local
cat frontend/.env.local

# Deve ter NEXT_PUBLIC_NETWORK=localnet
# Se não tiver, rodar:
yarn localnet:deploy
```

---

**🎉 Tudo pronto! Comece testando com: `cd frontend && yarn dev`**

Data de setup: $(date)
Validator: http://127.0.0.1:8899
Program ID: q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS
