import { Client } from 'discord.js'
import fs from 'fs'

export function listen(client: Client) {
  const extension = '.js' // .ts compiles to .js
  const files = fs.readdirSync('./dist/events').filter(file => file.endsWith(extension)) // absolute path
  for (const file of files) {
    const event = require(`./events/${file}`) // relative path
    client.on(file.substring(0, file.length - extension.length), (...args) => event.respond(...args))
  }
}