# ❌ Frontend Precisa de Atualizações

## Problemas Identificados

### 1. IDL Desatualizado ⚠️

O arquivo `/app/lib/idl.json` está usando a versão antiga do contrato:
- ❌ `initialize_bot` não tem o parâmetro `backend_authority`
- ❌ `execute_swap` ainda mostra `owner` como `Signer`
- ❌ Não tem `backend_signer` nas contas
- ❌ Não tem `pool_token_account`

**Solução**: Recompilar o contrato com `anchor build`

### 2. Hook `useTrade.ts` Desatualizado

**Linha 37-44**: O `initializeBot` está faltando o parâmetro `backend_authority`:

```typescript
// ❌ ERRADO - Versão Atual
const tx = await program.methods
  .initializeBot(maxTradeAmount, maxSlippageBps)
  .accounts({...})
  .rpc();

// ✅ CORRETO - Precisa ser assim
const tx = await program.methods
  .initializeBot(
    backendAuthority,    // NOVO!
    maxTradeAmount,
    maxSlippageBps
  )
  .accounts({...})
  .rpc();
```

**Faltando**: Não há função para fazer `approve` dos tokens para a PDA.

### 3. Componente `TradeForm.tsx` Incompleto

**Falta**:
- ✅ Campo para o usuário inserir/ver a `backend_authority`
- ✅ Botão ou fluxo para fazer `approve` dos tokens
- ✅ Feedback visual mostrando se o approve foi feito

## Correções Necessárias

### Ordem de Implementação:

1. **Recompilar o Smart Contract**
2. **Atualizar o IDL no frontend**
3. **Criar função de Approve**
4. **Atualizar hooks e componentes**
5. **Testar o fluxo completo**

---

## Status: 🔴 Frontend NÃO está pronto para usar

