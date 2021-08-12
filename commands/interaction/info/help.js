const embed = require('../../../utils/interaction/embed')
const cfg = require('../../../config.json')
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: 'help',
    description: 'Help command.',
    usage: '[category]',
    category: 'info',
    skipInHelp: false,
    permissions: {
        require: false,
        permissions: [""]
    },
    options: [
        {
            name: 'category',
            description: 'Command category you want to browse.',
            type: 3,
            required: false,
            choices: [
                {"name": "Info", "value": "info"},
                {"name": "Fun", "value": "fun"},
                {"name": "Mod", "value": "mod"},
                {"name": "Admin", "value": "admin"}
            ]
        },
    ],
    async execute(interaction, client, lang) {
        const cmdMap = client.commands;
        if (!interaction.options.getString('category')) {
            const helpEmbed = new MessageEmbed()
                .setColor(cfg.embed.color.success)
                .setTimestamp()
                .setAuthor(lang.help.title, interaction.guild.iconURL())
                .setDescription(`${lang.help.mainDescription}<@${client.application?.id}>`)
                .setFooter(cfg.embed.footer, interaction.member.user.avatarURL())
            cfg.categories.category.forEach(category => {
                if (category == 'dev' && !interaction.member.user.id.includes(cfg.general.owner)
                    || category == 'admin' && !interaction.member.permissions.has(["ADMINISTRATOR"])
                    || category == 'mod' && !interaction.member.permissions.has(["MANAGE_MESSAGES"])) {
                    return;
                }
                helpEmbed.addField(`${cfg.categories.emoji[category]} ${category.charAt(0).toUpperCase() + category.slice(1)}${lang.help.categoryTitleSuffix}`, `\`/help ${category}\``, true);
            });

            interaction.reply({embeds: [helpEmbed], ephemeral: true})

        } else {
            switch (interaction.options.getString('category')) {
                case `${interaction.options.getString('category')}`:

                    if (interaction.options.getString('category') == 'dev' && !interaction.member.user.id.includes(cfg.general.owner)
                        || interaction.options.getString('category') == 'admin' && !interaction.member.permissions.has(["ADMINISTRATOR"])
                        || interaction.options.getString('category') == 'mod' && !interaction.member.permissions.has(["MANAGE_MESSAGES"])) {
                        return interaction.reply({
                            content: lang.help.categoryNoPerm,
                            ephemeral: true
                        });
                    } else {
                        if (!cfg.categories.category.includes(interaction.options.getString('category'))) {
                            interaction.reply({embeds: [
                                    embed.errorEmbed(interaction).setDescription(lang.help.categoryInvalidInteraction)], ephemeral: true})
                        } else {
                            const catEmbed = new MessageEmbed()
                                .setColor(cfg.embed.color.success)
                                .setTimestamp()
                                .setAuthor(lang.help.title, interaction.guild.iconURL())
                                .setDescription(`${lang.help.helpMenu0}\`${interaction.options.getString('category')}\`${lang.help.categoryTitleSuffix}.`)
                                .setFooter(cfg.embed.footer, interaction.member.user.avatarURL())
                            cmdMap.forEach(cmd => {
                                if (cmd.category === interaction.options.getString('category') && !cmd.skipInHelp) {
                                    let cmdUsage = cmd.usage;
                                    if (!cmdUsage.length) cmdUsage = '';
                                    catEmbed.addField(`${cmd.description}`, `\`/${cmd.name} ${cmdUsage}\``);
                                }
                            });
                            return interaction.reply({embeds: [catEmbed], ephemeral: true});
                        }
                    }
            }
        }
    }
}
