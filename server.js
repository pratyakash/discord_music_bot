require('dotenv').config();

const Discord = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { bot_config } = require('./config/index');

const { execute_command } = require('./bot_commands');
const { init_distube_extra } = require('./utils/distube_util');
const { send_empty_message, set_bot_activity } = require('./utils');
const { STATUS } = require('./utils/constants');

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
});

client.config = bot_config;
client.emotes = bot_config['emoji'];

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ],
  youtubeDL: false
});


client.login(bot_config['bot_token']);

client.once('ready', () => {
  set_bot_activity(client, `${bot_config['prefix']}help`, STATUS.LISTEN)

  console.log(`${client.user.tag} is ready to play music.`)
})

client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild)  return;

  const prefix = bot_config['prefix'];

  if (!message.content.startsWith(prefix)) return;

  const { member } = message;

  if (member && member.voice && !member.voice.channel) return send_empty_message(message, "You need to be in a voice channel to play music!");

  let permissions;

  if (member && member.voice && member.voice.channel && message.member.voice.channel.permissionsFor) {
    permissions = message.member.voice.channel.permissionsFor(message.client.user);
  }

  if ((permissions && !permissions.has("CONNECT") || !permissions.has("SPEAK")) || !permissions) return message.channel.send(`I need the permissions to join and speak in your voice channel!`)

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase();

  execute_command(command, client, message, args);
});

init_distube_extra(client);