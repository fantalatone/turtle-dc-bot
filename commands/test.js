const template = require("../utils/stajTemplate");
const fetch = require("node-fetch");
const combineImages = require("combine-image");
const arrayIntoChunks = require("../utils/arrayIntoChunks");
const { MessageAttachment } = require("discord.js");

const { Canvas, createCanvas, Image, loadImage } = require("canvas");

module.exports = {
    name: "test",
    description: "test",
    async execute(client, message, args, Discord) {

        if (args.length <= 0) return message.reply("Lütfen bu şekilde kullanınız! `!staj <ad> <role> <age>`");

        let portfolioArgs = [];

        args.forEach((e, i) => {
            portfolioArgs.push(e.toString());
        });

        let portfolioBuffers = [];

        for (let i = 0; i < portfolioArgs.length; i++) {

            const res = await fetch(portfolioArgs[i]);
            const arrayBuffer = await res.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            portfolioBuffers.push(buffer);
        }

        let portfolioArgsWithChunks = arrayIntoChunks(portfolioBuffers, 3);

        var portfolioMergedImagesNames = [];

        for (let j = 0; j < portfolioArgsWithChunks.length; j++) {
            await combineImages(portfolioArgsWithChunks[j]).then(img => {
                img.write('portfolio'+j+'.png');
                portfolioMergedImagesNames.push('portfolio'+j+'.png');
            })
        }

        let attachments = [];

        portfolioMergedImagesNames.forEach(file => {
            const attachment = new MessageAttachment("./" + file);
            attachments.push(attachment);
        });


        const canvas = createCanvas(800, 300);
        const ctx = canvas.getContext("2d");

        const background = await loadImage("./portfolio0.png");
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // BORDER
        ctx.lineWidth = 5;
        ctx.strokeStyle = "#000";
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // TEXT
        ctx.font = "30px sans-serif";
        ctx.fillStyle = "#0f0f0f";
        ctx.fillText(args[0], 50, 100);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "story.jpg");
        message.channel.send({files: [attachment]});

        // message.channel.send({
        //     content: template("ARDA", "YAZILIM", "16"),
        //     files: attachments
        // }).then(msg => {
        //     msg.react("✅");
        //     msg.react("❌");
        // });
        // message.channel.send("** **");

        // message.delete();

    }
}