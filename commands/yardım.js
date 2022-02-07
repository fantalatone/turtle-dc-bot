const { MessageButton, MessageActionRow, MessageEmbed } = require("discord.js");

module.exports = {
    name: "yardım",
    command_version: "1",
    description: "Yardım Al",
    async execute(client, message, args) {

        const embed = new MessageEmbed()
                .setAuthor({ name: message.guild.me.user.username, iconURL: message.guild.me.user.displayAvatarURL() })
                .setColor(message.guild.me.displayHexColor)
                .setDescription("{Turtle}'ı nasıl kullanacağını bilmiyor musun? Çok Yazık! Neyse bu dert değil. \n\n 'Bilmemek değil, öğrenmemek ayıp!' derler. Hadi Öğrenelim! \n \u200B")
                .addFields(
                    { name: 'Komutlar', value: 'Bütün komutlara [buradan](https://www.youtube.com/watch?v=dQw4w9WgXcQ) ulaşabilirsin. \n\u200B' },
                    { name: 'Yardım', value: 'Merak ettiklerinizi ve anlamadığımız şeyleri [buradan](https://www.youtube.com/watch?v=dQw4w9WgXcQ) botun geliştiricisine sorabilirsin. \n\u200B' },
                    { name: 'Destek Olun', value: 'Bu projeyi daha da ileri götürmek için sizin desteğinize ihtiyacım var. [Buradan](https://www.youtube.com/watch?v=dQw4w9WgXcQ) nasıl destek olabileceğinize bakabilirsiniz.' },
                )

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setStyle("LINK")
                .setURL("https://www.youtube.com/watch?v=ls2TxZ2afBc")
                .setLabel('Destek'),
            new MessageButton()
                .setStyle("LINK")
                .setURL("https://www.youtube.com/watch?v=ls2TxZ2afBc")
                .setLabel('Sosyal Medya')
        )

        message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
}