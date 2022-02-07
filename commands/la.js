module.exports = {
    name: "la",
    command_version: "1",
    description: "La",
    async execute(client, message, args) {
        if (args.length <= 0) return message.reply("Lö!");
        if (args.length > 1) return message.reply("Tek Kelime Lö!");

        convs = [
            {u: "napuyon", b: "Hiiç Sen Nabuyon Lö?"},
            {u: "nassın", b: "İyi Lö Sen Nassın?"},
            {u: "ii", b: "Maşallah Lö!"},
        ]

        let a = convs.find(c => c.u === args[0]);
        if (a) return message.reply(a.b);
        if (!a) return message.reply("Ne Diyün Lö!");
    }
}