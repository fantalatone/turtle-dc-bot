module.exports = {
    name: "start",
    description: "Test Command",
    command_version: 0,
    async execute(client, message, args, Discord) {
        message.channel.send("Bu komut devre dışı. Oyun hala geliştirilme aşamasındadır.");
    }
}