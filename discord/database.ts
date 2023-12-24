import { Client } from 'discord.js'

export async function getMessages(client: Client, channelId: string) {
  const channel = client.channels.cache.get(channelId)
}