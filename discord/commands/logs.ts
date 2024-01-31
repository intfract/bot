import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder } from 'discord.js'
import fs from 'fs'

export default {
  name: 'logs',
  description: 'Mange server logging!',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  options: [
    fs.readdirSync(`./dist/commands/logs`).filter(file => file.endsWith('.js')).map(file => require(`./logs/${file}`).default)
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const subcommand = interaction.options.getSubcommand()
    const f: (client: Client, interaction: ChatInputCommandInteraction) => Promise<void> = require(`./logs/${subcommand}`).default.run
    await f(client, interaction)

    const embed = new EmbedBuilder()
      .setTitle('Logs')
      .setDescription('Updated your server log channel!')
      .setColor('#5865f2')
    
    interaction.reply({ embeds: [embed] })
  }
}