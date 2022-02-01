const fs = require("fs");

module.exports = (commands) => {
    const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
    commandFiles.forEach(file => {
        const command = require(`../commands/${file}`);
    
        commands.set(command.name, command);
    });
}