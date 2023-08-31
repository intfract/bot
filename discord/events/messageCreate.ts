import { Message } from 'discord.js'

export function respond(message: Message) {
  const { content } = message
  const mention = `<@${process.env.client}>`
  if (content.startsWith(mention)) {
    const text = content.substring(mention.length)
    console.log(text)
  }
}