import { Client, GatewayIntentBits, Partials, Collection, ActivityType } from 'discord.js'
import { listen } from './events'
import { registerSlashCommands } from './commands'
import { TOKEN, CLIENT_ID } from './config'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
})

listen(client)
registerSlashCommands()

client.login(TOKEN)

export default client