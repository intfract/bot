import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from 'discord.js'

export default {
  name: 'execute',
  description: 'Execute JavaScript!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  run: async (client: Client, interaction: CommandInteraction) => {
    const modal = new ModalBuilder()
      .setCustomId('execute')
      .setTitle('JavaScript Executor')
    
    const codeInput = new TextInputBuilder()
      .setCustomId('code')
      .setLabel('Code')
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true)

    const actionRow = new ActionRowBuilder<TextInputBuilder>()
      .addComponents(codeInput)

    modal.addComponents(actionRow)

    await interaction.showModal(modal)
  }
}