import { EmbedBuilder, Message, TextChannel } from 'discord.js'
import { logEvent } from '../logging'
import client from '..'

export async function respond(message: Message) {
  const { content, author, guild, url } = message
  if (author.bot) return
  if (guild) logEvent(client, guild, author, 'New Message', content, url)
  const mention = `<@${process.env.client}>`
  if (content.startsWith(mention)) {
    const text = content.substring(mention.length)
    console.log(text)
  }
}