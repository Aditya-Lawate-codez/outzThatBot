require('dotenv').config()
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const client = new Client(
    {
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.MessageContent,
        ]
    }
)
client.login(process.env.TOKEN);
const roles = [
    {
        id: '1172146920643366984',
        label: 'Red',
    },
    {
        id: '1172146750597894166',
        label: 'Blue',
    },
    {
        id: '1172146857875611719',
        label: 'Green',
    },
]
client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1171787480710774898')
        if (!channel) return;


        const row = new ActionRowBuilder()

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Success)
            )
        })
        await channel.send({
            content: 'Claim or Remove Roles',
            components: [row]
        })
        process.exit();
    } catch (error) {
        console.log(`There was an \n ${error}`);
    }
}
)

