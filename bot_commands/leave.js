const { send_empty_message } = require('../utils');

const leave = (client, message) => {
    client.distube.voices.leave(message)

    send_empty_message(message, 'Leaving, Have a nice day :)', )
};

module.exports.leave = leave;