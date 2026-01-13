#!/bin/bash

# Raydium CPMM Localnet Setup
# Clona programa Raydium CPMM do mainnet para localnet

set -e

echo "🌊 Setting up Raydium CPMM on Localnet..."
echo ""

# Cores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# Program IDs
RAYDIUM_CPMM_PROGRAM="CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C"
RAYDIUM_CPMM_LEGACY="675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8"

echo -e "${BLUE}📋 Raydium Programs:${NC}"
echo "  CPMM Program: $RAYDIUM_CPMM_PROGRAM"
echo "  Legacy Program: $RAYDIUM_CPMM_LEGACY"
echo ""

# Verificar se validator está rodando
echo "🔍 Verificando validator..."
if ! solana cluster-version &> /dev/null; then
    echo -e "${RED}❌ Validator não está rodando!${NC}"
    echo ""
    echo "Execute primeiro: yarn localnet:start"
    exit 1
fi

echo -e "${GREEN}✓ Validator rodando${NC}"
echo ""

# Parar validator atual
echo "⏸️  Parando validator para adicionar clones..."
pkill -9 solana-test-val || true
sleep 2

# Diretório para ledger
LEDGER_DIR="./test-ledger"

echo "🚀 Reiniciando validator com Raydium clonado..."
echo ""

# Iniciar validator com programas clonados
solana-test-validator \
  --ledger "$LEDGER_DIR" \
  --rpc-port 8899 \
  --faucet-port 9900 \
  --slots-per-epoch 432000 \
  --clone "$RAYDIUM_CPMM_PROGRAM" \
  --clone "$RAYDIUM_CPMM_LEGACY" \
  --url mainnet-beta \
  --quiet \
  > /dev/null 2>&1 &

VALIDATOR_PID=$!

echo "⏳ Aguardando validator iniciar com programas clonados..."
sleep 5

# Verificar se está rodando
if ! pgrep -x "solana-test-val" > /dev/null; then
    echo -e "${RED}❌ Falha ao iniciar validator!${NC}"
    exit 1
fi

# Aguardar conexão
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if solana cluster-version > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Validator reiniciado com Raydium!${NC}"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo -e "${GREEN}  Raydium CPMM disponível no localnet!${NC}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📦 Programas clonados:"
        echo "  - Raydium CPMM: $RAYDIUM_CPMM_PROGRAM"
        echo "  - Raydium Legacy: $RAYDIUM_CPMM_LEGACY"
        echo ""
        echo "Próximo passo:"
        echo "  yarn localnet:deploy"
        echo ""
        exit 0
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 1
done

echo -e "${RED}❌ Timeout ao conectar ao validator${NC}"
exit 1
