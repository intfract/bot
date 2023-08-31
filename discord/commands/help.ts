import { ApplicationCommandOptionBase, ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from 'discord.js'
import { commands } from '../commands'

export default {
  name: __filename,
  description: 'Help is on its way!',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Here is a list of commands!')
      .setColor('#4865f2')

    for (const [key, value] of Object.entries(commands)) {
      embed.addFields({
        name: 'options' in value ? [value.name, ...value.options.map((x: ApplicationCommandOptionBase) => x.name)].join(' ') : key,
        value: value.description,
      })
    }

    interaction.reply({ embeds: [embed] })
  }
}