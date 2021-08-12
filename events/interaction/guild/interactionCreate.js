const embed = require('../../../utils/interaction/embed')
const signale = require('signale')
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) {
        if (!interaction.isCommand() && !interaction.inGuild()) return;
        if (!interaction.client.commands.has(interaction.commandName)) return;

        let langFile = 'en'
        const lang = require(`../../../languages/${langFile}.json`)

        const cmd = interaction.client.commands.get(interaction.commandName)

        if (!interaction.member.permissions.has(cmd.permissions.permissions) && cmd.permissions.require) {
            await interaction.reply({embeds: [embed.noPermissionEmbed(interaction, cmd.permissions.permissions.join(", "), lang)], ephemeral: true})
        } else {
            try {
                await cmd.execute(interaction, client, lang, cmd);
            } catch (error) {
                signale.error(error);
                return interaction.reply({content: 'There was an error while executing this command!\nThis error has been logged.', ephemeral: true});
            }
        }
    },
};
