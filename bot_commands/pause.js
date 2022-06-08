const Discord = require('discord.js');

const { COLORS } = require('../utils/constants');
const { send_empty_message } = require('../utils');

const pause = (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return send_empty_message(message, "There is nothing in the queue right now!");

    if (queue.paused) {
        queue.resume();

         const embed = new Discord.MessageEmbed()
            .setColor(COLORS.NEON_GREEN)
            .setTitle(`Song Resumed`)
            .setDescription(`Song [[  ${queue && queue.songs ? queue.songs[0].name : ' '}  ]] is resumed for you :)`)
            .setFooter({ text: "bullMusic [>help]" });

        return message.channel.send({ embeds: [embed] });
    }

    queue.pause();


    const embed = new Discord.MessageEmbed()
        .setColor(COLORS.YELLOW)
        .setTitle(`Song Paused`)
        .setDescription(`Song [[  ${queue && queue.songs ? queue.songs[0].name : ' '}  ]] is paused for you :)`)
        .setFooter({ text: "bullMusic [>help]" });


    message.channel.send({ embeds: [embed] });
};

module.exports.pause = pause;