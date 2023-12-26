import { Client, FetchMessagesOptions, Message, TextChannel } from 'discord.js'

const FETCH_LIMIT = 100

/**
 * gets messages in a channel in chronological order
 * @param client the bot client
 * @param channelId ID of channel to fetch messages from
 * @returns {Promise<Message<boolean>[]>}
 */

export async function getMessages(client: Client, channelId: string): Promise<Message<boolean>[]> {
  const channel = client.channels.cache.get(channelId)
  const messages: Message[] = []
  if (!channel?.isTextBased()) return messages

  let pointer: Message | undefined | null
  let options: FetchMessagesOptions = { limit: FETCH_LIMIT }
  do {
    if (pointer) options.before = pointer.id
    pointer = await channel.messages.fetch(options).then(messagePage => {
      messagePage.forEach(message => messages.unshift(message))
      return messagePage.size === FETCH_LIMIT ? messagePage.at(-1) : null
    })
  } while (pointer)
  
  return messages
}

export async function getMessagesBy(client: Client, channelId: string, callback: (message: Message) => boolean): Promise<Message<boolean>[]> {
  const channel = client.channels.cache.get(channelId)
  const messages: Message[] = []
  if (!channel?.isTextBased()) return messages

  let pointer: Message | undefined | null
  let options: FetchMessagesOptions = { limit: FETCH_LIMIT }
  do {
    if (pointer) options.before = pointer.id
    pointer = await channel.messages.fetch(options).then(messagePage => {
      messagePage.forEach(message => callback(message) ? messages.unshift(message) : null)
      return messagePage.size === FETCH_LIMIT ? messagePage.at(-1) : null
    })
  } while (pointer)
  
  return messages
}

/**
 * gets messages in a channel in reverse chronological order
 * @param client the bot client
 * @param channelId ID of channel to fetch messages from
 * @returns {Promise<Message<boolean>[]>}
 */

export async function getLastMessages(client: Client, channelId: string, count: number): Promise<Message<boolean>[]> {
  const channel = client.channels.cache.get(channelId)
  const messages: Message[] = []
  if (!channel?.isTextBased()) return messages

  let pointer: Message | undefined | null
  let options: FetchMessagesOptions = { limit: count > FETCH_LIMIT ? FETCH_LIMIT : count }
  do {
    if (pointer) options.before = pointer.id
    pointer = await channel.messages.fetch(options).then(messagePage => {
      messagePage.forEach(message => messages.push(message))
      return messagePage.size === FETCH_LIMIT ? messagePage.at(-1) : null
    })
  } while (pointer)
  
  return messages
}