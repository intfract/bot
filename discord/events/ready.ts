import { ActivityType, Client } from 'discord.js'

export function respond(client: Client) {
  const activities = [
    {
      name: `${client.guilds.cache.size} Server${(client.guilds.cache.size === 1) ? '' : 's'}`,
      type: ActivityType.Listening
    },
    {
      name: `/help`,
      type: ActivityType.Playing
    },
  ]
  let i = 0
  setInterval(() => {
    if (i >= activities.length) i = 0
    client.user?.setActivity(activities[i])
    i++
  }, 5000)
  console.log(`connectd to: ${client.user?.tag}`)
}