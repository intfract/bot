import { BaseInteraction, Client } from 'discord.js'
import { config } from 'dotenv'

config()

export const { TOKEN, CLIENT_ID, API_KEY, DATA_CHANNEL_ID, DATA_GUILD_ID } = process.env as Record<string, string>

export type Runnable = {
  run: (client: Client, interaction: BaseInteraction) => any
}