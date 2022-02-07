const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "sil",
    command_version: "1",
    description: "Kanaldaki mesajları sil.",
    async execute(client, message, args) {

        const filter = (interaction) => {interaction.deferUpdate(); return interaction.user.id === message.author.id};

        if (args.length <= 0) {
            message.channel.messages.fetch({ limit: 2 }).then(msgs => message.channel.bulkDelete(msgs));
            return;
        }
        if (args.length > 1) return message.channel.send("Sadece Bir Tane Değer Giriniz!");

        const yesButton = new MessageButton()
            .setCustomId("yes")
            .setStyle("SUCCESS")
            .setLabel('Evet');
        const noButton = new MessageButton()
            .setCustomId("no")
            .setStyle("DANGER")
            .setLabel('Hayır');

        const embedLinks = new MessageActionRow().addComponents(
            yesButton,
            noButton
        )

        let deleteTo = parseInt(args[0]) + 1;
        message.channel.messages.fetch({limit: deleteTo}).then(msgs => {
            message.channel.send({
                content: `"${msgs.last().content.substring(0, 3)}..." Bu Mesaja Kadar Silmek İstediğinize Emin Misiniz? (5 saniyen var)`,
                components: [embedLinks]
            }).then(msg => {

                const collector = message.channel.createMessageComponentCollector({filter, time: 5000});

                collector.on('collect', async i => {
                    if (i.customId === "yes") {
                        await message.channel.messages.fetch({ limit: 2 }).then(messages => message.channel.bulkDelete(messages));
                        message.channel.bulkDelete(msgs);
                    }
                    if (i.customId === "no") {
                        await message.channel.messages.fetch({ limit: 2 }).then(messages => message.channel.bulkDelete(messages));
                    }
                });

                collector.on("end", async collected => {
                    if (!collected.first()) {
                        message.channel.send("Silme İşlemi İçin Geç Kaldın!");
                        await message.channel.messages.fetch({ limit: 2 }).then(messages => message.channel.bulkDelete(messages));
                    }
                });

            });
        });
    }
}