import { Client, EmbedBuilder, Guild, TextChannel, User } from 'discord.js'
import { DATA_CHANNEL_ID } from './config'
import { getLastMessages } from './database'

export async function logEvent(client: Client, guild: Guild, author: User, title: string, description: string, url: string) {
  const dataChannel = client.channels.cache.get(DATA_CHANNEL_ID) as TextChannel
  const { threads } = dataChannel
  const thread = threads.cache.find(thread => thread.name === guild?.id)
  if (thread) {
    const threadMessage = (await getLastMessages(client, thread.id, 1))[0]
    if (threadMessage) {
      const [key, value] = threadMessage.content.split(':')
      if (key === 'logs') {
        const channelId = value
        const channel = client.channels.cache.get(channelId)
        if (channel?.isTextBased()) {
          try {
            const embed = new EmbedBuilder()
            .setAuthor({ name: author.username, url, iconURL: author.avatarURL() ?? '' })
            .setTitle(title)
            .setDescription(description)
            .setColor('#5865f2')
            channel.send({ embeds: [embed] })
          } catch (e) {
            console.log(e)
          }
        }
      }
    }
  }
}