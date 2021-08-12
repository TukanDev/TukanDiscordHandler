const {MessageEmbed} = require('discord.js')
const cfg = require('../../config.json')

module.exports = {

    successEmbed(interaction) {
        return new MessageEmbed()
            .setTimestamp()
            .setColor(cfg.embed.color.success)
            .setFooter(cfg.embed.footer, interaction.member.user.avatarURL())

    },

    errorEmbed(interaction, lang) {
        return new MessageEmbed()
            .setTimestamp()
            .setAuthor(lang.general.errorTitle, interaction.member.guild.iconURL())
            .setColor(cfg.embed.color.error)
            .setFooter(cfg.embed.footer, interaction.member.user.avatarURL())

    },

    noPermissionEmbed(interaction, permission, lang) {
        return new MessageEmbed()
            .setTimestamp()
            .setAuthor(lang.general.errorTitle, interaction.member.guild.iconURL())
            .setDescription(`${lang.general.noPerm0}\`${permission}\`${lang.general.noPerm1}`)
            .setColor(cfg.embed.color.error)
            .setFooter(cfg.embed.footer, interaction.member.user.avatarURL())

    }

}
