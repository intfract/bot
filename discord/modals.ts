import fs from 'fs'
import { Runnable } from './config'

type Modal = {
  name: string,
}

export function getModals() {
  const modals: Record<string, Modal & Runnable> = {}
  const files = fs.readdirSync(`./dist/modals`).filter(file => file.endsWith('.js')) // absolute path

  for (const file of files) {
    const modal: Modal & Runnable = require(`./modals/${file}`).default // relative path
    modals[modal.name] = modal
  }

  return modals
}