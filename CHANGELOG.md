# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Planejado

- Integração completa com Raydium AMM via CPI
- Oráculos de preço (Pyth Network)
- Motor off-chain para indicadores técnicos
- Suporte a múltiplas DEXs
- Sistema de notificações

## [0.1.0] - 2026-01-05

### Adicionado

#### Smart Contract (Anchor/Rust)

- ✨ Estrutura base do programa Anchor
- ✨ Instrução `initialize_bot` para configurar bot do usuário
- ✨ Instrução `execute_swap` com validações de segurança
- ✨ Instrução `update_config` para atualizar parâmetros
- ✨ Struct `TradeBotConfig` com PDAs para isolamento por usuário
- ✨ Validações de ownership e limites
- ✨ Erros customizados (BotNotActive, AmountExceedsLimit, etc.)
- ✨ Suporte para anchor-spl tokens
- 🧪 Testes completos para todas as instruções
- 🧪 Testes de edge cases e validações de segurança

#### Frontend (Next.js)

- ✨ Aplicação Next.js 15 com App Router
- ✨ Integração Solana Wallet Adapter
- ✨ Hook `useProgram` para interação com Anchor
- ✨ Hook `useBotConfig` para monitorar estado do bot
- ✨ Hook `useTrade` para executar operações
- ✨ Componente `WalletConnect` com suporte a Phantom
- ✨ Componente `StatusDisplay` para visualizar estado do bot
- ✨ Componente `TradeForm` para configurar e gerenciar bot
- ✨ Componente `TradeHistory` para histórico de transações
- 🎨 UI moderna com Tailwind CSS
- 🎨 Design responsivo e acessível
- 🎨 Tema dark com gradientes

#### Documentação

- 📚 README.md completo com instruções de uso
- 📚 DEPLOY.md com guia detalhado de deployment
- 📚 SECURITY.md com análise de vulnerabilidades
- 📚 CONTRIBUTING.md com guidelines para contribuidores
- 📚 Comentários inline em todo o código
- 📚 Exemplos de uso e troubleshooting

#### Infraestrutura

- ⚙️ Configuração Anchor.toml
- ⚙️ TypeScript strict mode
- ⚙️ Next.js config com suporte a WebAssembly
- ⚙️ .gitignore apropriado
- ⚙️ Estrutura de diretórios organizada

### Segurança

- 🔒 Validação de ownership em todas as instruções
- 🔒 Uso de PDAs para isolamento de contas
- 🔒 Limites configuráveis por usuário
- 🔒 Validação de saldo antes de operações
- 🔒 Checks de slippage máximo
- 🔒 Proteção contra operações com bot inativo

### Limitações Conhecidas

- ⚠️ Integração Raydium é placeholder (não funcional)
- ⚠️ Sem oráculos de preço
- ⚠️ Sem rate limiting
- ⚠️ Sem proteção MEV
- ⚠️ Apenas devnet (não audited para mainnet)

## [0.0.1] - 2026-01-04

### Adicionado

- 🎉 Inicialização do projeto
- 🎉 Estrutura básica Anchor
- 🎉 Configuração inicial do workspace

---

## Tipos de Mudanças

- ✨ `Adicionado` - para novas funcionalidades
- 🔄 `Modificado` - para mudanças em funcionalidades existentes
- ⚠️ `Descontinuado` - para funcionalidades que serão removidas
- 🗑️ `Removido` - para funcionalidades removidas
- 🐛 `Corrigido` - para correções de bugs
- 🔒 `Segurança` - para vulnerabilidades corrigidas
- 📚 `Documentação` - para mudanças na documentação
- 🧪 `Testes` - para adição/modificação de testes
- ⚙️ `Infraestrutura` - para mudanças de build/CI

---

[Unreleased]: https://github.com/seu-usuario/trading-bot-smart-contract/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/seu-usuario/trading-bot-smart-contract/releases/tag/v0.1.0
[0.0.1]: https://github.com/seu-usuario/trading-bot-smart-contract/releases/tag/v0.0.1
