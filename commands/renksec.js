module.exports = {
    name: "renksec",
    command_version: "1",
    desc: "Renk Seç Komutu",
    async execute(client, message, args, Discord) {

        const redRole = message.guild.roles.cache.find(role => role.name === "Renk Kırmızı");
        const greenRole = message.guild.roles.cache.find(role => role.name === "Renk Yeşil");
        const blueRole = message.guild.roles.cache.find(role => role.name === "Renk Mavi");
        const yellowRole = message.guild.roles.cache.find(role => role.name === "Renk Sarı");
        const orangeRole = message.guild.roles.cache.find(role => role.name === "Renk Turuncu");
        const purpleRole = message.guild.roles.cache.find(role => role.name === "Renk Mor");

        const redEmoji = "🟥";
        const greenEmoji = "🟩";
        const blueEmoji = "🟦";
        const yellowEmoji = "🟨";
        const orangeEmoji = "🟧";
        const purpleEmoji = "🟪";

        const filter = (r, u) => u.id === message.author.id;

        const embed = new Discord.MessageEmbed()
            .setColor("#2ECC71")
            .setTitle('Yeni Bir Renk Seç!')
            .addFields(
                { name: 'Biraz Bekle', value: "Tüm reaksiyonlar yüklenince seçim yap." },
            )
            .setFooter({ text: 'bu mesaj 10 saniye sonra silinecektir' });

        message.reply({embeds: [embed]}).then(async msg => {
            msg.react(redEmoji);
            msg.react(greenEmoji);
            msg.react(blueEmoji);
            msg.react(yellowEmoji);
            msg.react(orangeEmoji);
            await msg.react(purpleEmoji);

            const collector = msg.createReactionCollector({ filter, time: 10000 });
            
            collector.on('collect', async (r, u) => {
                let user = await message.guild.members.cache.get(u.id);
                let roles = await user.roles;

                roles.cache.forEach(role => {
                    if (role.name.startsWith("Renk ")) roles.remove(role.id);
                });

                switch (r.emoji.name) {
                    case redEmoji:
                        await roles.add(redRole);
                        break;
                    case greenEmoji:
                        await roles.add(greenRole);
                        break;
                    case blueEmoji:
                        await roles.add(blueRole);
                        break;
                    case yellowEmoji:
                        await roles.add(yellowRole);
                        break;
                    case orangeEmoji:
                        await roles.add(orangeRole);
                        break;
                    case purpleEmoji:
                        await roles.add(purpleRole);
                        break;
                    default:
                        break;
                }
                collector.stop();
            });
            collector.on('end', collected => {
                if (collected.size <= 0) {
                    message.reply("Geç Kaldın!");
                } else {
                    message.reply("Yeni Rengin Hayırlı Olsun Be Bro!");
                }
                msg.delete();
            });
        });
    }
}