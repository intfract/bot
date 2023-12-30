import { ApplicationCommandType, Client, CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, UserContextMenuCommandInteraction } from 'discord.js'

export default {
  name: 'avatar',
  description: 'Check the bot\'s ping',
  type: ApplicationCommandType.ChatInput,
  category: 'user',
  options: [
    {
      name: 'user',
      description: 'The avatar of the user you want to display!',
      type: ApplicationCommandOptionType.User,
      required: false,
    }
  ],
  run: async (client: Client, interaction: CommandInteraction | UserContextMenuCommandInteraction) => {
    const user = interaction.options.get('user')?.user || interaction.user
    const color = (await user.fetch(true)).hexAccentColor

    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ size: 4096 }))
      .setColor(color ? color : '#5865f2')
      .setTimestamp()
    
    interaction.reply({ embeds: [embed] })
  }
}