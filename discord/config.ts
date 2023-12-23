import { BaseInteraction, Client } from 'discord.js'
import { config } from 'dotenv'

config()

export const { TOKEN, CLIENT_ID, API_KEY } = process.env

export type Runnable = {
  run: (client: Client, interaction: BaseInteraction) => any
}