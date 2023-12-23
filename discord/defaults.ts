import { EmbedBuilder, codeBlock } from 'discord.js'

export function createErrorEmbed(e: any) {
  return new EmbedBuilder()
    .setTitle('Error')
    .setDescription(codeBlock(e))
    .setColor('#5865f2')
}