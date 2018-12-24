const Discord = require('discord.js');
const botconfig = require.main.require('./botconfig.json');
const num_conv = require('number-to-words');

module.exports.run = async (bot, message, args) => {
    let output = args.join(' ');
    if (!output)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle('Uso incorreto do comando.')
            .setDescription("``" + `${botconfig.prefix}${this.help.name} [${this.help.arg}]` + "``")
            .setColor("#FF0000"));

    let bigtext_arr = new Array();
    for (let i = 0; i < output.length; i++) {
        let isnumber = await parseInt(output[i]);
        if (isnumber >= 0 && isnumber <= 9)
            bigtext_arr.push(`:${num_conv.toWords(output[i])}:`)
        else {
            if (output[i] !== ' ') {
                let alphabet_regex = /^[a-zA-Z]+$/;
                if (!output[i].match(alphabet_regex))
                    bigtext_arr.push(`:question:`)
                else
                    bigtext_arr.push(`:regional_indicator_${output[i].toLowerCase()}:`)
            } else bigtext_arr.push('   ');
        }
    }

    return message.channel.send(bigtext_arr.join(''));
}
module.exports.help = {
    name: 'bigtext',
    descr: 'Escreve em texto de emojis o que foi enviado pelo usuário.',
    arg: ['mensagem']
}