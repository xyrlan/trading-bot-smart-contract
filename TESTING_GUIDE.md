# 🧪 Guia Passo a Passo para Testar

## 🎯 Objetivo

Testar o trading bot manualmente através do frontend, desde a configuração até a execução de trades.

---

## 📋 Checklist Antes de Começar

Verifique se tudo está rodando:

```bash
# 1. Validator rodando?
solana cluster-version
# Deve retornar: 3.0.13 (ou similar)

# 2. Setup completo?
bash scripts/test-setup.sh
# Deve mostrar: ✅ Setup completo!
```

---

## 🚀 Passo 1: Iniciar o Frontend

```bash
cd frontend
yarn dev
```

**Saída esperada:**
```
✓ Ready in 2-3s
○ Local: http://localhost:3000
```

✅ **Abrir no navegador:** http://localhost:3000

---

## 👛 Passo 2: Configurar e Conectar Wallet

### 2.1 Adicionar RPC Customizado no Phantom

1. Abrir extensão Phantom no navegador
2. Clicar no ícone de ⚙️ (Settings)
3. **Developer Settings** → **Change Network**
4. Clicar em **+ Add Network**
5. Preencher:
   - **Network Name:** `Localnet`
   - **RPC URL:** `http://127.0.0.1:8899`
6. **Save**
7. **Trocar para a rede "Localnet"** no menu superior

### 2.2 Importar Wallet de Teste

```bash
# Ver a chave privada
cat test-wallets/user-wallet.json
```

**No Phantom:**
1. Settings → **Add/Connect Wallet**
2. **Import Private Key**
3. **Colar o array JSON completo** do arquivo acima
   ```json
   [175,0,40,248,141,178,8,190,...]
   ```
4. Dar um nome: `Localnet Test`
5. **Confirm**

### 2.3 Verificar Saldo

No Phantom você deve ver:
- 💰 **~100 SOL**
- 💵 Tokens customizados aparecem automaticamente

### 2.4 Conectar ao Site

1. No http://localhost:3000
2. Clicar em **"Connect Wallet"** (canto superior direito)
3. Selecionar **Phantom**
4. Aprovar a conexão

✅ **Wallet conectada!** Você deve ver seu endereço no canto superior direito.

---

## 🤖 Passo 3: Inicializar o Bot

### 3.1 Ir para o Dashboard

1. Clicar em **"Dashboard"** no menu
2. Você verá um card de "Onboarding" ou "Bot não inicializado"

### 3.2 Inicializar Bot Config

1. Clicar em **"Initialize Bot"** ou **"Setup"**
2. Preencher o formulário:

```
Max Trade Amount: 1000000000    (1 token com 9 decimais)
Max Slippage: 500               (5% = 500 basis points)
Backend Authority: GeNh46AyProQ6KP847BPprXRDQ8QcXs3Kc3R96vfuN8x
```

**Onde pegar o Backend Authority:**
```bash
cat localnet-config.json | grep "backendWallet" -A 1
# Usar o publicKey do backendWallet
```

3. Clicar em **"Initialize"**
4. **Aprovar a transação** no Phantom
5. Aguardar confirmação (~1-2 segundos)

✅ **Bot inicializado!** O dashboard deve atualizar mostrando suas configurações.

### 3.3 Verificar no Terminal

```bash
# Ver logs da transação
solana logs -u localhost

# Deve aparecer algo como:
# Program log: Bot initialized for owner: D2fcw8...
```

---

## 📊 Passo 4: Criar uma Estratégia (Opcional)

### 4.1 Ir para Strategies

1. No menu, clicar em **"Strategies"**
2. Clicar em **"Create New Strategy"** ou **"+"**

### 4.2 Configurar Estratégia

Exemplo de estratégia simples:

```
Name: My First Strategy
Description: Test strategy with RSI
Trading Pair: TEST/USDC

Indicators:
☑️ RSI
  - Period: 14
  - Oversold: 30
  - Overbought: 70

☑️ MACD (opcional)
  - Fast: 12
  - Slow: 26
  - Signal: 9
```

3. Clicar em **"Save Strategy"**

✅ **Estratégia criada!** Ela aparecerá na lista de estratégias.

---

## 💱 Passo 5: Executar um Trade Manual

### 5.1 Voltar ao Dashboard

1. Clicar em **"Dashboard"**
2. Procurar seção **"Execute Trade"** ou **"Manual Trade"**

### 5.2 Configurar o Trade

```
Token In: TEST (ou SOL)
Token Out: USDC
Amount: 0.001  (quantidade pequena para teste)
Slippage: 5%
```

### 5.3 Executar

1. Clicar em **"Execute Trade"** ou **"Swap"**
2. **Revisar os detalhes** da transação
3. **Aprovar no Phantom**
4. Aguardar confirmação

### 5.4 Verificar Resultado

**No terminal:**
```bash
solana logs -u localhost
```

Você deve ver:
```
Program log: Swap Autorizado! Owner: D2fcw8..., Amount In: 1000000, Trade #1
```

**No frontend:**
- O trade aparece no histórico
- Saldos são atualizados

✅ **Trade executado com sucesso!**

---

## 📈 Passo 6: Testar Backtesting (Opcional)

### 6.1 Ir para Backtesting

1. Menu → **"Backtesting"**
2. Selecionar uma estratégia criada
3. Configurar período:
   ```
   Start Date: 7 dias atrás
   End Date: Hoje
   Initial Balance: 1000 USDC
   ```
4. Clicar em **"Run Backtest"**

### 6.2 Ver Resultados

O frontend mostrará:
- 📊 **Gráfico de performance**
- 💰 **PnL (Profit & Loss)**
- 📈 **Win rate**
- 🔢 **Número de trades**

---

## 🔍 Passo 7: Verificar Performance

### 7.1 Dashboard - Métricas

No dashboard você deve ver cards com:
- **Total Trades:** 1 (ou mais)
- **Active Strategies:** 1 (se criou uma)
- **PnL:** Variação do saldo
- **Win Rate:** % de trades lucrativos

### 7.2 Ver Histórico

1. Ir para **"Performance"** ou **"History"**
2. Ver lista de todos os trades executados
3. Clicar em um trade para ver detalhes

---

## 🎯 Cenários de Teste

### Teste 1: Verificar Validações ✅

**Objetivo:** Garantir que o smart contract valida limites

1. Tentar executar trade com amount > max_trade_amount
2. **Deve falhar** com erro: "AmountExceedsLimit"

### Teste 2: Bot Inativo ✅

**Objetivo:** Verificar que bot desativado não permite trades

1. Dashboard → **Settings** → **Deactivate Bot**
2. Tentar executar trade
3. **Deve falhar** com erro: "BotNotActive"
4. Reativar bot: **Activate Bot**

### Teste 3: Trade com Slippage Alto ✅

**Objetivo:** Testar proteção de slippage

1. Configurar slippage de 50%
2. Executar trade
3. Verificar que funciona mas avisa sobre alto slippage

### Teste 4: Múltiplos Trades ✅

**Objetivo:** Testar contador de trades

1. Executar 3-5 trades seguidos
2. Dashboard deve mostrar o número correto
3. Verificar no smart contract:
   ```bash
   solana account <BOT_CONFIG_PDA> -u localhost
   ```

---

## 🧪 Comandos Úteis Durante os Testes

### Ver Logs em Tempo Real

```bash
# Terminal separado
solana logs -u localhost
```

### Verificar Saldo

```bash
solana balance D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp -u localhost
```

### Ver Estado do Bot Config

```bash
# Derivar o PDA do bot config
# PDA = derive(["bot_config", owner_pubkey])

# Ou ver no código do frontend em useBotConfig.ts
```

### Airdrop Mais SOL (se necessário)

```bash
solana airdrop 10 D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp -u localhost
```

### Ver Transação Específica

```bash
solana confirm <SIGNATURE> -u localhost -v
```

---

## 🚨 Troubleshooting

### ❌ Wallet não conecta

**Problema:** "Failed to connect"

**Solução:**
1. Verificar que RPC está correto: `http://127.0.0.1:8899`
2. Verificar que está na rede "Localnet" no Phantom
3. Refresh da página

### ❌ Transação falha

**Problema:** "Transaction simulation failed"

**Verificar:**
```bash
# Ver o erro completo
solana logs -u localhost
```

**Causas comuns:**
- Bot não inicializado → Initialize Bot primeiro
- Saldo insuficiente → Fazer airdrop
- Amount muito alto → Usar quantidade menor

### ❌ Frontend não carrega

**Problema:** Página em branco

**Solução:**
```bash
# Verificar .env.local
cat frontend/.env.local

# Deve ter:
NEXT_PUBLIC_NETWORK=localnet
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8899

# Se não tiver, rodar:
cd ..
yarn localnet:deploy
cd frontend
yarn dev
```

### ❌ "Program not found"

**Problema:** Programa não está deployed

**Solução:**
```bash
cd ..
anchor deploy
```

---

## ✅ Checklist de Testes Completos

Marque cada item após testar:

- [ ] ✅ Validator rodando
- [ ] ✅ Frontend iniciado
- [ ] ✅ Wallet configurada e conectada
- [ ] ✅ Bot inicializado com sucesso
- [ ] ✅ Configuração do bot visível no dashboard
- [ ] ✅ Estratégia criada
- [ ] ✅ Trade manual executado
- [ ] ✅ Trade aparece no histórico
- [ ] ✅ Saldos atualizados corretamente
- [ ] ✅ Contador de trades incrementado
- [ ] ✅ Backtesting executado (opcional)
- [ ] ✅ Performance metrics visíveis
- [ ] ✅ Bot pode ser desativado/reativado
- [ ] ✅ Validações funcionando (amount > limit falha)

---

## 🎉 Próximos Passos

Depois de testar tudo localmente:

### 1. Testar com Backend (Opcional)

```bash
# Novo terminal
cd backend
yarn dev
```

O backend vai:
- Gerar dados de mercado sintéticos (mock mode)
- Processar sinais das estratégias
- Executar trades automaticamente

### 2. Desenvolver Novas Features

- Modificar smart contract: `programs/trading-bot/src/lib.rs`
- Modificar frontend: `frontend/`
- Hot reload automático!

### 3. Iterar Rapidamente

```bash
# Quando quiser começar do zero
yarn localnet:reset
yarn localnet:start
yarn localnet:deploy
```

### 4. Deploy em Devnet (quando pronto)

```bash
# Mudar Anchor.toml
cluster = "devnet"

# Deploy
anchor build
anchor deploy --provider.cluster devnet
```

---

## 📚 Recursos

- **Logs em tempo real:** `solana logs -u localhost`
- **Explorer:** https://explorer.solana.com/?cluster=custom&customUrl=http://127.0.0.1:8899
- **Documentação:** `docs/LOCALNET_TESTING.md`
- **Troubleshooting:** `docs/LOCALNET_TESTING.md#troubleshooting`

---

**🎯 Dica:** Mantenha um terminal aberto com `solana logs -u localhost` para ver tudo que acontece em tempo real!

**💡 Lembre-se:** Tudo é local! Você pode fazer quantos testes quiser, resetar quando precisar, sem custos ou limitações.

---

**Última atualização:** $(date)
