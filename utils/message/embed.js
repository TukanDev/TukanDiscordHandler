const {MessageEmbed} = require('discord.js')
const cfg = require('../../config.json')

module.exports = {

    successEmbed(message) {
        return new MessageEmbed()
            .setTimestamp()
            .setColor(cfg.embed.color.success)
            .setFooter(cfg.embed.footer, message.member.user.avatarURL())

    },

    errorEmbed(message, lang) {
        return new MessageEmbed()
            .setTimestamp()
            .setAuthor(lang.general.errorTitle, message.member.guild.iconURL())
            .setColor(cfg.embed.color.error)
            .setFooter(cfg.embed.footer, message.member.user.avatarURL())

    },

    noPermissionEmbed(message, permission, lang) {
        return new MessageEmbed()
            .setTimestamp()
            .setAuthor(lang.general.errorTitle, message.member.guild.iconURL())
            .setDescription(`${lang.general.noPerm0}\`${permission}\`${lang.general.noPerm1}`)
            .setColor(cfg.embed.color.error)
            .setFooter(cfg.embed.footer, message.member.user.avatarURL())

    }

}
