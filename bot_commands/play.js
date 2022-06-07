const play = (client, message, args) => {
    client.distube.play(message.member.voice.channel, args.join(' '), {
        message,
        textChannel: message.channel,
        member: message.member,
    });
    return;
};

module.exports.play = play;