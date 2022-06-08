const Discord = require('discord.js');

const { COLORS, NO_OF_SONGS_IN_QUEUE } = require('../utils/constants');
const { send_empty_message } = require('../utils');


const queue = async (client, message) => {
    const queue = client.distube.getQueue(message)

    if (!queue) return send_empty_message(message, "There is nothing playing!");

    const embed = new Discord.MessageEmbed()
        .setColor(COLORS.BLUE)
        .setTitle("Songs In Queue")
        .setFooter({ text: "bullMusic [>help]" });

    const last_index =  queue.songs.length > NO_OF_SONGS_IN_QUEUE ? NO_OF_SONGS_IN_QUEUE : queue.songs.length;

    for (let index = 0; index < last_index; index++) {
        const song = queue.songs[index]
        embed.addField((index + 1) + '. ' +song.name, `-${song.formattedDuration}`);
    }

    if (queue.songs.length > NO_OF_SONGS_IN_QUEUE) {
        embed.setFooter({ text: `${queue.songs.length - NO_OF_SONGS_IN_QUEUE} More...` });
    }
   
    message.channel.send({ embeds: [embed] })
};

module.exports.queue = queue;