# 🚀 Guia de Deploy - Trading Bot Solana

Este guia detalha o processo completo de deploy do projeto em devnet e, eventualmente, em mainnet.

## 📋 Checklist Pré-Deploy

Antes de fazer deploy, certifique-se de que:

- [ ] Todas as dependências estão instaladas (Rust, Solana CLI, Anchor)
- [ ] Os testes passam (`anchor test`)
- [ ] Você tem SOL suficiente para deploy (~5 SOL em devnet, ~10 SOL em mainnet)
- [ ] O código foi revisado e auditado (para mainnet)
- [ ] As variáveis de ambiente estão configuradas

## 🧪 Deploy em Devnet

### Passo 1: Configurar Ambiente

```bash
# Definir cluster para devnet
solana config set --url devnet

# Verificar configuração
solana config get

# Criar ou usar keypair existente
solana-keygen new -o ~/.config/solana/devnet-deployer.json

# Definir keypair
solana config set --keypair ~/.config/solana/devnet-deployer.json

# Verificar endereço
solana address
```

### Passo 2: Obter SOL de Teste

```bash
# Solicitar airdrop (pode precisar fazer várias vezes)
solana airdrop 2
solana airdrop 2

# Verificar saldo
solana balance
```

💡 **Dica**: Se o airdrop falhar, use um [Faucet web](https://faucet.solana.com/).

### Passo 3: Build do Programa

```bash
# Na raiz do projeto
anchor build

# Verificar que o build foi bem-sucedido
ls -la target/deploy/
# Você deve ver: trading_bot_smart_contract.so
```

### Passo 4: Atualizar Program ID

```bash
# Obter o Program ID gerado
anchor keys list

# Saída exemplo:
# trading_bot_smart_contract: EJQW7cwHAdd6dLGuwNTYa7P2a5PrRXrkiYcbsyqwFYky
```

Atualize o Program ID em:

1. **`Anchor.toml`**:
```toml
[programs.devnet]
trading_bot_smart_contract = "<SEU_PROGRAM_ID>"
```

2. **`programs/trading-bot-smart-contract/src/lib.rs`**:
```rust
declare_id!("<SEU_PROGRAM_ID>");
```

3. **`app/lib/constants.ts`**:
```typescript
export const PROGRAM_ID = new PublicKey("<SEU_PROGRAM_ID>");
```

### Passo 5: Rebuild com Novo ID

```bash
# Rebuild após atualizar o Program ID
anchor build
```

### Passo 6: Deploy

```bash
# Deploy para devnet
anchor deploy

# Se houver erro de saldo insuficiente, solicite mais SOL
```

**Saída esperada**:
```
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: <sua-keypair>
Deploying program "trading_bot_smart_contract"...
Program Id: EJQW7cwHAdd6dLGuwNTYa7P2a5PrRXrkiYcbsyqwFYky
Deploy success
```

### Passo 7: Verificar Deploy

```bash
# Verificar que o programa está na blockchain
solana program show <PROGRAM_ID>

# Exemplo de saída:
# Program Id: EJQW...
# Owner: BPFLoaderUpgradeab1e...
# ProgramData Address: ...
# Authority: <sua-keypair>
# Last Deployed In Slot: ...
# Data Length: ...
```

### Passo 8: Executar Testes no Devnet

```bash
# Testar com o programa deployado
anchor test --skip-local-validator

# Ou testar instruções específicas
anchor run test
```

## 🌐 Deploy do Frontend (Vercel)

### Passo 1: Preparar Repositório

```bash
# Certifique-se de que tudo está commitado
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

### Passo 2: Configurar Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório
4. Configure o projeto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `app`
   - **Build Command**: `yarn build`
   - **Output Directory**: `.next`

### Passo 3: Configurar Variáveis de Ambiente

No painel Vercel, vá para **Settings → Environment Variables** e adicione:

```
NEXT_PUBLIC_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=<SEU_PROGRAM_ID>
```

### Passo 4: Deploy

Clique em "Deploy" e aguarde o build completar.

### Passo 5: Testar Aplicação

Acesse a URL fornecida pela Vercel e teste:
- [ ] Conexão de carteira funciona
- [ ] Inicialização do bot funciona
- [ ] Interface carrega corretamente
- [ ] Transações são visíveis no Explorer

## 🏭 Deploy em Mainnet (Produção)

⚠️ **ATENÇÃO**: Mainnet é produção real. Siga estas etapas com extremo cuidado.

### Pré-requisitos Obrigatórios

✅ **Auditoria de Segurança**
- Contrate uma firma de auditoria reconhecida (ex: Kudelski, Trail of Bits)
- Corrija todas as vulnerabilidades encontradas
- Publique o relatório de auditoria

✅ **Revisão Legal**
- Consulte advogado especializado em criptoativos
- Verifique enquadramento como VASP (Lei 14.478/2022)
- Implemente KYC/AML se necessário
- Obtenha autorizações regulatórias

✅ **Testes Extensivos**
- Execute todos os testes unitários
- Faça fuzzing testing
- Teste em devnet por pelo menos 2 semanas
- Execute testes de stress

✅ **Backup e Recuperação**
- Tenha múltiplas cópias de todas as keypairs
- Use hardware wallet para upgrade authority
- Configure multisig para autoridade do programa
- Documente processo de recuperação

### Checklist de Segurança Mainnet

- [ ] Smart contract auditado profissionalmente
- [ ] Testes de penetração realizados
- [ ] Documentação completa
- [ ] Sistema de monitoramento configurado
- [ ] Plano de resposta a incidentes
- [ ] Seguro de protocolo (se disponível)
- [ ] Upgrade authority em multisig
- [ ] Circuit breakers implementados (se aplicável)

### Passo 1: Configurar Mainnet

```bash
# CUIDADO: Este é mainnet real!
solana config set --url mainnet-beta

# Use hardware wallet ou keypair segura
solana config set --keypair ~/.config/solana/mainnet-deployer.json

# Verificar configuração
solana config get
```

### Passo 2: Obter SOL Real

Você precisará de ~10-15 SOL para deploy inicial:
- Custo de deploy do programa: ~5-8 SOL
- Buffer para rent e taxas: 2-3 SOL
- Reserve adicional: 5 SOL

⚠️ **Nunca compartilhe suas chaves privadas!**

### Passo 3: Build Final

```bash
# Build com optimizações
anchor build --verifiable

# Verificar tamanho do programa
ls -lh target/deploy/trading_bot_smart_contract.so

# Programa deve ser < 400 KB idealmente
```

### Passo 4: Deploy Mainnet

```bash
# ÚLTIMO CHECKPOINT - Você tem certeza? Isso custa SOL real!
# Deploy para mainnet
anchor deploy --provider.cluster mainnet

# Anote o Program ID e todos os detalhes
```

### Passo 5: Verificar e Testar

```bash
# Verificar programa
solana program show <PROGRAM_ID> --url mainnet-beta

# Teste com valores MUITO PEQUENOS primeiro
# Use uma carteira de teste separada
```

### Passo 6: Configurar Upgrade Authority

```bash
# IMPORTANTE: Mude para multisig imediatamente após testes
solana program set-upgrade-authority <PROGRAM_ID> \
  --new-upgrade-authority <MULTISIG_ADDRESS> \
  --url mainnet-beta
```

### Passo 7: Monitoramento

Configure alertas para:
- Transações falhadas
- Tentativas de exploit
- Uso anormal do programa
- Mudanças no saldo do programa

### Passo 8: Deploy Frontend em Produção

Atualize variáveis de ambiente na Vercel:
```
NEXT_PUBLIC_NETWORK=mainnet-beta
NEXT_PUBLIC_PROGRAM_ID=<MAINNET_PROGRAM_ID>
```

Deploy em produção:
```bash
git push origin main
# Vercel fará deploy automático
```

## 🔄 Atualizações de Programa

### Atualizar Programa Existente

```bash
# Build nova versão
anchor build

# Upgrade (substitui o programa existente)
anchor upgrade target/deploy/trading_bot_smart_contract.so \
  --program-id <PROGRAM_ID> \
  --provider.cluster devnet
```

### Migração de Dados

Se você mudar a estrutura de contas:
```bash
# Crie script de migração
# Execute migração ANTES do upgrade
# Teste extensivamente em devnet
```

## 🆘 Troubleshooting

### Erro: "Insufficient funds"
```bash
# Verifique saldo
solana balance

# Solicite mais SOL (devnet) ou transfira (mainnet)
```

### Erro: "Program deploy failed"
```bash
# Verifique logs detalhados
solana logs | grep <PROGRAM_ID>

# Verifique tamanho do programa
ls -lh target/deploy/*.so

# Programa muito grande? Otimize o código
```

### Erro: "Invalid program ID"
```bash
# Regenere as chaves
anchor keys sync

# Rebuild
anchor build
```

### Erro de Upgrade Authority
```bash
# Verificar autoridade atual
solana program show <PROGRAM_ID>

# Recuperar autoridade (se possível)
# Isso só funciona se você ainda controlar a keypair
```

## 📊 Custos Estimados

### Devnet
- Deploy inicial: **GRÁTIS** (use airdrop)
- Transações: **GRÁTIS**

### Mainnet
- Deploy inicial: **~5-8 SOL** (~$100-160 USD)
- Rent para contas: **~0.002 SOL** por conta
- Transações: **~0.000005 SOL** (~$0.0001 USD)
- Upgrade futuro: **~5-8 SOL** por upgrade

*Preços baseados em SOL = $20 USD (Jan 2026)*

## 🔐 Segurança Pós-Deploy

1. **Monitore constantemente** seu programa
2. **Mantenha backups** de todas as keypairs
3. **Use multisig** para operações críticas
4. **Implemente rate limiting** no frontend
5. **Tenha um plano** de resposta a incidentes
6. **Considere um bug bounty** para mainnet

## 📚 Recursos Adicionais

- [Solana Program Deploy Guide](https://docs.solana.com/cli/deploy-a-program)
- [Anchor Deploy Documentation](https://www.anchor-lang.com/docs/cli)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Solana Security Best Practices](https://github.com/coral-xyz/sealevel-attacks)

---

**Lembre-se**: Em blockchain, não há "desfazer". Deploy com cuidado! 🚀

