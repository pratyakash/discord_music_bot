const { MessageEmbed } = require('discord.js');

const commands = ['>play', '>pause', '>resume', '>stop ', '>skip', '>queue', '>leave']

const help = async (client, message) => {
    const _coms = commands.map((command, index) => {
        return `${index + 1}. To ${command.replace('>', '')} **${command}**\n`;
    }).join('')

    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(_coms)
        .setColor('#0099ff')

    client.api.channels(message.channel.id).messages.post({
        data: {
            embeds: [embed],
            components: [
                {
                    "type": 1,
                    "components": [
                        {
                            "style": 5,
                            "label": `Invite the bot`,
                            "url": `https://discord.com/api/oauth2/authorize?client_id=983621185118044181&permissions=3151872&scope=bot`,
                            "disabled": false,
                            "type": 2
                        }
                    ]
                }
            ],
        }
    });
};

module.exports.help = help;