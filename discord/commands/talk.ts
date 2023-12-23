import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder, InteractionResponse } from 'discord.js'
import { API_KEY } from '../config'
import { createErrorEmbed } from '../defaults'
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Part,
  GenerateContentResult,
} from '@google/generative-ai'

const MODEL_NAME = 'gemini-pro'

export default {
  name: 'talk',
  description: 'Talk to the AI!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  options: [
    {
      name: 'text',
      description: 'The text to input!',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const { user } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    const text = interaction.options.get('text')?.value
    if (typeof text !== 'string') return

    const genAI = new GoogleGenerativeAI(API_KEY ?? '')
    const model = genAI.getGenerativeModel({ model: MODEL_NAME })

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

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    }).catch(e => interaction.reply({ embeds: [createErrorEmbed(e)] }))

    if (!('response' in result)) return
    const { response } = result

    const embed = new EmbedBuilder()
      .setTitle('Gemini Pro')
      .setDescription(response.text())
      .setColor('#5865f2')

    interaction.reply({ embeds: [embed] })
  }
}