module.exports = {
    name: "oy",
    command_version: "1",
    description: "Oy Komut",
    async execute(client, message, args, Discord) {
        
        if (args.length <= 2) {
            message.channel.send("Lütfen bu şekilde kullanınız! `!oy <başlık> <açıklama> <süre>`");
            return;
        }

        const title = args[0];
        const desc = args[1];
        const timeout = args[2];

        const embed = new Discord.MessageEmbed()
            .setColor("#2ECC71")
            .setAuthor({ name: message.author.username, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=256` })
            .setTitle(title)
            .setDescription(desc)
            .setFooter({ text: `${timeout} saniye sonra oylama bitecektir!` });

        await message.channel.send({ content: "@everyone", embeds: [embed] }).then(async msg => {
            const filter = (reaction, user) => (reaction.emoji.name === '👍' || reaction.emoji.name === '👎') && user.id !== client.user.id;
            const collector = await msg?.createReactionCollector({ filter, time: timeout * 1000, dispose: true });
        
            let yesCount = 0;
            let noCount = 0;
    
            await collector.on('collect', r => {
                if (r.emoji.name === "👍") {
                    yesCount++;      
                }
                if (r.emoji.name === "👎") {
                    noCount++;      
                }
            });

            await collector.on("remove", (r, u) => {
                if (r.emoji.name === "👍") {
                    yesCount--;      
                }
                if (r.emoji.name === "👎") {
                    noCount--;      
                }
            });

            await collector.on('end', collected => {
                msg?.delete();
                if (yesCount + noCount <= 0) {
                    message.channel.send("Kimse Oy Kullanmadı!");
                    return;
                }
                if (yesCount > noCount) {
                    message.channel.send("Evet Dediler.");
                } else if (noCount > yesCount) {
                    message.channel.send("Hayır Dediler.");
                } else {
                    message.channel.send("Berabere Kaldı!");
                }
            });

            await msg?.react("👍");
            await msg?.react("👎");
        });
    }
}