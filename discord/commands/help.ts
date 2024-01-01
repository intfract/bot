import { APIEmbedField, ApplicationCommand, ApplicationCommandOption, ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder, RestOrArray } from 'discord.js'

const keys = Object.keys(ApplicationCommandOptionType)
const types = keys.slice(keys.length / 2)

function resolveSubcommands(command: ApplicationCommand) {
  const subcommands: APIEmbedField[] = []
  command.options.forEach((option: ApplicationCommandOption) => {
    if (option.type === ApplicationCommandOptionType.Subcommand) {
      subcommands.push({
        name: `</${command.name} ${option.name}:${command.id}>`,
        value: option.description,
      })
    }
  })
  return subcommands
}

export default {
  name: 'help',
  description: 'Help is on its way!',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Here is a list of commands!')
      .setColor('#5865f2')

    const commands = await client.application?.commands.fetch()
    commands?.forEach((command: ApplicationCommand) => {
      if (command.type === ApplicationCommandType.ChatInput) {
        const subcommands = resolveSubcommands(command)
        if (subcommands.length) {
          embed.addFields(...subcommands)
        } else {
          embed.addFields({
            name: `</${command.name}:${command.id}>`,
            value: command.description,
          })
        }
      }
    })

    interaction.reply({ embeds: [embed] })
  }
}