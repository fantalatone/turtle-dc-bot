const changelog = require("../changelog.json");

module.exports = {
    name: "changelog",
    command_version: "-1",
    private: true,
    description: "Changelog Komut",
    async execute(client, Discord, id) {
        client.channels.fetch(id)
            .then(channel => {
                const embed = new Discord.MessageEmbed()
                    .setColor("#2ECC71")
                    .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
                    .setTitle("Bot Güncellemesi " + changelog.change_version).setDescription(changelog.change_title)
                    .setTimestamp()
	                .setFooter({ text: 'Bot Güncelleme Bildirimi' })

                changelog.changes.forEach((change, i) => {
                    embed.addField("\u200B", "- " + change);
                })

                channel.send({ embeds: [embed] });
            })
    }
}