import { ApplicationCommandOptionType, ApplicationCommandType, Client, ColorResolvable, CommandInteraction, EmbedBuilder } from 'discord.js'

export default {
  name: __filename,
  description: 'Create an embed!',
  type: ApplicationCommandType.ChatInput,
  category: 'utility',
  options: [
    {
      name: 'title',
      description: 'The title of the embed!',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'description',
      description: 'The description of the embed!',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'color',
      description: 'The hex color code of the embed!',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: 'author',
      description: 'name|icon|url',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'footer',
      description: 'name|icon',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'fields',
      description: 'name=value|name=value',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: 'image',
      description: 'The image URL!',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const { user } = interaction
    const guild = client.guilds.cache.get(interaction.guild?.id ?? '')
    const author = guild?.members.cache.get(user.id)
    const color = interaction.options.get('color')
    let hex: ColorResolvable

    if (typeof color?.value === 'string' && /^([0-9A-F]{6}){1,2}$/i.test(color.value)) {
      hex = `#${color.value}`
    } else {
      throw new Error('color must be a 6 digit hexadecimal code')
    }

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.options.get('title')?.value}`)
      .setDescription(`${interaction.options.get('description')?.value}`)
      .setColor(hex)

    function append(x) {
      const i = interaction.options.get(x.toLowerCase())
      let v
      console.log(i)
      if (i) {
        if (x === 'Image') {
          v = i.value
        } else {
          v = i.value
          let y: string[] = []
          if (typeof v === 'string') y = v.split('|')
          if (['Author', 'Footer'].includes(x)) {
            v = {}
            v.name = y[0]
            if (y[1] && /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i.test(y[1])) {
              v.iconURL = y[1]
            }
            if (y[2] && /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(y[2])) {
              v.url = y[2]
            }
          } else {
            v = []
            for (let s of y) {
              let z = s.split('=')
              if (s.includes('=') && z[0].length > 0 && z[1].length > 0) v.push({ name: z[0], value: z[1] })
            }
          }
        }
      } else {
        return false
      }
      console.log(v)
      if (Array.isArray(v)) {
        try {
          embed[`set${x}`](...v)
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          embed[`set${x}`](v)
        } catch (e) {
          console.log(e)
        }
      }
    }

    append('Author')
    append('Footer')
    append('Fields')
    append('Image')

    interaction.reply({ embeds: [embed] })
  }
}