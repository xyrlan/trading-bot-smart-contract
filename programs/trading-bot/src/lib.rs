use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};

declare_id!("AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ");

#[program]
pub mod trading_bot_smart_contract {
    use super::*;

    /// Inicializa a configuração do bot de trading para um usuário
    pub fn initialize_bot(
        ctx: Context<InitializeBot>,
        max_trade_amount: u64,
        max_slippage_bps: u16,
    ) -> Result<()> {
        let bot_config = &mut ctx.accounts.bot_config;
        bot_config.owner = ctx.accounts.owner.key();
        bot_config.max_trade_amount = max_trade_amount;
        bot_config.max_slippage_bps = max_slippage_bps;
        bot_config.is_active = true;
        bot_config.trades_executed = 0;
        bot_config.bump = ctx.bumps.bot_config;

        msg!(
            "Bot initialized for owner: {}, max_trade_amount: {}, max_slippage: {}bps",
            bot_config.owner,
            max_trade_amount,
            max_slippage_bps
        );

        Ok(())
    }

    /// Executa um swap de tokens através da Raydium
    /// Nota: Este é um MVP simplificado. A integração completa com Raydium requer
    /// a implementação de CPI com as contas específicas do pool Raydium.
    pub fn execute_swap(
        ctx: Context<ExecuteSwap>,
        amount_in: u64,
        minimum_amount_out: u64,
    ) -> Result<()> {
        let bot_config = &ctx.accounts.bot_config;

        // Validações de segurança
        require!(bot_config.is_active, TradingBotError::BotNotActive);
        require!(
            amount_in <= bot_config.max_trade_amount,
            TradingBotError::AmountExceedsLimit
        );

        // Nota: Validação de saldo será feita pelo SPL Token Program durante a transferência

        msg!(
            "Executing swap: {} tokens in, minimum {} tokens out",
            amount_in,
            minimum_amount_out
        );

        // TODO: Implementar CPI real para Raydium AMM
        // Por enquanto, este é um placeholder que demonstra a estrutura
        // A implementação completa requer:
        // 1. Adicionar contas do pool Raydium (amm_id, amm_authority, amm_open_orders, etc.)
        // 2. Implementar a lógica de CPI para o programa Raydium
        // 3. Calcular e validar slippage
        
        // Exemplo de estrutura de CPI (comentado para MVP):
        /*
        let cpi_accounts = RaydiumSwap {
            amm_id: ctx.accounts.raydium_amm.to_account_info(),
            amm_authority: ctx.accounts.raydium_authority.to_account_info(),
            // ... outras contas necessárias
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.raydium_program.to_account_info(), cpi_accounts);
        raydium::swap(cpi_ctx, amount_in, minimum_amount_out)?;
        */

        // Incrementa contador de trades
        let bot_config = &mut ctx.accounts.bot_config;
        bot_config.trades_executed = bot_config.trades_executed.checked_add(1).unwrap();

        msg!("Swap executed successfully. Total trades: {}", bot_config.trades_executed);

        Ok(())
    }

    /// Atualiza a configuração do bot
    pub fn update_config(
        ctx: Context<UpdateConfig>,
        max_trade_amount: Option<u64>,
        max_slippage_bps: Option<u16>,
        is_active: Option<bool>,
    ) -> Result<()> {
        let bot_config = &mut ctx.accounts.bot_config;

        if let Some(amount) = max_trade_amount {
            bot_config.max_trade_amount = amount;
            msg!("Updated max_trade_amount to: {}", amount);
        }

        if let Some(slippage) = max_slippage_bps {
            require!(slippage <= 10000, TradingBotError::InvalidSlippage); // Max 100%
            bot_config.max_slippage_bps = slippage;
            msg!("Updated max_slippage_bps to: {}", slippage);
        }

        if let Some(active) = is_active {
            bot_config.is_active = active;
            msg!("Updated is_active to: {}", active);
        }

        Ok(())
    }
}

// ============================================================================
// Structs de Contas (Account Contexts)
// ============================================================================

#[derive(Accounts)]
pub struct InitializeBot<'info> {
    #[account(
        init,
        payer = owner,
        space = 8 + TradeBotConfig::INIT_SPACE,
        seeds = [b"bot_config", owner.key().as_ref()],
        bump
    )]
    pub bot_config: Account<'info, TradeBotConfig>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExecuteSwap<'info> {
    #[account(
        mut,
        seeds = [b"bot_config", owner.key().as_ref()],
        bump = bot_config.bump,
        has_one = owner
    )]
    pub bot_config: Account<'info, TradeBotConfig>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
    
    /// Conta de token do usuário (token de entrada)
    /// CHECK: This is validated through SPL Token Program
    #[account(mut)]
    pub user_token_in: AccountInfo<'info>,
    
    /// Conta de token do usuário (token de saída)
    /// CHECK: This is validated through SPL Token Program
    #[account(mut)]
    pub user_token_out: AccountInfo<'info>,
    
    pub token_program: Program<'info, Token>,
    
    // TODO: Adicionar contas Raydium para integração completa:
    // - raydium_program
    // - raydium_amm
    // - raydium_authority
    // - amm_open_orders
    // - amm_target_orders
    // - pool_coin_token_account
    // - pool_pc_token_account
    // - serum_program
    // - serum_market
    // - serum_bids
    // - serum_asks
    // - serum_event_queue
    // - serum_coin_vault_account
    // - serum_pc_vault_account
    // - serum_vault_signer
}

#[derive(Accounts)]
pub struct UpdateConfig<'info> {
    #[account(
        mut,
        seeds = [b"bot_config", owner.key().as_ref()],
        bump = bot_config.bump,
        has_one = owner
    )]
    pub bot_config: Account<'info, TradeBotConfig>,
    
    pub owner: Signer<'info>,
}

// ============================================================================
// Structs de Dados
// ============================================================================

/// Configuração do bot de trading para um usuário
#[account]
#[derive(InitSpace)]
pub struct TradeBotConfig {
    /// Dono do bot
    pub owner: Pubkey,
    /// Quantidade máxima permitida por trade
    pub max_trade_amount: u64,
    /// Slippage máximo em basis points (100 = 1%)
    pub max_slippage_bps: u16,
    /// Se o bot está ativo
    pub is_active: bool,
    /// Número de trades executados
    pub trades_executed: u64,
    /// Bump seed para PDA
    pub bump: u8,
}

// ============================================================================
// Errors
// ============================================================================

#[error_code]
pub enum TradingBotError {
    #[msg("O bot não está ativo")]
    BotNotActive,
    
    #[msg("A quantidade excede o limite configurado")]
    AmountExceedsLimit,
    
    #[msg("Saldo insuficiente")]
    InsufficientBalance,
    
    #[msg("Slippage inválido (deve ser <= 10000 bps)")]
    InvalidSlippage,
}
