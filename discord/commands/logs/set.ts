import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: 'set',
  description: 'Set the log channel for the server!',
  type: ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: 'channel',
      description: 'the log channel',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    //
  }
}