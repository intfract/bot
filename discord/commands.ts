import { REST, Routes, SlashCommandBuilder, ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js'
import fs from 'fs'
import { TOKEN, CLIENT_ID, Runnable } from './config'

const rest = new REST().setToken(TOKEN ?? '')

type Command = {
  name: string,
  description: string,
  type: ApplicationCommandType,
  default_member_permissions?: string,
  options?: ApplicationCommandOptionType[],
}

export let commands: Record<string, Command & Runnable> = {}

function getSlashCommands() {
  const slashCommands: Command[] = []
  const files = fs.readdirSync(`./dist/commands`).filter(file => file.endsWith('.js')) // absolute path

  for (const file of files) {
    let createCopy = false
    const data = require(`./commands/${file}`).default // relative path
    const command: Command & Runnable = data
    commands[command.name] = command
    const slashCommand = { ...data }
    if (slashCommand.category === 'user') createCopy = true
    delete slashCommand.run
    delete slashCommand.category
    slashCommands.push(slashCommand)
    if (createCopy) {
      const copy = { ...slashCommand }
      delete copy.description
      delete copy.default_member_permissions
      delete copy.options
      copy.type = ApplicationCommandType.User
      slashCommands.push(copy)
    }
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