import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, CommandInteraction, EmbedBuilder, Interaction } from 'discord.js'

type Question = {
  type: "multiple",
  difficulty: "easy" | "medium" | "hard",
  category: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
}

type APIResponse = {
  response_code: number,
  results: Question[],
}

export default {
  name: 'quiz',
  description: 'Create a quiz',
  type: ApplicationCommandType.ChatInput,
  category: 'general',
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()

    const endpoint = 'https://opentdb.com/api.php?amount=1&type=multiple'
    const response = await fetch(endpoint)
    const json: APIResponse = await response.json()
    const { response_code, results } = json
    if (response_code !== 0) return
    const result = results[0]
    console.log(result)

    const embed = new EmbedBuilder()
      .setTitle('Quiz')
      .setDescription(result.question)
      .setColor('#5865f2')
      .setFields(
        {
          name: 'Category',
          value: result.category
        },
        {
          name: 'Difficulty',
          value: result.difficulty
        },
      )
    
    const row = new ActionRowBuilder()
    const correctIndex = Math.floor(Math.random() * (result.incorrect_answers.length + 1))
    const options = [...result.incorrect_answers]
    options.splice(correctIndex, 0, result.correct_answer)
    console.log(options)
    options.forEach((option, index) => row.addComponents(
      (new ButtonBuilder())
        .setCustomId(index.toString())
        .setLabel(option)
        .setStyle(ButtonStyle.Primary)
    ))

    const message = await interaction.editReply({ embeds: [embed] })

    const filter = (i: Interaction) => i.user.id === interaction.user.id

    try {
      const choice = await message.awaitMessageComponent({ filter, time: 10000 })
      const index = parseInt(choice.customId)
      console.log(index, correctIndex)
    } catch (e) {
      console.log(e)
    }
  }
}