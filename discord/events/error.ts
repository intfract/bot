import client from '..'
import { TOKEN } from '../config'

export function respond(error: Error) {
  console.log(error)
  client.login(TOKEN)
}