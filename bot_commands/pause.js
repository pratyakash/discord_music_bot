const pause = (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`);

    if (queue.paused) {
        queue.resume();
        return message.channel.send('Resumed the song for you :)');
    }

    queue.pause();
    message.channel.send(`Paused ${queue && queue.songs ? queue.songs[0].name : 'the song'} for you :)`);
};

module.exports.pause = pause;