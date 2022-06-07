require('dotenv').config();

const Discord = require('discord.js');

const { bot_config } = require('./config');
const { bot_token, prefix } = bot_config;

const { initiate_bot } = require('./bot');

const client = new Discord.Client();

client.login(bot_token);

client.once('ready', () => {
 console.log('Ready!');
});

client.once('reconnecting', () => {
 console.log('Reconnecting!');
});

client.once('disconnect', () => {
 console.log('Disconnect!');
});

initiate_bot(client, prefix);