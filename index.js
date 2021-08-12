require('dotenv').config()
const cfg = require('./config.json')
const { Client, Collection, Intents } = require('discord.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { parse: ['users', 'roles'], repliedUser: true }, ws: { properties: { $browser: (cfg.general.activity.mobileStatus == true) ? cfg.general.activity.mobileDevice : 'discord.js' }} })

client.commands = new Collection()
require('./client/bot')(client)

client.login(process.env.TOKEN);