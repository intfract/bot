import { REST, Routes, SlashCommandBuilder, ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js'
import fs from 'fs'
import { TOKEN, CLIENT_ID, Runnable } from './config'

const rest = new REST().setToken(TOKEN ?? '')

type Command = {
  name: string,
  description: string,
  type: ApplicationCommandType,
  category: string,
  options?: ApplicationCommandOptionType[],
}

export let commands: Record<string, Command & Runnable> = {}

function getSlashCommands() {
  const slashCommands: Command[] = []
  const files = fs.readdirSync(`./dist/commands`).filter(file => file.endsWith('.js')) // absolute path

  for (const file of files) {
    const command: Command & Runnable = require(`./commands/${file}`).default // relative path
    slashCommands.push(command)
    commands[command.name] = command
  }
  return slashCommands
}

export async function registerSlashCommands() {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID ?? ''), { body: getSlashCommands() })
    console.log('registered slash commands')
  } catch (error) {
    console.log(error)
  }
}