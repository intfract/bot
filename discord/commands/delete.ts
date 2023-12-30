import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, ChatInputCommandInteraction, EmbedBuilder, InteractionResponse, Message, PermissionsBitField } from 'discord.js'
import { getLastMessages, getLastMessagesWith } from '../database'

export default {
  name: 'delete',
  description: 'Delete messages in a channel!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  default_member_permissions: PermissionsBitField.Flags.ManageMessages.toString(),
  options: [
    {
      name: 'count',
      description: 'number of messages to delete',
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
    {
      name: 'author',
      description: 'author of the messages',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const { user, channelId } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    const count = interaction.options.get('count')?.value as number
    if (count <= 0) return interaction.reply({ content: 'You must input an integer greater than 0.', ephemeral: true })
    const messageAuthor = interaction.options.get('author')?.user
    
    await interaction.deferReply({ ephemeral: true })
    let messages: Message[]
    if (messageAuthor) {
      messages = await getLastMessagesWith(client, channelId, count, message => message.author.equals(messageAuthor))
    } else {
      messages = await getLastMessages(client, channelId, count)
    }
    messages.forEach(message => {
      if (message.deletable) message.delete()
      else return interaction.editReply({ content: `[This](${message.url}) message is not deletable!` })
    })

    return interaction.editReply({ content: `${messages.length} message${messages.length === 1 ? ' was' : 's were'} deleted!` })
  }
}