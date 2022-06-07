const { MessageEmbed } = require('discord.js');

const commands = ['>play', '>pause', '>resume', '>stop ', '>skip', '>queue', '>leave']

const help = async (client, message) => {
    const _coms = commands.map(cmd => `\`To ${cmd.replace('>', '')} ${cmd}\n\``).join(' ');

    const embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription(_coms)
        .setColor('#0099ff')

    message.channel.send({ embeds: [embed] });
};

module.exports.help = help;