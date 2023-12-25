import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder, InteractionResponse } from 'discord.js'
import { API_KEY } from '../config'
import { createErrorEmbed } from '../defaults'
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Part,
} from '@google/generative-ai'
import axios from 'axios'

const supportedTypes = [
  'png',
  'jpg',
  'mp4',
]

const mimeTypes = [
  'image/png',
  'image/jpg',
  'vide/mp4',
]

export default {
  name: 'talk',
  description: 'Talk to the AI!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  options: [
    {
      name: 'text',
      description: 'text input',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'image',
      description: 'image attachment',
      type: ApplicationCommandOptionType.Attachment,
      required: false,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const { user } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    const text = interaction.options.get('text')?.value
    if (typeof text !== 'string') return
    const image = interaction.options.get('image')?.attachment?.url

    const genAI = new GoogleGenerativeAI(API_KEY ?? '')
    const model = genAI.getGenerativeModel({ model: image ? 'gemini-pro-vision' : 'gemini-pro' })

    const generationConfig = {
      temperature: 0,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    }

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ]

    const parts: Part[] = []
    parts.push({ text })
    if (image) {
      const buffer = Buffer.from((await axios.get(image, { responseType: 'arraybuffer' })).data)
      let ext = image.split('.').at(-1)
      console.log(ext)
      if (!ext || !supportedTypes.includes(ext)) return interaction.reply({ embeds: [createErrorEmbed('This file type is not supported!')] })
      const mimeType = mimeTypes[supportedTypes.indexOf(ext)]
      parts.push({
        inlineData: {
          mimeType,
          data: buffer.toString('base64'),
        }
      })
    }
    
    await interaction.deferReply()

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    }).catch(e => interaction.editReply({ embeds: [createErrorEmbed(e)] }))

    if (!('response' in result)) return
    const { response } = result

    const embed = new EmbedBuilder()
      .setTitle('Gemini Pro')
      .setDescription(response.text())
      .setColor('#5865f2')

    if (image) embed.setImage(image)
    
    interaction.editReply({ embeds: [embed] })
  }
}