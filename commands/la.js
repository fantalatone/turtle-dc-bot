const googlesheets = require("../utils/googlesheets");

module.exports = {
    name: "la",
    command_version: "2",
    description: "La",
    async execute(client, message, args) {
        if (args.length <= 0) return message.reply("Lö!");

        const messages = (await googlesheets.messages).data.values;
        const answers = (await googlesheets.answers).data.values;

        const foundIndex = messages.findIndex(msg => msg.toString().split(',').includes(args.join("_")));

        const selectedAnswers = answers[foundIndex].toString().split(',');
        const selectedAnswer = selectedAnswers[Math.floor(Math.random() * selectedAnswers.length)].replace("_", " ");

        message.reply(selectedAnswer);
    }
}