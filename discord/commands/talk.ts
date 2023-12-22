import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: 'talk',
  description: 'Talk to the AI!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  options: [
    {
      name: 'text',
      description: 'The text to input!',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const { user } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    const text = interaction.options.get('text')

    const embed = new EmbedBuilder()
      .setTitle('Response')
      .setDescription('Description') // to be replaced with gemini pro response
      .setColor('#5865f2')

    interaction.reply({ embeds: [embed] })
  }
}