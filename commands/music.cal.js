const { QueryType } = require("discord-player");

module.exports = {
    name: "cal",
    description: "Test Command",
    command_version: 0,
    async execute(client, message, args, Discord) {

        const player = client.player;

        const query = args.join(" ");
        const searchResult = await player
            .search(query, {
                requestedBy: message.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length) return void message.reply({ content: "No results were found!" });

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            void player.deleteQueue(message.guildId);
            return void message.reply({ content: "Could not join your voice channel!" });
        }

        await message.reply({ content: `⏱ | Loading your ${searchResult.playlist ? "playlist" : "track"}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
        
    }
}