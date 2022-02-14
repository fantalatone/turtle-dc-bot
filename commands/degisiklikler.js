const fs = require("fs");

module.exports = {
    name: "degisiklikler",
    command_version: 3,
    description: "Değişikliler",
    async execute(client, message, args, Discord) {
        
        let changelog = null;
        let embedList = new Discord.MessageEmbed();

        if (args.length <= 0) {
            
            const changelogs = fs.readdirSync("./changelogs/");
            const len = changelogs.length;
            
            embedList.setColor("#2ECC71")
            .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
            .setTitle("Tüm Güncellemeler").setDescription(`Toplamda ${len} güncelleme raporu bulundu.`)

            changelogs.reverse().forEach(change => {
                embedList.addField("\u200B", "- " + change.slice(10, change.length - 5));
            });

            return message.channel.send({ embeds: [embedList] });

        }
        
        changelog = require(`../changelogs/changelog-${args[0]}.json`);

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