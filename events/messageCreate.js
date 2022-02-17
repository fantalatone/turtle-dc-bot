const prefixes = [process.env.GAME_PREFIX, process.env.PREFIX];

module.exports = (client, Discord) => {
    client.on("messageCreate", message => {

        const prefix = prefixes.find(v => message.content.indexOf(v) === 0);
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;

        const commandList = prefix === prefixes[0] ? client.gameCommands : client.commands;

        if (message.author.bot) return;

        const args = message.content.slice(prefix.length).match(/[^\s"]+|"([^"]*)"/gi).map(a => a.startsWith('"') ? a.substring(1, a.length - 1) : a);
        const command = args.shift().toLowerCase();

        if (!commandList.has(command)) return;
        
        commandList.get(command).execute(client, message, args, Discord);

    })
}