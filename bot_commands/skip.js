const { send_empty_message } = require('../utils');

const skip = async (client, message) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return send_empty_message(message, "There is nothing in the queue right now!");

    try {
        const song = await queue.skip();
        message.channel.send(`${client.emotes.success} | Skipped! Now playing:\n${song.name}`);
    } catch (e) {
        send_empty_message(message, 'Nothing to skip');
    }
};

module.exports.skip = skip;