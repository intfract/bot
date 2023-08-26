import { CommandInteraction } from 'discord.js'
import client from '..'
import { commands } from '../commands'

export function respond(interaction: CommandInteraction) {
  if (interaction.isChatInputCommand()) return commands[interaction.commandName].run(client, interaction)
}