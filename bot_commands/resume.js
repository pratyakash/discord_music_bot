const Discord = require('discord.js');

const { COLORS } = require('../utils/constants');
const { send_empty_message } = require('../utils');


const resume = (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return send_empty_message(message, "There is nothing in the queue right now!");

    if (queue.paused) {
        queue.resume();
        const embed = new Discord.MessageEmbed()
            .setColor(COLORS.NEON_GREEN)
            .setTitle(`Song Resumed`)
            .setDescription(`Song [[  ${queue && queue.songs ? queue.songs[0].name : ' '}  ]] is resumed for you :)`)
            .setFooter({ text: "bullMusic [>help]" });

        message.channel.send({ embeds: [embed] });
    }
    else {
        message.channel.send('Song already playing :)');
    }

};

module.exports.resume = resume;