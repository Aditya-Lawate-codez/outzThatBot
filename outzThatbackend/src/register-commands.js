require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
const commands = [
    {
        // Add command
        name: 'add',
        description: 'adds 2 nums!',
        options: [
            {
                name: 'a-number',
                description: 'First no. to add',
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices:
                    [
                        {
                            name: 'one',
                            value: 1,
                        },
                        {
                            name: 'two',
                            value: 2,
                        },
                        {
                            name: 'three',
                            value: 3,
                        },
                    ]
            },
            {
                name: 'another-number',
                description: 'Second no. to add',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ],

    }, 
    {
        name: 'hey',
        description: 'Hey Hi!'
    },
    {
        name: 'ping',
        description: 'pong'
    },
    {
        name: 'embed',
        description: 'sends an Embed!'
    },
    {
        name:'cric',
        description:'Sends Cricket Updates'
    }

];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands.....')
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
            , { body: commands })
        console.log('commands registered.....')
    } catch (error) {
        console.log(`There was an ${error}  `);

    }
})();