#!/bin/bash

# Localnet Reset Script
# Para o validator e limpa todos os dados

set -e

echo "🛑 Resetting Localnet..."
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1. Parar validator
echo "1️⃣  Parando validator..."
if pgrep -x "solana-test-val" > /dev/null; then
    pkill -9 solana-test-val || true
    sleep 2
    echo -e "${GREEN}   ✓ Validator parado${NC}"
else
    echo -e "${YELLOW}   ⚠️  Validator não estava rodando${NC}"
fi

# 2. Limpar ledger
echo "2️⃣  Limpando ledger..."
if [ -d "./test-ledger" ]; then
    rm -rf ./test-ledger
    echo -e "${GREEN}   ✓ Ledger removido${NC}"
else
    echo -e "${YELLOW}   ⚠️  Ledger não encontrado${NC}"
fi

# 3. Limpar target/deploy (cache de deploy do Anchor)
echo "3️⃣  Limpando cache de deploy..."
if [ -d "./target/deploy" ]; then
    rm -rf ./target/deploy
    echo -e "${GREEN}   ✓ Cache de deploy limpo${NC}"
else
    echo -e "${YELLOW}   ⚠️  Cache não encontrado${NC}"
fi

# 4. Limpar configurações geradas
echo "4️⃣  Limpando configurações geradas..."
if [ -f "./localnet-config.json" ]; then
    rm -f ./localnet-config.json
    echo -e "${GREEN}   ✓ Configurações removidas${NC}"
else
    echo -e "${YELLOW}   ⚠️  Arquivo de config não encontrado${NC}"
fi

echo ""
echo -e "${GREEN}✅ Reset completo!${NC}"
echo ""
echo "Para reiniciar o localnet:"
echo "  yarn localnet:start"
echo "  yarn localnet:deploy"
echo ""
