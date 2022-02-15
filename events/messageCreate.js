const prefixes = [process.env.GAME_PREFIX, process.env.MUSIC_PREFIX, process.env.PREFIX];

module.exports = (client, Discord) => {
    client.on("messageCreate", message => {

        const prefix = prefixes.find(v => message.content.includes(v));
        let commandList = null

        switch (prefix) {
            case prefixes[0]:
                commandList = client.gameCommands;
                break;
            case prefixes[1]:
                commandList = client.musicCommands;
                break;
            case prefixes[2]:
                commandList = client.commands;
                break;
            default:
                break;
        }

        if (message.author.bot) return;

        const args = message.content.slice(prefix.length).match(/[^\s"]+|"([^"]*)"/gi).map(a => a.startsWith('"') ? a.substring(1, a.length - 1) : a);
        const command = args.shift().toLowerCase();

        if (!commandList.has(command)) return;
        
        commandList.get(command).execute(client, message, args, Discord);

    })
}