require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS], disableMentions: false });

const registerCommands = require("./utils/registerCommands");
const registerEvents = require("./utils/registerEvents");
const registerGameCommands = require("./utils/registerGameCommands");

client.commands = new Discord.Collection();
client.gameCommands = new Discord.Collection();

registerCommands(client.commands);
registerGameCommands(client.gameCommands);

registerEvents(client, Discord);

client.once("ready", () => {
    console.log("Turtle is now working slowly but surely!");
});

client.login(process.env.TOKEN);

process.once('uncaughtException', async () => {
    await console.log("TODO! Add Bot Close Event");
  
    process.exit(0)
})

process.on("SIGINT", () => {
    throw new Error()
})