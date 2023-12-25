import { Client, FetchMessagesOptions, Message, TextChannel } from 'discord.js'

/**
 * gets messages in a channel in reverse chronological order
 * @param client the bot client
 * @param channelId ID of channel to fetch messages from
 * @returns {Promise<Message<boolean>[]>}
 */

export async function getMessages(client: Client, channelId: string): Promise<Message<boolean>[]> {
  const channel = client.channels.cache.get(channelId)
  const messages: Message[] = []
  if (!channel?.isTextBased()) return messages

  let pointer: Message | undefined | null
  let options: FetchMessagesOptions = { limit: 100 }
  do {
    if (pointer) options.before = pointer.id
    pointer = await channel.messages.fetch(options).then(messagePage => {
      messagePage.forEach(message => messages.unshift(message))
      return messagePage.size === 100 ? messagePage.at(-1) : null
    })
  } while (pointer)
  
  return messages
}

export async function getMessagesBy(client: Client, channelId: string, callback: (message: Message) => boolean): Promise<Message<boolean>[]> {
  const channel = client.channels.cache.get(channelId)
  const messages: Message[] = []
  if (!channel?.isTextBased()) return messages

  let pointer: Message | undefined | null
  let options: FetchMessagesOptions = { limit: 100 }
  do {
    if (pointer) options.before = pointer.id
    pointer = await channel.messages.fetch(options).then(messagePage => {
      messagePage.forEach(message => callback(message) ? messages.unshift(message) : null)
      return messagePage.size === 100 ? messagePage.at(-1) : null
    })
  } while (pointer)
  
  return messages
}