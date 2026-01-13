use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

declare_id!("q5JxCEA2rb3MzxRcGHRp6wqTpWmdMAYaFz9x86b85XS");

#[program]
pub mod trading_bot_smart_contract {
    use super::*;

    /// Inicializa a configuração do bot de trading para um usuário
    pub fn initialize_bot(
        ctx: Context<InitializeBot>,
        backend_authority: Pubkey,
        max_trade_amount: u64,
        max_slippage_bps: u16,
    ) -> Result<()> {
        let bot_config = &mut ctx.accounts.bot_config;
        bot_config.owner = ctx.accounts.owner.key();
        bot_config.backend_authority = backend_authority;
        bot_config.max_trade_amount = max_trade_amount;
        bot_config.max_slippage_bps = max_slippage_bps;
        bot_config.is_active = true;
        bot_config.trades_executed = 0;
        bot_config.bump = ctx.bumps.bot_config;

        msg!(
            "Bot initialized for owner: {}, backend_authority: {}, max_trade_amount: {}, max_slippage: {}bps",
            bot_config.owner,
            backend_authority,
            max_trade_amount,
            max_slippage_bps
        );

        Ok(())
    }

    /// Autoriza e valida um swap antes de executar
    /// 
    /// O swap real é feito usando Raydium SDK no frontend/backend
    /// Este método apenas valida:
    /// - Bot está ativo
    /// - Amount está dentro dos limites
    /// - Backend está autorizado
    /// - Incrementa contador de trades
    pub fn authorize_swap(
        ctx: Context<AuthorizeSwap>,
        amount_in: u64,
        minimum_amount_out: u64,
    ) -> Result<()> {
        let bot_config = &mut ctx.accounts.bot_config;

        // Validações
        require!(bot_config.is_active, TradingBotError::BotNotActive);
        require!(
            amount_in <= bot_config.max_trade_amount,
            TradingBotError::AmountExceedsLimit
        );

        // Incrementar contador
        bot_config.trades_executed = bot_config.trades_executed.checked_add(1).unwrap();

        msg!(
            "Swap Autorizado! Owner: {}, Amount In: {}, Min Out: {}, Trade #{}", 
            ctx.accounts.owner.key(),
            amount_in,
            minimum_amount_out,
            bot_config.trades_executed
        );

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

    /// Fecha a conta do bot e devolve o rent ao owner
    pub fn close_bot(ctx: Context<CloseBot>) -> Result<()> {
        msg!("Fechando bot para owner: {}", ctx.accounts.owner.key());
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
pub struct AuthorizeSwap<'info> {
    #[account(
        mut,
        seeds = [b"bot_config", owner.key().as_ref()],
        bump = bot_config.bump,
        has_one = owner,
        constraint = bot_config.backend_authority == backend_signer.key() @ TradingBotError::UnauthorizedBackend
    )]
    pub bot_config: Account<'info, TradeBotConfig>,
    
    /// CHECK: Apenas para derivar PDA e validação
    pub owner: UncheckedAccount<'info>,
    
    pub backend_signer: Signer<'info>,
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

#[derive(Accounts)]
pub struct CloseBot<'info> {
    #[account(
        mut,
        close = owner,
        seeds = [b"bot_config", owner.key().as_ref()],
        bump = bot_config.bump,
        has_one = owner
    )]
    pub bot_config: Account<'info, TradeBotConfig>,
    
    #[account(mut)]
    pub owner: Signer<'info>,
}

// ============================================================================
// Structs de Dados
// ============================================================================

#[account]
#[derive(InitSpace)]
pub struct TradeBotConfig {
    pub owner: Pubkey,
    pub backend_authority: Pubkey,
    pub max_trade_amount: u64,
    pub max_slippage_bps: u16,
    pub is_active: bool,
    pub trades_executed: u64,
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
    
    #[msg("Backend não autorizado para executar trades")]
    UnauthorizedBackend,
    
    #[msg("Conta de token inválida - não pertence ao owner")]
    InvalidTokenAccount,
    
    #[msg("Slippage tolerance exceeded - received less than minimum output")]
    SlippageExceeded,
    
    #[msg("Raydium CPI call failed")]
    RaydiumCpiFailed,
}
