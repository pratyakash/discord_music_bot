const Discord = require('discord.js');

const { COLORS } = require('./constants');

const init_distube_extra = client => {
    client.distube
        .on('playSong', (queue, song) => {
            const embed = new Discord.MessageEmbed()
                .setColor(COLORS.NEON_GREEN)
                .setTitle("Song")
                .setDescription(client.emotes.speaker + ' ' + song.name)
                .addFields(
                    { name: client.emotes.timer + ' ' + 'Duration', value: `${song.formattedDuration}`, inline: true },
                    { name: client.emotes.headphone + ' ' + 'Requested By', value: `${song.user.toString()}`, inline: true },
                )
                .setFooter({ text: 'bullMusic [>help]' });

            return queue.textChannel.send({ embeds: [embed] });
        })
        .on('addSong', (queue, song) =>
            queue.textChannel.send(
                `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
            )
        )
        .on('addList', (queue, playlist) =>
            queue.textChannel.send(
                `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length
                } songs) to queue`
            )
        )
        .on('error', (channel, e) => {
            console.log('-> Error ', e);
        })
        .on('empty', queue => queue.textChannel.send('Voice channel is empty! Leaving the channel...'))
        .on('searchNoResult', (message, query) =>
            message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
        )
        .on('finish', queue => queue.textChannel.send('Finished!'))
};

module.exports.init_distube_extra = init_distube_extra;

