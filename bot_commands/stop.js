const Discord = require('discord.js');

const { send_empty_message } = require('../utils');
const { COLORS } = require('../utils/constants');

const stop = (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return send_empty_message(message, "There is nothing in the queue right now!");

    queue.stop();

    const embed = new Discord.MessageEmbed()
        .setColor(COLORS.RED)
        .setTitle(`Song Stopped`)
        .setDescription(`Song [[  ${queue && queue.songs ? queue.songs[0].name : ' '}  ]] is resumed for you :)`)
        .setFooter({ text: "bullMusic [>help]" });
        
    message.channel.send({ embeds: [embed] });
};

module.exports.stop = stop;