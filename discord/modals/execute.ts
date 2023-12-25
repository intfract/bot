import { ModalSubmitInteraction, Client, EmbedBuilder, codeBlock } from 'discord.js'

export default {
  name: 'execute',
  run: async (client: Client, interaction: ModalSubmitInteraction) => {
    const code = interaction.fields.getTextInputValue('code')

    let console: string[] = []
    const args = {
      console: {
        log(item: any) {
          console.push(`${item}`)
        },
      },
      process: {
        version: process.version,
      },
      Function: null,
      eval: null,
    }

    const f = new Function(...Object.keys(args), code)
    const result = f(...Object.values(args)) // must be converted to string

    const embed = new EmbedBuilder()
      .setTitle('Code Output')
      .setDescription(codeBlock('js', code))
      .setColor('#5865f2')
      .addFields({ name: 'Return', value: codeBlock(result) })

    if (console.length) embed.addFields({ name: 'Console', value: codeBlock(console.join('\n')) })

    interaction.reply({ embeds: [embed] })
  }
}