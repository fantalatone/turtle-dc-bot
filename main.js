require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_VOICE_STATES], disableMentions: false });

const { Player } = require("discord-player");
const registerPlayerEvents = require("./utils/registerPlayerEvents");

client.player = new Player(client);

registerPlayerEvents(client.player);

const registerCommands = require("./utils/registerCommands");
const registerEvents = require("./utils/registerEvents");
const registerGameCommands = require("./utils/registerGameCommands");

client.commands = new Discord.Collection();
client.gameCommands = new Discord.Collection();

registerCommands(client.commands);
registerGameCommands(client.gameCommands);

registerEvents(client, Discord);

client.once("ready", async () => {
    console.log("{Turtle} is running slowly but surely!");
});

client.login(process.env.TOKEN);
