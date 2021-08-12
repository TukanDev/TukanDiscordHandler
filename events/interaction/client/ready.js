const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const signale = require('signale');
const clear = require("clear");
const chalk = require("chalk");
const pkg = require('../../../package.json')
const cfg = require('../../../config.json')
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        const commands = client.commands.map(({ execute, ...data }) => data)

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                //signale.debug('Started refreshing application (/) commands.')
                await rest.put(
                    Routes.applicationCommands(client.application.id),
                    { body: commands },
                );
                signale.complete('Successfully reloaded application (/) commands.')
            } catch (error) {
                signale.error(error);
            }
        })();

        clear()
        console.log(" ");
        console.log(" ");
        console.log(chalk.bold(`  ${pkg.name}`));
        console.log(" ");
        console.log(chalk.grey(`  v${pkg.version}`));
        console.log(" ");
        console.log(chalk.grey(`  (C) 2021, ${pkg.author}`))
        console.log(" ");
        signale.start(chalk.green('  Online'));
        console.log(" ");
        let i = 0;
        client.user.setStatus(cfg.general.activity.status)
        setInterval(() => client.user.setActivity(`${cfg.general.activity.activities[i++ % cfg.general.activity.activities.length]}`, { type: cfg.general.activity.type }), 10000);
    },
};
