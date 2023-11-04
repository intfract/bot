import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: 'execute',
  description: 'Execute JavaScript!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  run: async (client: Client, interaction: CommandInteraction) => {
    //
  }
}