# 🔍 Debug Checklist - Erro ao Inicializar Bot

## Passos para Debugar

### 1. Verificar Logs do Solana (MUITO IMPORTANTE!)

**Abrir um terminal e rodar:**
```bash
solana logs -u localhost
```

Deixe esse terminal aberto e tente inicializar o bot novamente no navegador.

**O que procurar nos logs:**
- `Program log:` - Mensagens do seu programa
- `Program <ID> failed:` - Erro específico
- Qualquer mensagem de erro vermelha

---

### 2. Verificar Console do Navegador

**No navegador (Chrome/Firefox):**
1. Pressionar `F12` ou `Ctrl+Shift+I`
2. Ir para aba **Console**
3. Tentar inicializar o bot
4. **Copiar toda a mensagem de erro** que aparecer

**Procurar por:**
- `❌ Erro ao inicializar bot:`
- `failed to send transaction:`
- `Error:`
- Qualquer stack trace

---

### 3. Verificar Program ID

```bash
# No terminal, rodar:
solana program show q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS -u localhost
```

**Deve retornar:**
```
Program Id: q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS
Owner: BPFLoaderUpgradeab1e11111111111111111111111
...
```

Se der erro "not found", o programa não está deployed!

---

### 4. Verificar Wallet Conectada

**No frontend:**
- Wallet está conectada? (verificar canto superior direito)
- Está na rede "Localnet"?
- Tem saldo de SOL? (precisa de pelo menos 0.01 SOL)

**Verificar saldo:**
```bash
solana balance <SEU_WALLET_ADDRESS> -u localhost
```

---

### 5. Verificar se Bot Já Existe

Cada wallet só pode ter UM bot config. Se já existe, não pode inicializar de novo.

**Verificar:**
```bash
# Calcular o PDA (use seu wallet address)
# O PDA é derivado de: seeds = ["bot_config", wallet_pubkey]
```

**Se o bot já existir:**
- Você verá erro: "Bot já inicializado!"
- Solução: Use a seção de "Settings" para atualizar configurações
- OU feche o bot existente e crie novo

---

### 6. Verificar IDL Carregado

**No console do navegador, rodar:**
```javascript
// Verificar se IDL foi carregado
console.log('IDL loaded:', typeof idl !== 'undefined')
```

---

## 🔧 Soluções Comuns

### Erro: "Wallet não conectado"
**Solução:**
1. Conectar wallet no canto superior direito
2. Aprovar conexão no Phantom
3. Tentar novamente

### Erro: "Program not found"
**Solução:**
```bash
cd /home/xyrlan/github/trading-bot-smart-contract
anchor build
anchor deploy
```

### Erro: "Bot já inicializado"
**Solução:**
- O bot já existe para esta wallet
- Não precisa inicializar de novo
- Vá direto para criar estratégias ou executar trades

### Erro: "Insufficient funds"
**Solução:**
```bash
# Airdrop mais SOL
solana airdrop 10 <YOUR_WALLET> -u localhost
```

### Erro: "Transaction simulation failed"
**Causas comuns:**
1. **Saldo insuficiente** → Fazer airdrop
2. **Program ID errado** → Verificar IDL
3. **Conta já existe** → Bot já inicializado
4. **Validator offline** → Verificar `solana cluster-version`

---

## 📝 Template para Reportar Erro

**Por favor, forneça:**

1. **Mensagem do Console do Navegador:**
   ```
   [Cole aqui o erro completo do console]
   ```

2. **Logs do Solana:**
   ```
   [Cole aqui os logs de: solana logs -u localhost]
   ```

3. **Wallet Address:**
   ```
   [Seu endereço de wallet]
   ```

4. **Já tentou inicializar antes?**
   - [ ] Sim
   - [ ] Não
   - [ ] Não sei

---

## 🎯 Como Obter os Logs

### Logs do Solana (Terminal)
```bash
# Rodar em um terminal separado
solana logs -u localhost

# Depois tentar inicializar bot no navegador
# Copiar tudo que aparecer no terminal
```

### Logs do Navegador (Console)
```
1. Abrir DevTools (F12)
2. Aba Console
3. Tentar inicializar bot
4. Clicar com botão direito na mensagem de erro
5. "Save as..." ou copiar tudo
```

---

## ⚡ Quick Debug Commands

```bash
# 1. Validator rodando?
solana cluster-version

# 2. Programa deployed?
solana program show q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS -u localhost

# 3. Saldo da wallet?
solana balance D2fcw8TZ9SDrv41k69sfRywE8dTTmu7YSELmieas9Nsp -u localhost

# 4. Ver todas as contas do programa?
solana program dump q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS dump.bin -u localhost

# 5. Ver logs em tempo real
solana logs -u localhost
```

---

**🚨 IMPORTANTE:** O erro mais comum é tentar inicializar quando o bot já existe!

**Como verificar:**
- Se você já clicou em "Initialize Bot" antes e deu sucesso
- O bot JÁ EXISTE e não precisa inicializar de novo
- Neste caso, o dashboard deve mostrar suas configurações ao invés do OnboardingCard

---

**Próximo passo:** Me envie os logs do Solana OU a mensagem do console do navegador!
