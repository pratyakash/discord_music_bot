const Discord = require('discord.js');

const { COLORS } = require('../utils/constants');
const { bot_config } = require('../config/index');


const send_message = async (message_client, message) => {
    const { channel } = message_client;

    await channel.send(message);
};

const get_embed_message = (title = "bullMusic", color = COLORS.NEON_GREEN, desp, fields, footer = "bullMusic [>help]") => {
    const embed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle(title)
        .setDescription(desp)
        .addFields(fields)
        .setFooter({ text: footer });

    return embed;
};

const send_empty_message = (message_client, message) => {
    const embed = new Discord.MessageEmbed()
        .setColor(COLORS.RED)
        .setDescription(`${message}`)
        .setFooter({ text: "bullMusic [>help]" });

    message_client.channel.send({ embeds: [embed] });

};


const set_bot_activity = (client, message, type) => {
    /* 
        Types:- WATCHING, LISTENING, PLAYING, STREAMING
    */
    console.log(`[+] Setting Activity ${type}`)
    client.user.setActivity(message, { type: type });
};

module.exports.send_message = send_message;
module.exports.get_embed_message = get_embed_message;
module.exports.send_empty_message = send_empty_message;
module.exports.set_bot_activity = set_bot_activity;