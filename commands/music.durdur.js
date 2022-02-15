module.exports = {
    name: "durdur",
    description: "Test Command",
    command_version: 0,
    async execute(client, message, args, Discord) {
        
        const player = client.player;

        // await interaction.deferReply();
        const queue = player.getQueue(message.guildId);
        if (!queue || !queue.playing) return void message.reply({ content: "❌ | No music is being played!" });
        const paused = queue.setPaused(true);
        return void message.reply({ content: paused ? "⏸ | Paused!" : "❌ | Something went wrong!" });

    }
}