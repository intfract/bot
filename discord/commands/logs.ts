import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: 'logs',
  description: 'Mange server logging!',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  options: [
    {
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
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    console.log(interaction.options.getSubcommand())

    const embed = new EmbedBuilder()
      .setTitle('Logs')
      .setDescription('Updated your server log channel!')
      .setColor('#5865f2')
    
    interaction.reply({ embeds: [embed] })
  }
}