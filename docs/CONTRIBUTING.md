# 🤝 Guia de Contribuição

Obrigado por considerar contribuir para o Trading Bot Solana! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Código de Conduta

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros membros

## 🚀 Como Contribuir

### Reportar Bugs

1. Verifique se o bug já foi reportado nas [Issues](../../issues)
2. Se não, abra uma nova issue com:
   - Título descritivo
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)
   - Ambiente (OS, versões, etc.)

### Sugerir Melhorias

1. Abra uma issue com tag `enhancement`
2. Descreva:
   - Problema que resolve
   - Solução proposta
   - Alternativas consideradas
   - Impacto no projeto

### Pull Requests

#### Antes de Começar

1. **Fork** o repositório
2. **Clone** seu fork
3. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```

#### Durante o Desenvolvimento

1. **Siga o style guide** (veja abaixo)
2. **Escreva testes** para novas funcionalidades
3. **Atualize documentação** se necessário
4. **Commit com mensagens claras**:

   ```
   feat: adiciona validação de slippage dinâmica

   - Implementa cálculo de slippage baseado em liquidez
   - Adiciona testes unitários
   - Atualiza documentação
   ```

#### Submeter PR

1. **Push** para seu fork:
   ```bash
   git push origin feature/MinhaFeature
   ```
2. Abra **Pull Request** para branch `main`
3. Preencha o template do PR
4. Aguarde review

## 📝 Style Guide

### Rust/Anchor

```rust
// Use nomes descritivos
pub fn execute_swap(
    ctx: Context<ExecuteSwap>,
    amount_in: u64,
    minimum_amount_out: u64,
) -> Result<()> {
    // Documentação clara
    // Validações primeiro
    require!(
        ctx.accounts.bot_config.is_active,
        TradingBotError::BotNotActive
    );

    // Lógica bem estruturada
    msg!("Executing swap...");

    Ok(())
}

// Sempre documente structs públicas
/// Configuração do bot de trading
#[account]
pub struct TradeBotConfig {
    /// Dono do bot
    pub owner: Pubkey,
    // ...
}
```

### TypeScript/React

```typescript
// Use TypeScript strict mode
// Componentes funcionais com hooks

export const MeuComponente: FC<Props> = ({ prop1, prop2 }) => {
  // Hooks no topo
  const [state, setState] = useState<Type>();

  // Funções de handler
  const handleClick = useCallback(() => {
    // lógica
  }, [deps]);

  // Render
  return <div className="container">{/* JSX limpo e semântico */}</div>;
};
```

### Commits Semânticos

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração de código
test: testes
chore: tarefas de manutenção
perf: melhorias de performance
ci: configuração de CI/CD
```

Exemplos:

```
feat(smart-contract): adiciona suporte a múltiplos tokens
fix(frontend): corrige bug na conexão de carteira
docs(readme): atualiza instruções de instalação
test(anchor): adiciona testes para update_config
```

## 🧪 Testes

### Executar Testes

```bash
# Smart contract
anchor test

# Frontend
cd app && yarn test
```

### Escrever Testes

Sempre adicione testes para:

- Novas funcionalidades
- Correções de bugs
- Edge cases

Exemplo (Anchor):

```typescript
it("Deve falhar ao executar swap com bot inativo", async () => {
  // Setup
  await program.methods.updateConfig(null, null, false)
    .accounts({ ... })
    .rpc();

  // Act & Assert
  try {
    await program.methods.executeSwap(amount, minAmount)
      .accounts({ ... })
      .rpc();
    assert.fail("Deveria ter falhado");
  } catch (error) {
    assert.ok(error.toString().includes("BotNotActive"));
  }
});
```

## 📚 Documentação

### Onde Documentar

- **README.md**: Visão geral e quick start
- **DEPLOY.md**: Instruções de deploy
- **SECURITY.md**: Considerações de segurança
- **Código**: Docstrings e comentários inline
- **Wiki**: Guias detalhados (se aplicável)

### Como Documentar

````rust
/// Executa um swap de tokens através da DEX
///
/// # Arguments
///
/// * `ctx` - Contexto com contas necessárias
/// * `amount_in` - Quantidade de tokens de entrada
/// * `minimum_amount_out` - Quantidade mínima aceitável de saída
///
/// # Errors
///
/// * `BotNotActive` - Se o bot estiver desativado
/// * `AmountExceedsLimit` - Se amount_in > max_trade_amount
///
/// # Examples
///
/// ```ignore
/// execute_swap(ctx, 1_000_000, 950_000)?;
/// ```
pub fn execute_swap(
    ctx: Context<ExecuteSwap>,
    amount_in: u64,
    minimum_amount_out: u64,
) -> Result<()> {
    // ...
}
````

## 🔍 Code Review

### Como Revisor

- Seja construtivo e educado
- Foque no código, não na pessoa
- Explique o "porquê" das sugestões
- Aprove se está tudo ok

### Como Autor

- Não leve para o pessoal
- Faça perguntas se não entender
- Agradeça feedback
- Itere com base no review

## 🎯 Áreas para Contribuir

### Prioridade Alta

- [ ] Implementar integração completa com Raydium
- [ ] Adicionar oráculos de preço (Pyth/Switchboard)
- [ ] Implementar motor off-chain para indicadores
- [ ] Melhorar testes de segurança

### Prioridade Média

- [ ] Adicionar mais indicadores técnicos
- [ ] Dashboard de analytics
- [ ] Sistema de notificações
- [ ] Multi-DEX support

### Prioridade Baixa

- [ ] Melhorias de UI/UX
- [ ] Temas customizáveis
- [ ] Internacionalização (i18n)
- [ ] Mobile responsiveness

## 🏆 Reconhecimento

Contribuidores serão listados em:

- README.md (seção Contributors)
- CHANGELOG.md
- Releases notes

Contribuições significativas podem resultar em:

- Acesso como maintainer
- Menção em redes sociais
- Recompensas (se bug bounty ativo)

## ❓ Dúvidas

Se tiver dúvidas:

1. Verifique a [documentação](README.md)
2. Busque nas [issues fechadas](../../issues?q=is%3Aissue+is%3Aclosed)
3. Pergunte nas [discussions](../../discussions)
4. Entre em contato com maintainers

## 📞 Contato

- GitHub Issues: [Issues](../../issues)
- GitHub Discussions: [Discussions](../../discussions)
- Discord: [Link do Discord] (se aplicável)

---

**Obrigado por contribuir! 🚀**
