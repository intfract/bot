import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder, InteractionResponse, PermissionsBitField } from 'discord.js'
import { getLastMessages } from '../database'

export default {
  name: 'delete',
  description: 'delete messages in a channel!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  options: [
    {
      name: 'count',
      description: 'number of messages to delete',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const { user, channelId } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    if (!author?.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'You do not have permission to manage messages!', ephemeral: true })
    const count = interaction.options.get('count')?.value as number
    if (count <= 0) return interaction.reply({ content: 'You must input an integer greater than 0.', ephemeral: true })
    
    await interaction.deferReply({ ephemeral: true })
    const messages = await getLastMessages(client, channelId, count)
    messages.forEach(message => {
      if (message.deletable) message.delete()
      else return interaction.editReply({ content: `[This](${message.url}) message is not deletable!` })
    })

    return interaction.editReply({ content: `${messages.length} message${messages.length > 1 ? 's were' : ' was'} deleted!` })
  }
}