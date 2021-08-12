const signale = require('signale')
const clear = require("clear")
const chalk = require("chalk")
const cfg = require('../../../config.json')
const pkg = require('../../../package.json')
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

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
