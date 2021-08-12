const fs = require("fs")
const signale = require('signale')
const cfg = require('../config.json')
module.exports = async(client) => {

    //events
    const loade = dirs => {
        const events = fs.readdirSync(`./events/${cfg.general.commandType}/${dirs}`).filter(d => d.endsWith('.js'));
        for(let event of events) {
            const client_event = require(`../events/${cfg.general.commandType}/${dirs}/${event}`);
            if (client_event.once) {
                client.once(client_event.name, (...args) => client_event.execute(...args, client));
                signale.success(`Loaded ${client_event.name}`)
            } else {
                client.on(client_event.name, (...args) => client_event.execute(...args, client));
                signale.success(`Loaded ${client_event.name}`)
            }
        }
    }
    ["client", "guild"].forEach(e => loade(e));

    //commands
    const load = dirs => {
        const commands = fs.readdirSync(`./commands/${cfg.general.commandType}/${dirs}`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let command = require(`../commands/${cfg.general.commandType}/${dirs}/${file}`);
            client.commands.set(command.name, command);
            signale.success(`Loaded ${command.name}`)
        }
    }
    cfg.categories.category.forEach(h => load(h));
}
