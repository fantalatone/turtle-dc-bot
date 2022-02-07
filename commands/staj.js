const template = require("../utils/stajTemplate");

module.exports = {
    name: "staj",
    command_version: "1",
    description: "Staj",
    async execute(client, message, args, Discord) {

        if (args.length <= 0) return message.reply("Lütfen bu şekilde kullanınız! `!staj <ad> <role> <age>`");

        let portfolioArgs = [];

        args.forEach((e, i) => {
            if (i >= 3) {
                portfolioArgs.push(e.toString());
            }
        });

        message.channel.send({
            content: template(args[0], args[1], args[2], portfolioArgs)
        }).then(msg => {
            msg.react("👍");
            msg.react("👎");
        });
        message.channel.send("** **");

        message.delete();

    }
}