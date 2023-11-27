require('dotenv').config()
const { InviteGuild, Client, IntentsBitField, EmbedBuilder } = require('discord.js')

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
client.on('ready',
    (c) => {
        console.log(`✅ ${c.user.username}Bot is up!!!!`)
    }
)
client.on('messageCreate',
    (message) => {
        if (message.author.bot)
            return;
        if (message.content.toLocaleLowerCase() == 'hi') {
            message.reply(`Hi <@${message.author.id}>`);
        }
        else if (message.content.toLocaleLowerCase() === 'how are you?') {
            message.reply(`Hi, Im good, what about you ${message.member.user} ?`)
        }
        if (message.content.toLocaleLowerCase().match("invite")) {
            message.channel
                .createInvite({ unique: true })
                .then((invite) => {
                    message.reply(`Here's your invite link: ${invite.url}`);
                })
                .catch((error) => {
                    console.error('Error creating invite:', error);
                    message.reply('Oops! Something went wrong.');
                });
        }
    }
)

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) {
        try {
            if (interaction.isButton()) {
                const role = interaction.guild.roles.cache.get(interaction.customId);
                await interaction.deferReply({
                    ephemeral: true
                });
                if (!role) {
                    interaction.editReply({
                        content: 'Couldnt Find the role',
                        ephemeral: true
                    })
                    return
                }
                const hasRole = interaction.member.roles.cache.has(role.id)
                if (hasRole) {
                    await interaction.member.roles.remove(role);
                    await interaction.editReply(`The role ${role} has been removed`);
                    return;
                }
                await interaction.member.roles.add(role)
                interaction.editReply(`Role ${role} added`)
            }
        } catch (error) {
            console.log(error)
        }

    };
    switch (interaction.commandName) {
        case 'hey':
            interaction.reply('Hi! ' + interaction.member.displayName)
            break;
        case 'ping':
            interaction.reply('Pong 🎾')
            break;
        case 'out':
            interaction.reply('🏏 OutsThat!!')
            break;
        case 'score':
            interaction.reply('Fetching latest scores...!!')
            break;
        case 'add':
            const num1 = interaction.options.get('a-number').value;
            const num2 = interaction.options.get('another-number').value;
            const sum = num1 + num2;
            // interaction.
            interaction.reply(`${num1}+${num2}=${sum}`)
            break;
        case 'embed':
            const embed = new EmbedBuilder().setTitle("Embeds Title").setColor("Random").setDescription("This is an Embed")
            interaction.reply({ embeds: [embed] })
            break;
        case 'cric':
            const cric = new EmbedBuilder().setTitle("Cricket Updates").setColor("#000000").setDescription("CricketScore!!!")
            interaction.reply({ embeds: [cric] })
            break;
        case 'invite':
            interaction.reply("Link done")
            // Generate an invite link and send it back to the user

            // let inv = InviteGuild;
            // InviteGuild.
            // inv.arguments(InviteGuild)

            function createlink(chan, guild, message) {
                let invite = chan.createinvite().catch(console.error);
                try {
                    interaction.reply(guild.name + '|' + invite);
                } catch (e) {
                    interaction.reply(guild.name + '|' + 'no link available');
                }
            }
            // invite = interaction.con
            interaction.reply(`created invite link: ${link}`)
        default:
            break;
    }
})
