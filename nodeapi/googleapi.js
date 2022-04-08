const fs = require("fs");
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

const getdata = async () => {
    try {

        // Authorize the client
        const token = await authClient.authorize();

        // Set the client credentials
        authClient.setCredentials(token);

        // Get the rows
        const res = await service.spreadsheets.values.get({
            auth: authClient,
            spreadsheetId: "1Z0EskTZ7FtyQnOPyhyIfbx6VAh6uSjqIDRSKyan8ZPM",
            range: "B:C",
        });

        // All of the answers
        const answers = [];

        // Set rows to equal the rows
        const rows = res.data.values;

        // Check if we have any data and if we do add it to our answers array
        if (rows.length) {

            // Remove the headers
            rows.shift()

            // For each row
            for (const row of rows) {
                answers.push({ grade: row[0], answer: row[1] });
            }

        } else {
            console.log("No data found.");
        }

        console.log(answers);


    } catch (error) {

        // Log the error
        console.log(error);

        // Exit the process with error
        process.exit(1);

    }

}

getdata();

module.exports = app;