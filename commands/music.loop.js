const { QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "döngü",
    description: "Test Command",
    command_version: 0,
    async execute(client, message, args, Discord) {
        
        if (args.length <= 0) {
            return message.reply("Döngü modları : off | track | queue | autoplay");
        }

        let loopMode = QueueRepeatMode.OFF;

        switch (args[0]) {
            case "off":
                loopMode = QueueRepeatMode.OFF;
                break;
            case "track":
                loopMode = QueueRepeatMode.TRACK;
                break;
            case "queue":
                loopMode = QueueRepeatMode.QUEUE;
                break;
            case "autoplay":
                loopMode = QueueRepeatMode.AUTOPLAY;
                break;
            default:
                break;
        }

        const player = client.player;

        const queue = player.getQueue(message.guildId);
        if (!queue || !queue.playing) return void message.reply({ content: "❌ | No music is being played!" });
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void message.reply({ content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!" });

    }
}