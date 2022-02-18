const { google } = require("googleapis");

const spreadsheetId = process.env.SPREADSHEETS_ID;

const auth = new google.auth.GoogleAuth({
	keyFile: process.env.CREDENTIALS_FILE,
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

let client;

(async function init() {
    client = await auth.getClient();
})();

const spreadsheets = google.sheets({ version: "v4", auth: client });

const getMessages = spreadsheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "conversations!A2:A"
});

const getAnswers = spreadsheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "conversations!B2:B"
});

module.exports = {
    messages: getMessages,
    answers : getAnswers
}
