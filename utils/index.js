const send_message = (message_client, message) => {
    const { channel } = message_client;

    channel.send(message);
};

module.exports.send_message = send_message;