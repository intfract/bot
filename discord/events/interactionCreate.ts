import { BaseInteraction } from 'discord.js'
import client from '..'
import { commands } from '../commands'

export function respond(interaction: BaseInteraction) {
  try {
    if (interaction.isChatInputCommand()) return commands[interaction.commandName].run(client, interaction)
  } catch (e) {
    console.log(e)
  }
}