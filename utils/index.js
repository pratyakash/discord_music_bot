const Discord = require('discord.js');

const { COLORS } = require('../utils/constants');
const { bot_config } = require('../config/index');
const { STATUS } = require('./constants');


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


const numer_of_servers = client => {
    try {
        console.log(`[+] Server Count is ${client.guilds.cache.size}`);
    } catch (error) {
        console.log('[-] Error in Calculating Servers');
    }
};

const force_status_update = client => {
    set_bot_activity(client,  `${bot_config['prefix']}help`, STATUS.WATCH)
};

module.exports.send_message = send_message;
module.exports.get_embed_message = get_embed_message;
module.exports.send_empty_message = send_empty_message;
module.exports.set_bot_activity = set_bot_activity;
module.exports.numer_of_servers = numer_of_servers;
module.exports.force_status_update = force_status_update;