import { REST, Routes, SlashCommandBuilder, ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js'
import fs from 'fs'

const rest = new REST().setToken(process.env.token ?? 'TOKEN')

type Command = {
  name: string,
  description: string,
  type: ApplicationCommandType,
  options?: ApplicationCommandOptionType[],
}

export let commands: Record<string, any> = {}

function getSlashCommands() {
  const slashCommands: SlashCommandBuilder[] = []
  const files = fs.readdirSync(`./dist/commands`).filter(file => file.endsWith('.js')) // absolute path

  for (const file of files) {
    const command: Command = require(`./commands/${file}`) // relative path
    const slashCommand = new SlashCommandBuilder()
    slashCommand
      .setName(command.name)
      .setDescription(command.description)
    slashCommands.push(slashCommand)
    commands[command.name] = command
  }
  return slashCommands
}

export async function registerSlashCommands() {
  try {
    await rest.put(Routes.applicationCommands(process.env.client ?? 'CLIENT_ID'), { body: getSlashCommands() })
    console.log('registered slash commands')
  } catch (error) {
    console.log(error)
  }
}