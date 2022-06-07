const yt_dl = require('ytdl-core');
const yt_search = require('yt-search');

const { send_message } = require('./utils');

const queue = new Map();

const initiate_bot = (client, prefix) => {
    client.on('message', async message => {
        const { author, content, channel } = message;

        if (author.bot) return;
        if (!content.startsWith(prefix)) return;

        const server_queue = queue.get(message.guild.id);

        if (content.startsWith(`${prefix}play`)) {
            execute(message, server_queue, prefix);
            return;
        }
        else if (content.startsWith(`${prefix}stop`)) {
            stop(message, server_queue);
            return;
        }
        else if (content.startsWith(`${prefix}pause`)) {
            pause(message, server_queue);
            return;
        }
        else if (content.startsWith(`${prefix}resume`)) {
            resume(message, server_queue);
            return;
        }
        else if (content.startsWith(`${prefix}skip`)) {
            skip(message, server_queue);
            return;
        }
        else if (content.startsWith(`${prefix}hint`)) {
            send_message(message, `**
Commands are:- 
1. To play   -> [>play]
2. To stop   -> [>stop]
3. To skip   -> [>skip]
4. To pause  -> [>pause]
5. To resume -> [>resume]
            **`);
            return;
        }
        else {
            send_message(message, '[-] Invalid Command');
        }
    });
};


const find_video = async query => {
    const results = await yt_search(query);

    return results.videos.length > 1 ? results.videos[0] : null;
};


const execute = async (message, server_queue, prefix) => {
    let args;

    const { content } = message;

    if (content) {
        args = message.content.replace(`${prefix}play `, '');

        if (args && args.trim().length > 1) {
            const voice_channel = message.member.voice.channel;

            if (!voice_channel) {
                return send_message(message, "You need to be in a voice channel to play music!");
            }

            const permissions = voice_channel.permissionsFor(message.client.user)

            if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return send_message(message, "I need the permissions to join and speak in your voice channel!");
            }

            let video_from_youtube;

            if (args.indexOf('www') == -1) {
                video_from_youtube = await find_video(args);
            }
            else {
                video_from_youtube = await yt_dl.getInfo(args);
            }

            const song = {
                title: video_from_youtube.title,
                url: video_from_youtube.url ? video_from_youtube.url : video_from_youtube.video_url
            };

            if (!server_queue) {
                const queue_cons = {
                    text_channel: message.channel,
                    voice_channel: voice_channel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true
                };

                queue.set(message.guild.id, queue_cons);

                queue_cons.songs.push(song);


                try {
                    const connection = await voice_channel.join();

                    queue_cons.connection = connection;

                    play(message.guild, queue_cons.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);

                    return send_message(message, JSON.stringify(err));
                }
            }
            else {
                server_queue.songs.push(song);
                return send_message(message, `${song.title} has been added to the queue!`);
            }
        }
    }
};

function play(guild, song) {
    const server_queue = queue.get(guild.id);

    if (!song) {
        server_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = server_queue.connection
        .play(yt_dl(song.url))
        .on("finish", () => {
            server_queue.songs.shift();
            play(guild, server_queue.songs[0]);
        })
        .on("error", error => console.error(error));

    dispatcher.setVolumeLogarithmic(server_queue.volume / 5);
    server_queue.text_channel.send(`Start playing: **${song.title}**`);
};


async function stop(message, server_queue) {
    if (!message.member.voice.channel) return send_message(message, "You have to be in a voice channel to stop the music!");

    if (!server_queue) return send_message(message, "There is no song that I could stop!");

    server_queue.songs = [];
    await send_message(message, '[+] Stopped');

    if (server_queue && server_queue.connection && server_queue.connection.dispatcher && server_queue.connection.dispatcher.end) {
        server_queue.connection.dispatcher.end();
    }
};


async function skip(message, server_queue) {
    if (!message.member.voice.channel) return send_message(message, "You have to be in a voice channel to stop the music!");
    if (!server_queue) return send_message(message, "There is no song that I could skip!");

    if (server_queue && server_queue.songs.length === 1) {
        await send_message(message, "Queue is empty leaving server");
    }

    if (server_queue && server_queue.connection && server_queue.connection.dispatcher && server_queue.connection.dispatcher.end) {
        server_queue.connection.dispatcher.end();
    }
};


async function pause(message, server_queue) {
    if (!message.member.voice.channel) return send_message(message, "You have to be in a voice channel to pause the music!");
    if (!server_queue) return send_message(message, "There is no song that I could pause!");
    if (server_queue.connection.dispatcher.paused) return send_message(message, "This song is already paused!");

    if (server_queue && server_queue.connection && server_queue.connection.dispatcher && server_queue.connection.dispatcher.pause) {
        server_queue.connection.dispatcher.pause();
    }

    await send_message(message, `The song ${server_queue.songs[0].title} is paused`);
};

async function resume(message, server_queue) {
    if (!message.member.voice.channel) return send_message(message, "You have to be in a voice channel to resume the music!");
    if (!server_queue) return send_message(message, "There is no song that I could resume!");
    if (!server_queue.connection.dispatcher.paused) return send_message(message, "This song is not paused!");

    if (server_queue && server_queue.connection && server_queue.connection.dispatcher && server_queue.connection.dispatcher.resume) {
        server_queue.connection.dispatcher.resume();
    }

    await send_message(message, `The song ${server_queue.songs[0].title} is resumed`);
};

module.exports.initiate_bot = initiate_bot;