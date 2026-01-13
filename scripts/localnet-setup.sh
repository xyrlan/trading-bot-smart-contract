#!/bin/bash

# Localnet Setup Script
# Inicia o solana-test-validator com configurações otimizadas

set -e

echo "🚀 Starting Solana Test Validator (Localnet)..."
echo ""

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se solana-test-validator já está rodando
if pgrep -x "solana-test-val" > /dev/null; then
    echo -e "${YELLOW}⚠️  Validator já está rodando!${NC}"
    echo ""
    echo "Para reiniciar, execute:"
    echo "  yarn localnet:reset"
    echo "  yarn localnet:start"
    echo ""
    exit 0
fi

# Diretório para ledger e logs
LEDGER_DIR="./test-ledger"
LOG_FILE="./test-ledger/validator.log"

# Limpar ledger antigo se existir (evita conflitos)
if [ -d "$LEDGER_DIR" ]; then
    echo -e "${YELLOW}⚠️  Removendo ledger antigo...${NC}"
    rm -rf "$LEDGER_DIR"
fi

# Criar diretório novo
mkdir -p "$LEDGER_DIR"

echo "📁 Ledger directory: $LEDGER_DIR"
echo "📝 Log file: $LOG_FILE"
echo ""

# Configurações do validator
SLOTS_PER_EPOCH=432000  # Mais longo para evitar resets frequentes
ACCOUNTS_DB_CACHE=1024  # Cache maior para melhor performance

echo "⚙️  Configurações:"
echo "  - Slots por epoch: $SLOTS_PER_EPOCH"
echo "  - Cache de accounts: ${ACCOUNTS_DB_CACHE}MB"
echo "  - RPC URL: http://127.0.0.1:8899"
echo ""

# Iniciar validator em background
echo "🔄 Iniciando validator..."

# Iniciar validator (log é criado automaticamente em test-ledger/validator.log)
solana-test-validator \
  --ledger "$LEDGER_DIR" \
  --rpc-port 8899 \
  --faucet-port 9900 \
  --slots-per-epoch "$SLOTS_PER_EPOCH" \
  --reset \
  --quiet &

VALIDATOR_PID=$!

# Aguardar validator iniciar
echo "⏳ Aguardando validator iniciar..."
sleep 3

# Verificar se está rodando
if ! pgrep -x "solana-test-val" > /dev/null; then
    echo -e "${RED}❌ Falha ao iniciar validator!${NC}"
    echo ""
    echo "Verifique os logs em: $LOG_FILE"
    exit 1
fi

# Configurar solana CLI para usar localnet
solana config set --url http://127.0.0.1:8899 > /dev/null 2>&1

# Testar conexão
echo "🔍 Testando conexão..."
MAX_RETRIES=10
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if solana cluster-version > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Validator iniciado com sucesso!${NC}"
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo -e "${GREEN}  Localnet está rodando!${NC}"
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo ""
        echo "📡 RPC Endpoint: http://127.0.0.1:8899"
        echo "💰 Faucet: http://127.0.0.1:9900"
        echo "🆔 PID: $VALIDATOR_PID"
        echo ""
        echo "Próximo passo:"
        echo "  yarn localnet:deploy"
        echo ""
        echo "Para parar:"
        echo "  pkill -9 solana-test-val"
        echo "  ou"
        echo "  yarn localnet:reset"
        echo ""
        exit 0
    fi
    
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 1
done

echo -e "${RED}❌ Timeout ao conectar ao validator${NC}"
echo "Verifique os logs em: $LOG_FILE"
exit 1
