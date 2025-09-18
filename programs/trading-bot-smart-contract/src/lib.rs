use anchor_lang::prelude::*;

declare_id!("EJQW7cwHAdd6dLGuwNTYa7P2a5PrRXrkiYcbsyqwFYky");

#[program]
pub mod trading_bot_smart_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
