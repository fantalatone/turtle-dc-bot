require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS], disableMentions: false });

const registerCommands = require("./utils/registerCommands");

const prefix = process.env.PREFIX;

client.commands = new Discord.Collection();

registerCommands(client.commands);

client.on("messageCreate", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).match(/[^\s"]+|"([^"]*)"/gi).map(a => a.startsWith('"') ? a.substring(1, a.length - 1) : a);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    if (client.commands.get(command).private) return;
    
    client.commands.get(command).execute(client, message, args, Discord);
});

client.once("ready", () => {

    function checkUpdates() {
        client.commands.get("changelog").execute(client, Discord, process.env.CHANGELOG_CHANNEL_ID);
    }
    checkUpdates();

    console.log("Turtle is now working slowly but surely!");
});

client.login(process.env.TOKEN);