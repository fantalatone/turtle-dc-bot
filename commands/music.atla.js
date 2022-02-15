module.exports = {
    name: "atla",
    description: "Test Command",
    command_version: 0,
    async execute(client, message, args, Discord) {
        
        const player = client.player;

        const queue = player.getQueue(message.guildId);
        if (!queue || !queue.playing) return void message.reply({ content: "❌ | No music is being played!" });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void message.reply({
            content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
        });
    }
}