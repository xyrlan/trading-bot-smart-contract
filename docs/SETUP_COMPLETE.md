# ✅ Setup Completo - Próximos Passos

## 🎉 O que já está instalado:

- ✅ **Rust** 1.92.0
- ✅ **Cargo** 1.92.0
- ✅ **Solana CLI** 3.0.13
- ✅ **Solana configurado para devnet**
- ✅ **Keypair criada**: `AqXoUhLfE4vciQzqeMhywxHjcUXNuTQkEgjkBBHu5ZHy`
- ⏳ **Anchor CLI** - Instalando em background...

## 📝 Comandos para carregar ambiente:

Sempre execute estes comandos ao abrir um novo terminal:

```bash
# Carregar Rust
source "$HOME/.cargo/env"

# Carregar Solana
export PATH="/home/xyrlan/.local/share/solana/install/active_release/bin:$PATH"

# Ou adicione ao seu ~/.bashrc para carregar automaticamente:
echo 'source "$HOME/.cargo/env"' >> ~/.bashrc
echo 'export PATH="/home/xyrlan/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc
```

## 🚀 Próximos Passos (Após Anchor instalar):

### 1. Verificar Instalações

```bash
rustc --version
cargo --version
solana --version
anchor --version
```

### 2. Obter SOL Devnet

Se o airdrop não funcionar via CLI, use o web faucet:

- **Faucet Web**: https://faucet.solana.com/
- Cole seu endereço: `AqXoUhLfE4vciQzqeMhywxHjcUXNuTQkEgjkBBHu5ZHy`

Ou tente novamente:

```bash
solana airdrop 2
solana balance
```

### 3. Build do Smart Contract

```bash
cd /home/xyrlan/github/trading-bot-smart-contract
anchor build
```

**Saída esperada**: Programa compilado em `target/deploy/trading_bot.so`

### 4. Deploy para Devnet

```bash
anchor deploy
```

**Importante**: Anote o **Program ID** que será exibido!

### 5. Atualizar Program ID no Código

Após o deploy, atualize o Program ID em 3 lugares:

**a) programs/trading-bot/src/lib.rs** (linha 3):

```rust
declare_id!("<SEU_NOVO_PROGRAM_ID>");
```

**b) Anchor.toml** (linha 9):

```toml
[programs.localnet]
trading_bot = "<SEU_NOVO_PROGRAM_ID>"
```

**c) app/lib/constants.ts** (linha 9):

```typescript
export const PROGRAM_ID = new PublicKey("<SEU_NOVO_PROGRAM_ID>");
```

### 6. Rebuild com Novo Program ID

```bash
anchor build
anchor deploy
```

### 7. Copiar IDL para Frontend

```bash
cp target/idl/trading_bot.json app/lib/idl.json
```

### 8. Atualizar Frontend para Usar IDL

Edite `app/app/page.tsx` (linha 8):

```typescript
import idl from "../lib/idl.json";

export default function Home() {
  // Use o IDL importado
  const programIdl = idl;
```

### 9. Executar Testes

```bash
anchor test
```

### 10. Iniciar Frontend

```bash
cd app
yarn dev
```

Acesse: http://localhost:3000

## 🔍 Verificar Status da Instalação do Anchor

```bash
# Ver se ainda está instalando
ps aux | grep cargo

# Verificar quando instalação completar
anchor --version
```

## 🐛 Troubleshooting

### Anchor ainda não instalado?

A instalação pode levar 10-20 minutos. Verifique o progresso:

```bash
# Ver processos cargo
ps aux | grep "cargo install"

# Se precisar recompilar
cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli --locked
```

### Erro "Program ID mismatch"?

Certifique-se de atualizar o Program ID nos 3 lugares após cada deploy.

### Erro "Insufficient funds"?

```bash
# Verifique saldo
solana balance

# Use web faucet
https://faucet.solana.com/
```

### Erro ao build "cannot find -lssl"?

```bash
sudo apt-get install libssl-dev
```

## 📚 Comandos Úteis

```bash
# Ver configuração Solana
solana config get

# Ver endereço da carteira
solana address

# Ver saldo
solana balance

# Ver program deployado
solana program show <PROGRAM_ID>

# Logs em tempo real
solana logs

# Build Anchor
anchor build

# Deploy Anchor
anchor deploy

# Testes Anchor
anchor test

# Limpar build
anchor clean
```

## 🎯 Checklist Rápido

- [ ] Anchor instalado (`anchor --version`)
- [ ] SOL devnet na carteira (`solana balance`)
- [ ] Smart contract compilado (`anchor build`)
- [ ] Smart contract deployado (`anchor deploy`)
- [ ] Program ID atualizado (3 arquivos)
- [ ] Rebuild após atualizar ID
- [ ] IDL copiado para frontend
- [ ] Frontend usando IDL
- [ ] Testes passando (`anchor test`)
- [ ] Frontend rodando (`yarn dev`)

## 🆘 Precisa de Ajuda?

- 📖 **README.md** - Documentação completa
- 🚀 **QUICKSTART.md** - Guia rápido
- 🔧 **COMMANDS.md** - Referência de comandos
- 🐛 **Issues** - Reporte problemas

---

**Quando o Anchor terminar de instalar, volte aqui e siga os passos 1-10!** 🚀
