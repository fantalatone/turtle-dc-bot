const { createCanvas, loadImage, registerFont } = require("canvas");
const themes = require("../assets/jam-theme-list");

module.exports = {
    name: "jam-tema",
    command_version: "1",
    description: "Jam Tema Komutu!",
    async execute(client, message, args, Discord) {

        const r = Math.floor(Math.random() * themes.length);

        registerFont("./assets/fonts/NexaBlack.otf", { family: "NexaBook" });

        const canvas = createCanvas(900, 450);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#107c10";
        ctx.fillRect(0, 0, 900, 600);

        ctx.font = "45px NexaBook";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Jam Teması", canvas.width / 2 - ctx.measureText("Jam Teması").width / 2, 100);

        var text = ctx.measureText("Jam Teması")
        ctx.strokeStyle = "white"
        ctx.lineWidth = 6;
        ctx.beginPath()
        ctx.lineTo(canvas.width / 2 - ctx.measureText("Jam Teması").width / 2, 115)
        ctx.lineTo(canvas.width / 2 - ctx.measureText("Jam Teması").width / 2 + text.width, 115)
        ctx.stroke()
        
        ctx.font = "60px NexaBook";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(themes[r], canvas.width / 2 - ctx.measureText(themes[r]).width / 2, canvas.height / 2);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "jam-tema.jpg");

        message.channel.send({ files: [attachment] });

    }
}