module.exports = {
    name: "cal",
    command_version: "1",
    description: "YouTube üzerinden müzik çal",
    async execute(client, message, args) {
        
        const vc = message.member.voice.channel;

        if (!vc) return message.channel.send("Lütfen bir ses kanalında iken kullanınız.");
        const permissions = vc.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("Yetkin yok!");
        if (!permissions.has("SPEAK")) return message.channel.send("Yetkin yok!");
        if (!args.length) return message.channel.send("Link Yazmalısın!");

        const connection = await vc.join();

    }
}