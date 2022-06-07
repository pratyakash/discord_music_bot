const send_message = async (message_client, message) => {
    const { channel } = message_client;

    await channel.send(message);
};

module.exports.send_message = send_message;