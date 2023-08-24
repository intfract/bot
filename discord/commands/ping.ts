import { ApplicationCommandType, Client, CommandInteraction } from "discord.js";

export default {
  name: 'ping',
  description: 'Check the bot\'s ping',
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    interaction.reply({ content: `🏓 Pong! **${Math.round(client.ws.ping)} ms**` })
  }
}