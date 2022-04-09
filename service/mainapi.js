const express = require('express');
const app = express.Router();

const con = require("./db");
const db = con.db;

app.post('/api/getprofile', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/setprofile', async (req, res) => {
    const { usrid, data } = req.body;
    await db.query(`INSERT INTO usertb(usrid, ts)VALUES('${usrid}', now())`)

    let d;
    for (d in data) {
        if (data[d] !== '') {
            let sql = `UPDATE usertb SET ${d}='${data[d]}', ts=now() WHERE usrid='${usrid}'`;
            await db.query(sql)
        }
    }
    res.status(200).json({
        data: "success"
    })
})

app.get('/api/test', async (req, res) => {

})

module.exports = app;