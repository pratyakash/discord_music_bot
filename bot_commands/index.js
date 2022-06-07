const { play } = require('./play');
const { pause } = require('./pause');
const { resume } = require('./resume');
const { skip } = require('./skip');
const { stop } = require('./stop');
const { queue } = require('./queue');
const { leave } = require('./leave');
const { help } = require('./help');

const execute_command = async (command, client, message, args) => {

    switch (command) {
        case 'play':
            play(client, message, args);
            break;

        case 'pause': 
            pause(client, message);
            break;

        case 'resume':
            resume(client, message);
            break;

        case 'skip':
            skip(client, message);
            break;

        case 'stop':
            stop(client, message);
            break;

        case 'queue':
            queue(client, message);
            break;

        case 'leave':
            leave(client, message);
            break;

        case 'help':
            help(client, message);
            break;

        default:
            break;
    }
};


module.exports.execute_command = execute_command;