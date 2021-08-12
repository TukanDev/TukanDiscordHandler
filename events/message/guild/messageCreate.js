const signale = require('signale')
const cfg = require('../../../config.json')
const embed = require('../../../utils/message/embed')

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {

        let prefix = cfg.general.prefix //or get from database
        let langFile = 'en' //or get from database

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        const lang = require(`../../../languages/${langFile}.json`)

        if (!message.content.startsWith(prefix) && message.channel.type != 'GUILD_TEXT') return;
        let command = client.commands.get(cmd) /*|| client.commands.get(client.aliases.get(siEmDi))*/

        if (!command) return;

        if (command.permissions.require) {
            if (!message.member.permissions.has(command.permissions.permissions)) {
                return message.channel.send({
                    embeds: [embed.noPermissionEmbed(message, cmd.permissions.permissions.join(", "), lang)],
                    ephemeral: true
                })
            }
        }

        if (command.hasArgs && !args.length) {
            return message.channel.send({
                embeds: [embed.errorEmbed(message, lang).setDescription(`${lang.general.wrongUsage}\`${prefix}${command.name} ${command.usage}\``)],
                ephemeral: true
            })
        }
        if (command.permissions.devOnly && !message.author.id.includes(cfg.general.owner)) {
            return message.channel.send({
                content: `Sorry, you must be in development team in order to execute this command.`,
                ephemeral: true
            });
        }

        try {
            command.execute(client, message, args, prefix, lang);
        } catch (error) {
            signale.error(error)
            return message.channel.send({content: 'There was an error while executing this command!\nThis error has been logged.', ephemeral: true});
        }
    }
};
