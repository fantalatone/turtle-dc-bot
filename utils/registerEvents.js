const fs = require("fs");

module.exports = (client, Discord) => {
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
    eventFiles.forEach(file => {
        const event = require(`../events/${file}`);
    
        event(client, Discord);
    });
}