const changelog = require("../assets/changelog.json");

module.exports = {
    name: "degisiklikler",
    command_version: 1,
    description: "Değişikliler",
    async execute(client, message, args, Discord) {
        
        const embed = new Discord.MessageEmbed()
            .setColor("#2ECC71")
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
            .setTitle("Bot Güncellemesi " + changelog.change_version).setDescription(changelog.change_title)
            .setTimestamp()
            .setFooter({ text: 'Bot Güncelleme Bildirimi' })

        changelog.changes.forEach((change, i) => {
            embed.addField("\u200B", "- " + change);
        })

        message.channel.send({ embeds: [embed] });
    }
}