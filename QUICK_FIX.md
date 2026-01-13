# 🔧 Quick Fix - Bot não Inicializa

## O Problema

Os logs mostram:
```
🔧 Step 1/2: Inicializando bot...
[PARA AQUI - não continua]
```

Isso significa que a transação **não está sendo enviada** para a blockchain.

## ✅ Solução Rápida

### **Passo 1: Ver o Erro Completo**

No console do navegador (F12), **role para baixo** após a mensagem:
```
🔧 Step 1/2: Inicializando bot...
```

Deve ter uma mensagem de erro (vermelha) tipo:
- `❌ Erro ao inicializar bot:`
- `TypeError:` 
- `Error:`
- Algum stack trace

**COPIE E ME ENVIE ESSA MENSAGEM!**

---

### **Passo 2: Verificar se Frontend Carregou o IDL**

No console do navegador, cole este comando:
```javascript
console.log('IDL loaded:', typeof window !== 'undefined')
```

Se retornar `false`, o problema é que o IDL não foi carregado.

---

### **Passo 3: Hard Refresh**

Às vezes o Next.js cacheia o IDL antigo:

1. **Ctrl + Shift + R** (ou Cmd + Shift + R no Mac)
2. Ou **Ctrl + F5**
3. Isso força reload sem cache

---

### **Passo 4: Limpar Cache do Next.js**

```bash
cd frontend
rm -rf .next
yarn dev
```

Depois tentar de novo.

---

## 🎯 Checklist Rápido

- [ ] Ver erro completo no console do navegador
- [ ] Fazer hard refresh (Ctrl+Shift+R)
- [ ] Verificar que wallet está conectada
- [ ] Verificar saldo (você disse que tem 99 SOL ✅)
- [ ] Limpar cache do Next.js
- [ ] Reiniciar frontend

---

## 💡 Causas Mais Prováveis

### 1. **Program/Wallet não inicializado**
Se `program` ou `wallet` é `null` no hook, a transação não é criada.

### 2. **IDL desatualizado em cache**
O Next.js pode ter cacheado o IDL antigo.

**Solução:** Hard refresh ou limpar `.next`

### 3. **Erro ao assinar transação**
Phantom pode estar rejeitando silenciosamente.

**Verificar:** Popup do Phantom aparece?

### 4. **Network mismatch**
Frontend conectado em rede diferente do validator.

**Verificar:** 
- Frontend: Localnet
- Phantom: Localnet (http://127.0.0.1:8899)

---

## 🔍 Debug Avançado

Se nada funcionar, adicione logs no OnboardingCard.tsx:

```typescript
// Linha ~48, ANTES de chamar initializeBot
console.log('=== DEBUG ===');
console.log('backendPubkey:', backendPubkey.toBase58());
console.log('amountLamports:', amountLamports.toString());
console.log('slippageBps:', slippageBps);
console.log('wallet:', wallet?.publicKey.toBase58());
console.log('program:', program ? 'LOADED' : 'NULL');
console.log('botConfigPDA:', botConfigPDA?.toBase58());
console.log('=============');
```

E me envie o output!

---

## 🚨 Erro Comum: "Cannot read property 'methods' of null"

**Causa:** `program` está null porque IDL não foi carregado.

**Solução:**
1. Verificar que `frontend/lib/idl.json` existe
2. Verificar que tem o Program ID correto: `q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS`
3. Hard refresh
4. Limpar `.next` e reiniciar

---

**Me envie o erro completo do console e eu resolvo rapidamente! 🚀**
