import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder, TextChannel, ThreadChannel } from 'discord.js'
import { DATA_CHANNEL_ID } from '../../config'

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
    const guild = interaction.guild
    const channel = interaction.options.get('channel')?.channel
    const dataChannel = client.channels.cache.get(DATA_CHANNEL_ID) as TextChannel
    const { threads } = dataChannel
    let thread = threads.cache.find(thread => thread.name === guild?.id)
    if (!thread) thread = await dataChannel.threads.create({ name: guild?.id ?? '' })
    thread.send({ content: `logs:${channel?.id}` })
  }
}