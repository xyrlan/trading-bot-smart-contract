#!/bin/bash

# Script de setup para o Trading Bot Solana
# Execute: chmod +x scripts/setup.sh && ./scripts/setup.sh

set -e

echo "🤖 Trading Bot Solana - Setup Script"
echo "===================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Funções de utilidade
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "ℹ $1"
}

# Verificar se comando existe
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# 1. Verificar pré-requisitos
echo "📋 Verificando pré-requisitos..."
echo ""

# Node.js
if command_exists node; then
    NODE_VERSION=$(node --version)
    print_success "Node.js instalado: $NODE_VERSION"
else
    print_error "Node.js não encontrado"
    print_info "Instale Node.js 18+ de https://nodejs.org/"
    exit 1
fi

# Yarn
if command_exists yarn; then
    YARN_VERSION=$(yarn --version)
    print_success "Yarn instalado: $YARN_VERSION"
else
    print_warning "Yarn não encontrado. Tentando instalar..."
    npm install -g yarn
fi

# Rust
if command_exists rustc; then
    RUST_VERSION=$(rustc --version)
    print_success "Rust instalado: $RUST_VERSION"
else
    print_warning "Rust não encontrado"
    print_info "Recomendo instalar com: curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
fi

# Solana CLI
if command_exists solana; then
    SOLANA_VERSION=$(solana --version)
    print_success "Solana CLI instalado: $SOLANA_VERSION"
else
    print_warning "Solana CLI não encontrado"
    print_info "Instale com: sh -c \"\$(curl -sSfL https://release.solana.com/stable/install)\""
fi

# Anchor
if command_exists anchor; then
    ANCHOR_VERSION=$(anchor --version)
    print_success "Anchor instalado: $ANCHOR_VERSION"
else
    print_warning "Anchor não encontrado"
    print_info "Instale com: cargo install --git https://github.com/coral-xyz/anchor --tag v0.31.1 anchor-cli"
fi

echo ""
echo "🔧 Configurando projeto..."
echo ""

# 2. Configurar Solana para devnet
if command_exists solana; then
    print_info "Configurando Solana para devnet..."
    solana config set --url devnet
    print_success "Solana configurado para devnet"
    
    # Verificar keypair
    if [ -f ~/.config/solana/id.json ]; then
        print_success "Keypair encontrada"
        WALLET_ADDRESS=$(solana address)
        print_info "Endereço da carteira: $WALLET_ADDRESS"
        
        # Verificar saldo
        BALANCE=$(solana balance)
        print_info "Saldo atual: $BALANCE"
        
        if [[ "$BALANCE" == "0 SOL" ]]; then
            print_warning "Saldo zero. Solicitando airdrop..."
            solana airdrop 2 || print_warning "Airdrop falhou. Tente manualmente: solana airdrop 2"
        fi
    else
        print_warning "Keypair não encontrada"
        print_info "Crie uma nova com: solana-keygen new"
    fi
else
    print_warning "Pulando configuração Solana (CLI não instalado)"
fi

echo ""

# 3. Instalar dependências do projeto raiz
print_info "Instalando dependências do projeto raiz..."
if [ -f "package.json" ]; then
    yarn install
    print_success "Dependências raiz instaladas"
else
    print_warning "package.json não encontrado na raiz"
fi

# 4. Instalar dependências do frontend
print_info "Instalando dependências do frontend..."
if [ -d "app" ]; then
    cd app
    yarn install
    print_success "Dependências do frontend instaladas"
    
    # Criar .env.local se não existir
    if [ ! -f ".env.local" ]; then
        print_info "Criando .env.local..."
        cat > .env.local << EOF
# Rede Solana
NEXT_PUBLIC_NETWORK=devnet

# Program ID (atualizar após deploy)
NEXT_PUBLIC_PROGRAM_ID=AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ
EOF
        print_success ".env.local criado"
    else
        print_success ".env.local já existe"
    fi
    
    cd ..
else
    print_error "Diretório app/ não encontrado"
fi

echo ""
echo "🏗️  Build do projeto..."
echo ""

# 5. Build do smart contract (se Anchor instalado)
if command_exists anchor; then
    print_info "Building smart contract..."
    anchor build && print_success "Smart contract compilado" || print_error "Erro ao compilar smart contract"
else
    print_warning "Anchor não instalado. Pulando build do smart contract"
fi

echo ""
echo "✅ Setup concluído!"
echo ""
echo "📖 Próximos passos:"
echo ""
echo "1. Se ainda não fez, obtenha SOL devnet:"
echo "   $ solana airdrop 2"
echo ""
echo "2. Deploy do smart contract:"
echo "   $ anchor deploy"
echo ""
echo "3. Copie o IDL para o frontend:"
echo "   $ cp target/idl/trading_bot_smart_contract.json app/lib/idl.json"
echo ""
echo "4. Inicie o frontend:"
echo "   $ cd app && yarn dev"
echo ""
echo "5. Acesse http://localhost:3000"
echo ""
echo "📚 Documentação completa: README.md"
echo ""

