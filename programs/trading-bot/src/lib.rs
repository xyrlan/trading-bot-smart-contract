use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use anchor_lang::solana_program::{
    instruction::{AccountMeta, Instruction},
    program::invoke_signed,
};

declare_id!("AFrpU4WsWTUSAxuHT9WJp5fx5pVwgtXxgng9XAtNSBmZ");

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

    /// Executa um swap de tokens através da Raydium v4
    /// 
    /// IMPORTANTE: O usuário deve ter feito um `approve` prévio autorizando
    /// a PDA (bot_config) a gastar seus tokens antes de usar esta função.
    /// 
    /// Fluxo:
    /// 1. Frontend: Usuário chama spl_token::approve autorizando a PDA
    /// 2. Backend: Monitora mercado e chama execute_swap quando necessário
    /// 3. A PDA assina o swap usando seeds (não precisa do usuário)
    pub fn execute_swap(
        ctx: Context<ExecuteSwap>,
        amount_in: u64,
        minimum_amount_out: u64,
    ) -> Result<()> {
        let bot_config = &ctx.accounts.bot_config;

        // 1. Validações Básicas
        require!(bot_config.is_active, TradingBotError::BotNotActive);
        require!(
            amount_in <= bot_config.max_trade_amount,
            TradingBotError::AmountExceedsLimit
        );

        msg!(
            "Swap Iniciado. In: {}, Min Out: {}",
            amount_in,
            minimum_amount_out
        );

        // 2. Preparar Seeds para Assinatura da PDA
        let owner_key = ctx.accounts.owner.key();
        let bump = bot_config.bump;
        let seeds = &[
            b"bot_config",
            owner_key.as_ref(),
            &[bump],
        ];
        let signer_seeds = &[&seeds[..]];

        // 3. Construir Data da Instrução (Raydium Swap Instruction)
        // Discriminator 9 = Swap
        let mut instruction_data = Vec::with_capacity(17);
        instruction_data.push(9u8); 
        instruction_data.extend_from_slice(&amount_in.to_le_bytes());
        instruction_data.extend_from_slice(&minimum_amount_out.to_le_bytes());

        // 4. Definir Contas (AccountMetas)
        // A ordem aqui é CRÍTICA. Deve bater exatamente com o que o Raydium espera.
        let accounts = vec![
            // 1. Token Program
            AccountMeta::new_readonly(ctx.accounts.token_program.key(), false),
            // 2. AMM Id
            AccountMeta::new(ctx.accounts.raydium_amm.key(), false),
            // 3. AMM Authority
            AccountMeta::new_readonly(ctx.accounts.raydium_amm_authority.key(), false),
            // 4. AMM Open Orders
            AccountMeta::new(ctx.accounts.raydium_amm_open_orders.key(), false),
            // 5. AMM Target Orders
            AccountMeta::new(ctx.accounts.raydium_amm_target_orders.key(), false),
            // 6. Pool Coin Vault
            AccountMeta::new(ctx.accounts.raydium_pool_coin_token_account.key(), false),
            // 7. Pool PC Vault
            AccountMeta::new(ctx.accounts.raydium_pool_pc_token_account.key(), false),
            // 8. Serum Program ID
            AccountMeta::new_readonly(ctx.accounts.serum_program.key(), false),
            // 9. Serum Market
            AccountMeta::new(ctx.accounts.serum_market.key(), false),
            // 10. Serum Bids
            AccountMeta::new(ctx.accounts.serum_bids.key(), false),
            // 11. Serum Asks
            AccountMeta::new(ctx.accounts.serum_asks.key(), false),
            // 12. Serum Event Queue
            AccountMeta::new(ctx.accounts.serum_event_queue.key(), false),
            // 13. Serum Coin Vault
            AccountMeta::new(ctx.accounts.serum_coin_vault_account.key(), false),
            // 14. Serum PC Vault
            AccountMeta::new(ctx.accounts.serum_pc_vault_account.key(), false),
            // 15. Serum Vault Signer
            AccountMeta::new_readonly(ctx.accounts.serum_vault_signer.key(), false),
            // 16. User Source Token (De onde sai o dinheiro)
            AccountMeta::new(ctx.accounts.user_token_in.key(), false),
            // 17. User Dest Token (Pra onde vai o dinheiro)
            AccountMeta::new(ctx.accounts.user_token_out.key(), false),
            // 18. User Owner (Quem autoriza? A PDA!)
            AccountMeta::new_readonly(ctx.accounts.bot_config.key(), true), // is_signer = true
        ];

        // 5. Criar a Instrução Raw
        let instruction = Instruction {
            program_id: ctx.accounts.raydium_amm_program.key(),
            accounts,
            data: instruction_data,
        };

        // 6. Invocar com Assinatura (CPI)
        // Precisamos passar as AccountInfo reais aqui para o runtime da Solana processar
        invoke_signed(
            &instruction,
            &[
                ctx.accounts.token_program.to_account_info(),
                ctx.accounts.raydium_amm.to_account_info(),
                ctx.accounts.raydium_amm_authority.to_account_info(),
                ctx.accounts.raydium_amm_open_orders.to_account_info(),
                ctx.accounts.raydium_amm_target_orders.to_account_info(),
                ctx.accounts.raydium_pool_coin_token_account.to_account_info(),
                ctx.accounts.raydium_pool_pc_token_account.to_account_info(),
                ctx.accounts.serum_program.to_account_info(),
                ctx.accounts.serum_market.to_account_info(),
                ctx.accounts.serum_bids.to_account_info(),
                ctx.accounts.serum_asks.to_account_info(),
                ctx.accounts.serum_event_queue.to_account_info(),
                ctx.accounts.serum_coin_vault_account.to_account_info(),
                ctx.accounts.serum_pc_vault_account.to_account_info(),
                ctx.accounts.serum_vault_signer.to_account_info(),
                ctx.accounts.user_token_in.to_account_info(),
                ctx.accounts.user_token_out.to_account_info(),
                ctx.accounts.bot_config.to_account_info(), // Signer
            ],
            signer_seeds,
        )?;

        // 7. Atualizar Métricas
        let bot_config = &mut ctx.accounts.bot_config;
        bot_config.trades_executed = bot_config.trades_executed.checked_add(1).unwrap();

        msg!("Raydium Swap Executado com Sucesso!");

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
    /// Útil para resetar o bot ou recuperar SOL
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
pub struct ExecuteSwap<'info> {
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
    
    #[account(mut)]
    pub backend_signer: Signer<'info>,
    
    // --- User Accounts ---
    #[account(mut)]
    pub user_token_in: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_out: Account<'info, TokenAccount>,
    
    // --- Raydium & Serum Accounts (Todos Unsafe/CHECK) ---
    pub token_program: Program<'info, Token>,
    
    /// CHECK: Raydium AMM Program ID (Liquidity Pool V4)
    pub raydium_amm_program: UncheckedAccount<'info>,
    
    /// CHECK: Raydium AMM ID
    #[account(mut)]
    pub raydium_amm: UncheckedAccount<'info>,
    
    /// CHECK: Raydium AMM Authority
    pub raydium_amm_authority: UncheckedAccount<'info>,
    
    /// CHECK: Raydium Open Orders
    #[account(mut)]
    pub raydium_amm_open_orders: UncheckedAccount<'info>,
    
    /// CHECK: Raydium Target Orders
    #[account(mut)]
    pub raydium_amm_target_orders: UncheckedAccount<'info>,
    
    /// CHECK: Raydium Pool Coin Vault
    #[account(mut)]
    pub raydium_pool_coin_token_account: UncheckedAccount<'info>,
    
    /// CHECK: Raydium Pool PC Vault
    #[account(mut)]
    pub raydium_pool_pc_token_account: UncheckedAccount<'info>,
    
    /// CHECK: Serum Program ID
    pub serum_program: UncheckedAccount<'info>,
    
    /// CHECK: Serum Market
    #[account(mut)]
    pub serum_market: UncheckedAccount<'info>,
    
    /// CHECK: Serum Bids
    #[account(mut)]
    pub serum_bids: UncheckedAccount<'info>,
    
    /// CHECK: Serum Asks
    #[account(mut)]
    pub serum_asks: UncheckedAccount<'info>,
    
    /// CHECK: Serum Event Queue
    #[account(mut)]
    pub serum_event_queue: UncheckedAccount<'info>,
    
    /// CHECK: Serum Coin Vault
    #[account(mut)]
    pub serum_coin_vault_account: UncheckedAccount<'info>,
    
    /// CHECK: Serum PC Vault
    #[account(mut)]
    pub serum_pc_vault_account: UncheckedAccount<'info>,
    
    /// CHECK: Serum Vault Signer
    pub serum_vault_signer: UncheckedAccount<'info>,
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
        close = owner,  // Devolve o rent (SOL) ao owner
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

/// Configuração do bot de trading para um usuário
#[account]
#[derive(InitSpace)]
pub struct TradeBotConfig {
    /// Dono do bot
    pub owner: Pubkey,
    /// Autoridade do backend que pode executar trades automaticamente
    pub backend_authority: Pubkey,
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
    
    #[msg("Backend não autorizado para executar trades")]
    UnauthorizedBackend,
    
    #[msg("Conta de token inválida - não pertence ao owner")]
    InvalidTokenAccount,
    
    #[msg("Slippage tolerance exceeded - received less than minimum output")]
    SlippageExceeded,
    
    #[msg("Raydium CPI call failed")]
    RaydiumCpiFailed,
}
