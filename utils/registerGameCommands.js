const fs = require("fs");

module.exports = (commands) => {
    const commandFiles = fs.readdirSync("./commands/game").filter(file => file.endsWith(".js"));
    commandFiles.forEach(file => {
        const command = require(`../commands/game/${file}`);
    
        commands.set(command.name, command);
    });
}