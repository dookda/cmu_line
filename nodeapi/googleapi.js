// const fs = require("fs");
const { google } = require("googleapis");
const express = require('express');
const service = google.sheets("v4");
const credentials = require("./credentials_key.json");

const app = express.Router();
// Configure auth client
const authClient = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
);

const getdata = async (spreadsheetId, range) => {
    try {
        const token = await authClient.authorize();
        authClient.setCredentials(token);
        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: spreadsheetId,
            range: range,
        });
        const answers = [];
        const rows = res.data.values;
        if (rows.length) {
            rows.shift()
            for (const row of rows) {
                answers.push({ point: Number(row[0].split(" ")[0]), name: row[1] });
            }
        } else {
            console.log("No data found.");
        }
        return answers
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/api/getsheet', async (req, res) => {
    const spreadsheetId = "1Z0EskTZ7FtyQnOPyhyIfbx6VAh6uSjqIDRSKyan8ZPM";
    const range = "B:C";
    let data = await getdata(spreadsheetId, range);
    res.status(200).json({ data })
})

module.exports = app;