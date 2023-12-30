import { ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: 'ping',
  description: 'Check the bot\'s ping',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const embed = new EmbedBuilder()
      .setTitle('Ping')
      .setDescription('🏓 Pong!')
      .setColor('#5865f2')
      .setFields({
        name: 'Latency',
        value: `**${Math.round(client.ws.ping)} ms**`
      })
    interaction.reply({ embeds: [embed] })
  }
}