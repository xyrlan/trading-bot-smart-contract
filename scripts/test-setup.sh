#!/bin/bash

# Test Setup Script
# Verifica se o ambiente localnet está configurado corretamente

set -e

echo "🧪 Testing Localnet Setup..."
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ERRORS=0

# Test 1: Verificar se validator está rodando
echo -n "1️⃣  Validator running... "
if solana cluster-version &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Run: yarn localnet:start"
    ERRORS=$((ERRORS + 1))
fi

# Test 2: Verificar se scripts existem
echo -n "2️⃣  Scripts created... "
if [ -f "scripts/localnet-setup.sh" ] && [ -f "scripts/localnet-deploy.cjs" ] && [ -f "scripts/localnet-reset.sh" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test 3: Verificar se scripts são executáveis
echo -n "3️⃣  Scripts executable... "
if [ -x "scripts/localnet-setup.sh" ] && [ -x "scripts/localnet-reset.sh" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    echo "   Run: chmod +x scripts/*.sh"
    ERRORS=$((ERRORS + 1))
fi

# Test 4: Verificar Anchor.toml
echo -n "4️⃣  Anchor.toml configured... "
if grep -q "cluster = \"localnet\"" Anchor.toml; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test 5: Verificar package.json scripts
echo -n "5️⃣  Package.json scripts... "
if grep -q "localnet:start" package.json; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test 6: Verificar documentação
echo -n "6️⃣  Documentation created... "
if [ -f "docs/LOCALNET_TESTING.md" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${RED}✗${NC}"
    ERRORS=$((ERRORS + 1))
fi

# Test 7: Verificar se programa foi deployed
echo -n "7️⃣  Program deployed... "
PROGRAM_ID="6Bo9tLqXg1SdDyDG6ZFV39NF32GRYEw1aPaE66nTrUH1"
if solana program show $PROGRAM_ID -u localhost &> /dev/null; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}  (Run: yarn localnet:deploy)"
fi

# Test 8: Verificar config gerado
echo -n "8️⃣  Config file exists... "
if [ -f "localnet-config.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}  (Run: yarn localnet:deploy)"
fi

# Test 9: Verificar wallets de teste
echo -n "9️⃣  Test wallets created... "
if [ -d "test-wallets" ] && [ -f "test-wallets/user-wallet.json" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}  (Run: yarn localnet:deploy)"
fi

# Test 10: Verificar .env.local files
echo -n "🔟  .env.local files... "
if [ -f "frontend/.env.local" ] && [ -f "backend/.env.local" ]; then
    echo -e "${GREEN}✓${NC}"
else
    echo -e "${YELLOW}⚠${NC}  (Run: yarn localnet:deploy)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Setup completo! Tudo funcionando.${NC}"
    echo ""
    echo "Próximos passos:"
    echo "  1. cd frontend && yarn dev"
    echo "  2. Abrir http://localhost:3000"
    echo "  3. Conectar wallet (importar test-wallets/user-wallet.json)"
else
    echo -e "${RED}❌ $ERRORS erro(s) encontrado(s)${NC}"
    echo ""
    echo "Execute:"
    echo "  yarn localnet:start"
    echo "  yarn localnet:deploy"
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

exit $ERRORS
