const leave = (client, message) => {
    client.distube.voices.leave(message)
};

module.exports.leave = leave;