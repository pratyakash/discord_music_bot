const { MessageEmbed } = require('discord.js');

const commands = ['>play', '>pause', '>resume', '>stop ', '>skip', '>queue', '>leave']

const help = async (client, message) => {
    // const _coms = commands.map(cmd => `\`To ${cmd.replace('>', '')} ${cmd}\n\n\``).join(' ');

    const _coms = commands.map((command, index) => {
        return `${index + 1}. To ${command.replace('>', '')} **${command}**\n`;
    }).join('')

    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(_coms)
        .setColor('#0099ff')
        // .addFields(
        //     {name: "Play", value: ">play", inline: true},
        //     {name: "Pause", value: ">pause", inline: true},
        //     {name: "Resume", value: ">resume", inline: true},
        //     {name: "Stop", value: ">stop", inline: true},
        //     {name: "Skip", value: ">skip", inline: true},
        //     {name: "Queue", value: ">queue", inline: true},
        //     {name: "Leave", value: ">leave", inline: true}
        // )

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


/* 

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "components": [
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
  ]
});

*/