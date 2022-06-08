const { play } = require('./play');
const { pause } = require('./pause');
const { resume } = require('./resume');
const { skip } = require('./skip');
const { stop } = require('./stop');
const { queue } = require('./queue');
const { leave } = require('./leave');
const { help } = require('./help');

const { COMMANDS } = require('../utils/constants');

const execute_command = async (command, client, message, args) => {

    switch (command) {
        case COMMANDS.PLAY:
            play(client, message, args);
            break;

        case COMMANDS.PAUSE: 
            pause(client, message);
            break;

        case COMMANDS.RESUME:
            resume(client, message);
            break;

        case COMMANDS.SKIP:
            skip(client, message);
            break;

        case COMMANDS.STOP:
            stop(client, message);
            break;

        case COMMANDS.QUEUE:
            queue(client, message);
            break;

        case COMMANDS.LEAVE:
            leave(client, message);
            break;

        case COMMANDS.HELP:
            help(client, message);
            break;

        default:
            break;
    }
};


module.exports.execute_command = execute_command;