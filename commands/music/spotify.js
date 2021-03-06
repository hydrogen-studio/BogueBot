const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let user = message.mentions.users.first() || message.author;
    if (user.presence.game !== null &&
        user.presence.game.type === 2 &&
        user.presence.game.name === 'Spotify' &&
        user.presence.game.assets !== null) {
        let trackImgURL = `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}`;
        let trackUrl = `https://open.spotify.com/track/${user.presence.game.syncID}`;
        const spotifyEmoji = 'https://cdn.discordapp.com/emojis/408668371039682560.png';

        if (args[0] == 'art')
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(`Arte do album ${user.presence.game.assets.largeText}, de ${user.presence.game.state}`)
                .setImage(trackImgURL)
                .setColor("#00FF00"));
        else
            return message.channel.send(new Discord.RichEmbed()
                .setAuthor(`Música que ${user.username} está ouvindo no Spotify.`, spotifyEmoji)
                .setThumbnail(trackImgURL)
                .addField('Nome', user.presence.game.details, true)
                .addField('Album', user.presence.game.assets.largeText, true)
                .addField('Autor', user.presence.game.state, true)
                .addField('Ouvir a música: ', `[${trackUrl}](${trackUrl})`, false)
                .setColor(0x1ED760));




    } else {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle("Erro no comando.")
            .setDescription("Não consigo ver nada relacionado a spotify no status do usuário.")
            .setColor("#FF0000"));
    }
}

module.exports.help = {
    name: "spotify",
    descr: 'Exibe informações sobre o que o usuário está ouvindo no spofity.',
    arg: ['usuário']
}