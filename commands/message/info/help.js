const embed = require('../../../utils/message/embed')
const cfg = require('../../../config.json')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'help',
    description: 'Help command.',
    usage: '[category]',
    category: 'info',
    skipInHelp: false,
    hasArgs: false,
    permissions: {
        require: false,
        devOnly: false,
        permissions: [""]
    },
    async execute(client, message, args, prefix, lang) {
        const cmdMap = client.commands;
        if (!args.length) {
            const helpEmbed = new MessageEmbed()
                .setColor(cfg.embed.color.success)
                .setTimestamp()
                .setAuthor(lang.help.title, message.guild.iconURL())
                .setDescription(`${lang.help.mainDescription}<@${client.application?.id}>`)
                .setFooter(cfg.embed.footer, message.member.user.avatarURL())
            cfg.categories.category.forEach(category => {
                if (category == 'dev' && !message.member.user.id.includes(cfg.general.owner)
                    || category == 'admin' && !message.member.permissions.has(["ADMINISTRATOR"])
                    || category == 'mod' && !message.member.permissions.has(["MANAGE_MESSAGES"])) {
                    return;
                }
                helpEmbed.addField(`${cfg.categories.emoji[category]} ${category.charAt(0).toUpperCase() + category.slice(1)}${lang.help.categoryTitleSuffix}`, `\`${prefix}help ${category}\``, true);
            });

            message.channel.send({embeds: [helpEmbed], ephemeral: true})

        } else {
            switch (args[0]) {
                case `${args[0]}`:

                    if (args[0] == 'dev' && !message.member.user.id.includes(cfg.general.owner)
                        || args[0] == 'admin' && !message.member.permissions.has(["ADMINISTRATOR"])
                        || args[0] == 'mod' && !message.member.permissions.has(["MANAGE_MESSAGES"])) {
                        return message.channel.send({
                            content: lang.help.categoryNoPerm,
                            ephemeral: true
                        });
                    } else {
                        if (!cfg.categories.category.includes(args[0])) {
                            message.channel.send({embeds: [
                                    embed.errorEmbed(message, lang).setDescription(`${lang.help.categoryInvalidMessage0}\`${prefix}help\`${lang.help.categoryInvalidMessage1}`)], ephemeral: true})
                        } else {
                            const catEmbed = new MessageEmbed()
                                .setColor(cfg.embed.color.success)
                                .setTimestamp()
                                .setAuthor(lang.help.title, message.guild.iconURL())
                                .setDescription(`${lang.help.helpMenu0}\`${args[0]}\`${lang.help.categoryTitleSuffix}.`)
                                .setFooter(cfg.embed.footer, message.member.user.avatarURL())
                            cmdMap.forEach(cmd => {
                                if (cmd.category === args[0] && !cmd.skipInHelp) {
                                    let cmdUsage = cmd.usage;
                                    if (!cmdUsage.length) cmdUsage = '';
                                    catEmbed.addField(`${cmd.description}`, `\`${prefix}${cmd.name} ${cmdUsage}\``);
                                }
                            });
                            return message.channel.send({embeds: [catEmbed], ephemeral: true});
                        }
                    }
            }
        }
    }
}
