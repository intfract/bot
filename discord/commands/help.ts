import { ApplicationCommandOptionBase, ApplicationCommandOptionType, ApplicationCommandType, Client, CommandInteraction, EmbedBuilder } from 'discord.js'
import { commands } from '../commands'

const keys = Object.keys(ApplicationCommandOptionType)
const types = keys.slice(keys.length / 2)
console.log(types)

export default {
  name: 'help',
  description: 'Help is on its way!',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  run: async (client: Client, interaction: CommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Here is a list of commands!')
      .setColor('#5865f2')

    for (const [key, value] of Object.entries(commands)) {
      embed.addFields({
        name: value.options ? [value.name, ...value.options.map((x: any) => (x instanceof ApplicationCommandOptionBase ? `\`${types[x.type - 1]} ${x.name}\`` : ''))].join(' ') : key,
        value: value.description,
      })
    }

    interaction.reply({ embeds: [embed] })
  }
}