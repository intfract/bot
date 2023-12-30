import { BaseInteraction } from 'discord.js'
import client from '..'
import { commands } from '../commands'
import { getModals } from '../modals'
import { createErrorEmbed } from '../defaults'

export function respond(interaction: BaseInteraction) {
  try {
    if (interaction.isChatInputCommand() || interaction.isUserContextMenuCommand()) return commands[interaction.commandName].run(client, interaction)
    if (interaction.isModalSubmit()) return getModals()[interaction.customId].run(client, interaction)
  } catch (e) {
    console.log(e)
    interaction.channel?.send({ embeds: [createErrorEmbed(e)] })
  }
}